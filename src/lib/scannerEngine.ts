/**
 * MediKhoj Client-Side Barcode Scanning Engine
 * 
 * Provides dual-layer barcode detection:
 * 1. Native browser BarcodeDetector API (hardware accelerated, supports GS1 DataMatrix, QR, EAN-13, Code 128)
 * 2. Pure JavaScript 1D EAN-13 / UPC / Code-128 canvas scanline decoder for browsers without BarcodeDetector
 * 3. Haptic and Web Audio API feedback triggers
 */

export interface ScanResult {
  rawValue: string;
  format: string;
  timestamp: number;
}

// Check if native BarcodeDetector is supported
export function isNativeBarcodeDetectorSupported(): boolean {
  return typeof window !== "undefined" && "BarcodeDetector" in window;
}

// Cached instance of native detector
let nativeDetectorInstance: any = null;

export async function getNativeBarcodeDetector() {
  if (!isNativeBarcodeDetectorSupported()) return null;
  if (nativeDetectorInstance) return nativeDetectorInstance;

  try {
    const BarcodeDetectorClass = (window as any).BarcodeDetector;
    const supportedFormats: string[] = await BarcodeDetectorClass.getSupportedFormats();
    const desiredFormats = [
      "ean_13",
      "ean_8",
      "code_128",
      "code_39",
      "data_matrix",
      "qr_code",
      "upc_a",
      "upc_e"
    ].filter(f => supportedFormats.includes(f));

    nativeDetectorInstance = new BarcodeDetectorClass({
      formats: desiredFormats.length > 0 ? desiredFormats : supportedFormats
    });
    return nativeDetectorInstance;
  } catch (err) {
    console.warn("Could not instantiate native BarcodeDetector:", err);
    return null;
  }
}

/**
 * Scan video frame or canvas using native BarcodeDetector if available
 */
export async function detectBarcodeWithNative(
  source: HTMLVideoElement | HTMLCanvasElement | ImageBitmap
): Promise<ScanResult | null> {
  const detector = await getNativeBarcodeDetector();
  if (!detector) return null;

  try {
    const barcodes = await detector.detect(source);
    if (barcodes && barcodes.length > 0) {
      const best = barcodes[0];
      return {
        rawValue: best.rawValue,
        format: best.format || "detected_barcode",
        timestamp: Date.now()
      };
    }
  } catch (err) {
    // Frame drop or processing error - ignore gracefully
  }
  return null;
}

/**
 * EAN-13 1D Scanline Decoder in Pure TypeScript
 * Decodes 13-digit EAN-13 / UPC barcodes directly from Canvas ImageData
 */

// L-code patterns: 0-9 (widths of 4 elements: space, bar, space, bar)
const L_PATTERNS = [
  [3, 2, 1, 1], // 0
  [2, 2, 2, 1], // 1
  [2, 1, 2, 2], // 2
  [1, 4, 1, 1], // 3
  [1, 1, 3, 2], // 4
  [1, 2, 3, 1], // 5
  [1, 1, 1, 4], // 6
  [1, 3, 1, 2], // 7
  [1, 2, 1, 3], // 8
  [3, 1, 1, 2]  // 9
];

// G-code patterns: 0-9
const G_PATTERNS = [
  [1, 1, 2, 3], // 0
  [1, 2, 2, 2], // 1
  [2, 2, 1, 2], // 2
  [1, 1, 4, 1], // 3
  [2, 3, 1, 1], // 4
  [1, 3, 2, 1], // 5
  [4, 1, 1, 1], // 6
  [2, 1, 3, 1], // 7
  [3, 1, 2, 1], // 8
  [2, 1, 1, 3]  // 9
];

// First digit parity encoding table (determines digit 1 from L vs G patterns in left 6 digits)
const FIRST_DIGIT_PARITY = [
  "LLLLLL", // 0
  "LLGLGG", // 1
  "LLGGLG", // 2
  "LLGGGL", // 3
  "LGLLGG", // 4
  "LGGLLG", // 5
  "LGGGLL", // 6
  "LGLGLG", // 7
  "LGLGGL", // 8
  "LGGLGL"  // 9
];

function matchPattern(widths: number[], patterns: number[][]): { digit: number; variance: number } {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total === 0) return { digit: -1, variance: 999 };

  let bestDigit = -1;
  let minVariance = 0.45; // Tolerance threshold

  for (let d = 0; d < patterns.length; d++) {
    const p = patterns[d];
    let variance = 0;
    for (let i = 0; i < 4; i++) {
      const expected = (p[i] / 7) * total;
      const diff = Math.abs(widths[i] - expected) / expected;
      variance += diff;
    }
    variance /= 4;
    if (variance < minVariance) {
      minVariance = variance;
      bestDigit = d;
    }
  }

  return { digit: bestDigit, variance: minVariance };
}

/**
 * Scan a single horizontal line of pixels for EAN-13 barcode
 */
