/**
 * MediKhoj Client-Side Barcode Scanning Engine
 * 
 * Multi-layer barcode detection:
 * 1. Native browser BarcodeDetector API (hardware accelerated when available)
 * 2. ZXing BrowserMultiFormatReader (Universal support for EAN-13, EAN-8, GS1 DataMatrix, QR, Code-128)
 * 3. Pure TypeScript Canvas scanline decoder fallback
 * 4. Web Audio API chime and haptic feedback
 */

import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";

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
  } catch {
    // Frame drop or processing error - ignore gracefully
  }
  return null;
}

// Cached ZXing MultiFormatReader instance
let zxingReaderInstance: BrowserMultiFormatReader | null = null;

export function getZxingReader(): BrowserMultiFormatReader {
  if (!zxingReaderInstance) {
    zxingReaderInstance = new BrowserMultiFormatReader();
  }
  return zxingReaderInstance;
}

/**
 * Scan using ZXing Multi-Format Reader (supports 1D EAN, 2D DataMatrix, QR, Code-128)
 */
export async function detectBarcodeWithZxing(
  source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement
): Promise<ScanResult | null> {
  const reader = getZxingReader();

  try {
    let result = null;
    if (source instanceof HTMLVideoElement) {
      result = await reader.decodeFromVideoElement(source);
    } else if (source instanceof HTMLImageElement) {
      result = await reader.decodeFromImageElement(source);
    } else if (source instanceof HTMLCanvasElement) {
      // Decode directly from canvas
      const dataUrl = source.toDataURL("image/png");
      result = await reader.decodeFromImageUrl(dataUrl);
    }

    if (result && result.getText()) {
      const formatNum = result.getBarcodeFormat();
      const formatName = formatNum !== undefined ? BarcodeFormat[formatNum] : "Detected Barcode";
      return {
        rawValue: result.getText(),
        format: formatName || "MultiFormat Barcode",
        timestamp: Date.now()
      };
    }
  } catch {
    // NotFoundException is expected when a frame contains no barcode
  }
  return null;
}

/**
 * Combined Comprehensive Barcode Detection Pipeline
 * 1. Checks Native BarcodeDetector (fastest)
 * 2. Checks ZXing MultiFormat Reader (handles DataMatrix + EAN-13 + QR across all browsers)
 * 3. Falls back to custom canvas scanline decoder
 */
export async function detectBarcodeUniversal(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
): Promise<ScanResult | null> {
  // 1. Try Native BarcodeDetector on video
  const nativeRes = await detectBarcodeWithNative(video);
  if (nativeRes) return nativeRes;

  // 2. Try ZXing on video element
  const zxingVideoRes = await detectBarcodeWithZxing(video);
  if (zxingVideoRes) return zxingVideoRes;

  // 3. Capture frame to canvas for advanced analysis
  try {
    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 480;

    if (canvas.width !== vWidth || canvas.height !== vHeight) {
      canvas.width = vWidth;
      canvas.height = vHeight;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(video, 0, 0, vWidth, vHeight);

      // Check native on canvas
      const nativeCanvasRes = await detectBarcodeWithNative(canvas);
      if (nativeCanvasRes) return nativeCanvasRes;

      // Check ZXing on canvas
      const zxingCanvasRes = await detectBarcodeWithZxing(canvas);
      if (zxingCanvasRes) return zxingCanvasRes;

      // Check scanline decoder
      const scanlineRes = decodeBarcodeFromCanvas(canvas);
      if (scanlineRes) return scanlineRes;
    }
  } catch (err) {
    console.debug("Frame processing error:", err);
  }

  return null;
}

/**
 * EAN-13 1D Scanline Decoder in Pure TypeScript
 */
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
  let minVariance = 0.45;

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

export function decodeScanlineEAN13(pixels: Uint8ClampedArray, width: number, y: number): string | null {
  let sum = 0;
  const rowOffset = y * width * 4;
  for (let x = 0; x < width; x++) {
    const idx = rowOffset + x * 4;
    const luma = (pixels[idx] * 0.299 + pixels[idx + 1] * 0.587 + pixels[idx + 2] * 0.114);
    sum += luma;
  }
  const threshold = sum / width;

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

  if (runs.length < 59) return null;

  for (let i = 0; i < runs.length - 58; i++) {
    if (!runs[i].isBlack) continue;

    const b1 = runs[i].length;
    const w1 = runs[i + 1].length;
    const b2 = runs[i + 2].length;

    const avgModule = (b1 + w1 + b2) / 3;
    if (avgModule < 1.5) continue;

    const guardVariance = (Math.abs(b1 - avgModule) + Math.abs(w1 - avgModule) + Math.abs(b2 - avgModule)) / (3 * avgModule);
    if (guardVariance > 0.45) continue;

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
    if (runIdx + 4 >= runs.length) continue;
    if (runs[runIdx].isBlack) continue;

    runIdx += 5;

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

    const parityStr = parityMatches.join("");
    const firstDigit = FIRST_DIGIT_PARITY.indexOf(parityStr);
    if (firstDigit === -1) continue;

    const fullCode = [firstDigit, ...leftDigits, ...rightDigits].join("");

    let sum1 = 0;
    let sum3 = 0;
    for (let d = 0; d < 12; d++) {
      const val = parseInt(fullCode[d], 10);
      if (d % 2 === 0) sum1 += val;
      else sum3 += val;
    }
    const checkCalculated = (10 - ((sum1 + sum3 * 3) % 10)) % 10;
    const checkActual = parseInt(fullCode[12], 10);

    if (checkCalculated === checkActual) {
      return fullCode;
    }
  }

  return null;
}

export function decodeBarcodeFromCanvas(canvas: HTMLCanvasElement): ScanResult | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;
  if (width < 50 || height < 50) return null;

  try {
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    // Scan horizontal lines across middle 60% of frame
    const startY = Math.floor(height * 0.2);
    const endY = Math.floor(height * 0.8);
    const step = Math.max(2, Math.floor((endY - startY) / 25));

    for (let y = startY; y < endY; y += step) {
      const code = decodeScanlineEAN13(pixels, width, y);
      if (code) {
        return {
          rawValue: code,
          format: "EAN-13",
          timestamp: Date.now()
        };
      }
    }
  } catch (err) {
    console.debug("Canvas scanline error:", err);
  }

  return null;
}

/**
 * Play a pleasant feedback chime using Web Audio API on successful barcode decode
 */
export function playScanSuccessChime() {
  if (typeof window === "undefined") return;

  // Haptic feedback for mobile devices
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate([40, 60, 40]);
    } catch {
      // Ignore vibration error
    }
  }

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // Note A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12); // Note E6

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Non-critical audio error
  }
}