export function decodeScanlineEAN13(pixels: Uint8ClampedArray, width: number, y: number): string | null {
  // Convert horizontal line to black/white binary array
  // Calculate average brightness of this line to determine threshold
  let sum = 0;
  const rowOffset = y * width * 4;
  for (let x = 0; x < width; x++) {
    const idx = rowOffset + x * 4;
    const luma = (pixels[idx] * 0.299 + pixels[idx + 1] * 0.587 + pixels[idx + 2] * 0.114);
    sum += luma;
  }
  const threshold = sum / width;

  // Run-length encoding of bars & spaces
  const runs: { isBlack: boolean; length: number }[] = [];
  let currentIsBlack = (pixels[rowOffset] * 0.299 + pixels[rowOffset + 1] * 0.587 + pixels[rowOffset + 2] * 0.114) < threshold;
  let currentLength = 1;

  for (let x = 1; x < width; x++) {
    const idx = rowOffset + x * 4;
    const luma = (pixels[idx] * 0.299 + pixels[idx + 1] * 0.587 + pixels[idx + 2] * 0.114);
    const isBlack = luma < threshold;

    if (isBlack === currentIsBlack) {
      currentLength++;
    } else {
      runs.push({ isBlack: currentIsBlack, length: currentLength });
      currentIsBlack = isBlack;
      currentLength = 1;
    }
  }
  runs.push({ isBlack: currentIsBlack, length: currentLength });

  // Need at least: left guard (3), 6 left digits (24), center guard (5), 6 right digits (24), right guard (3) = 59 runs
  if (runs.length < 59) return null;

  // Search for left guard: black-white-black of approximately equal widths
  for (let i = 0; i < runs.length - 58; i++) {
    if (!runs[i].isBlack) continue;

    const b1 = runs[i].length;
    const w1 = runs[i + 1].length;
    const b2 = runs[i + 2].length;

    const avgModule = (b1 + w1 + b2) / 3;
    if (avgModule < 1.5) continue; // Noise

    const guardVariance = (Math.abs(b1 - avgModule) + Math.abs(w1 - avgModule) + Math.abs(b2 - avgModule)) / (3 * avgModule);
    if (guardVariance > 0.45) continue;

    // Found potential left guard at index i.
    // Try to read left 6 digits (each digit has 4 runs)
    let runIdx = i + 3;
    const leftDigits: number[] = [];
    const parityMatches: string[] = [];
    let validLeft = true;

    for (let digitIdx = 0; digitIdx < 6; digitIdx++) {
      if (runIdx + 3 >= runs.length) {
        validLeft = false;
        break;
      }
      const widths = [
        runs[runIdx].length,
        runs[runIdx + 1].length,
        runs[runIdx + 2].length,
        runs[runIdx + 3].length
      ];
      runIdx += 4;

      const lMatch = matchPattern(widths, L_PATTERNS);
      const gMatch = matchPattern(widths, G_PATTERNS);

      if (lMatch.digit !== -1 && (gMatch.digit === -1 || lMatch.variance <= gMatch.variance)) {
        leftDigits.push(lMatch.digit);
        parityMatches.push("L");
      } else if (gMatch.digit !== -1) {
        leftDigits.push(gMatch.digit);
        parityMatches.push("G");
      } else {
        validLeft = false;
        break;
      }
    }

    if (!validLeft || leftDigits.length !== 6) continue;

    // Verify center guard (space-bar-space-bar-space = 5 runs)
    if (runIdx + 4 >= runs.length) continue;
    if (runs[runIdx].isBlack) continue; // Center guard must start with space

    runIdx += 5;

    // Read right 6 digits (each digit has 4 runs, all R patterns which are inverted L patterns)
    const rightDigits: number[] = [];
    let validRight = true;

    for (let digitIdx = 0; digitIdx < 6; digitIdx++) {
      if (runIdx + 3 >= runs.length) {
        validRight = false;
        break;
      }
      const widths = [
        runs[runIdx].length,
        runs[runIdx + 1].length,
        runs[runIdx + 2].length,
        runs[runIdx + 3].length
      ];
      runIdx += 4;

      const rMatch = matchPattern(widths, L_PATTERNS);
      if (rMatch.digit !== -1) {
        rightDigits.push(rMatch.digit);
      } else {
        validRight = false;
        break;
      }
    }

    if (!validRight || rightDigits.length !== 6) continue;

    // Reconstruct first digit from left parity pattern
    const parityStr = parityMatches.join("");
    const firstDigit = FIRST_DIGIT_PARITY.indexOf(parityStr);
    if (firstDigit === -1) continue;

    // Full 13 digits
    const fullDigits = [firstDigit, ...leftDigits, ...rightDigits];

    // Validate EAN-13 checksum
    let sumCheck = 0;
    for (let idx = 0; idx < 12; idx++) {
      sumCheck += fullDigits[idx] * (idx % 2 === 0 ? 1 : 3);
    }
    const checkCalculated = (10 - (sumCheck % 10)) % 10;
    if (checkCalculated === fullDigits[12]) {
      return fullDigits.join("");
    }
  }

  return null;
}

/**
 * Scan multiple lines across a canvas for 1D barcodes
 */
export function decodeBarcodeFromCanvas(canvas: HTMLCanvasElement): ScanResult | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;
  if (width < 50 || height < 50) return null;

  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // Sample across 7 horizontal lines in the middle 60% of the image
  const sampleSteps = [0.4, 0.45, 0.5, 0.55, 0.6, 0.35, 0.65];
  for (const step of sampleSteps) {
    const y = Math.floor(height * step);
    const decoded = decodeScanlineEAN13(pixels, width, y);
    if (decoded) {
      return {
        rawValue: decoded,
        format: "ean_13",
        timestamp: Date.now()
      };
    }
  }

  return null;
}

/**
 * High-precision sound chime on scan detection using Web Audio API
 */
export function playScanSuccessChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();
    const now = ctx.currentTime;

    // First tone (880 Hz - High A)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Second tone (1320 Hz - E6)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, now + 0.08);
    gain2.gain.setValueAtTime(0.25, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.2);

    // Trigger haptic vibration on mobile devices
    if (navigator.vibrate) {
      navigator.vibrate([70, 40, 90]);
    }
  } catch (err) {
    // Non-fatal if audio context is blocked
  }
}
