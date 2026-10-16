import type { ParsedGS1Data, UnknownBarcodeSubmission } from "@/types/medicine";

/**
 * Validates GTIN check digit using Luhn-like algorithm for GTIN-8, 12, 13, 14
 */
export function validateGtinCheckDigit(gtinStr: string): boolean {
  const clean = gtinStr.replace(/[^0-9]/g, "");
  if (clean.length !== 8 && clean.length !== 12 && clean.length !== 13 && clean.length !== 14) {
    return false;
  }

  const digits = clean.split("").map(Number);
  const checkDigit = digits[digits.length - 1];
  const payload = digits.slice(0, digits.length - 1).reverse();

  let sum = 0;
  for (let i = 0; i < payload.length; i++) {
    const weight = i % 2 === 0 ? 3 : 1;
    sum += payload[i] * weight;
  }

  const calculatedCheck = (10 - (sum % 10)) % 10;
  return calculatedCheck === checkDigit;
}

/**
 * Normalizes any GTIN into standard 14-digit padded format
 */
export function normalizeGtinTo14(code: string): string {
  const clean = code.replace(/[^0-9]/g, "");
  return clean.padStart(14, "0");
}

/**
 * Parses YYMMDD expiry date according to GS1 General Specifications.
 * When YY <= 50, represents 20YY; if day is 00, it means the last day of that month.
 */
export function parseGs1ExpiryDate(yymmdd: string): {
  formattedDate?: string;
  monthYear?: string;
  isExpired?: boolean;
  isExpiringSoon?: boolean;
  error?: string;
} {
  if (!yymmdd || yymmdd.length !== 6 || !/^\d{6}$/.test(yymmdd)) {
    return { error: "Invalid GS1 date format. Expected 6 numeric digits (YYMMDD)." };
  }

  const rawYear = parseInt(yymmdd.substring(0, 2), 10);
  const rawMonth = parseInt(yymmdd.substring(2, 4), 10);
  let rawDay = parseInt(yymmdd.substring(4, 6), 10);

  // GS1 rule: Year 00-50 maps to 2000-2050, 51-99 to 1951-1999
  const fullYear = rawYear <= 50 ? 2000 + rawYear : 1900 + rawYear;

  if (rawMonth < 1 || rawMonth > 12) {
    return { error: `Invalid month '${rawMonth}' in expiry date.` };
  }

  // GS1 rule: Day '00' indicates last day of the month
  if (rawDay === 0) {
    const lastDayOfMonth = new Date(fullYear, rawMonth, 0).getDate();
    rawDay = lastDayOfMonth;
  } else if (rawDay < 1 || rawDay > 31) {
    return { error: `Invalid day '${rawDay}' in expiry date.` };
  }

  const expiryDateObj = new Date(fullYear, rawMonth - 1, rawDay, 23, 59, 59);
  const now = new Date();

  const isExpired = expiryDateObj.getTime() < now.getTime();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const isExpiringSoon = !isExpired && (expiryDateObj.getTime() - now.getTime() < thirtyDaysInMs);

  const formattedMonth = String(rawMonth).padStart(2, "0");
  const formattedDay = String(rawDay).padStart(2, "0");

  return {
    formattedDate: `${fullYear}-${formattedMonth}-${formattedDay}`,
    monthYear: `${formattedMonth}/${fullYear}`,
    isExpired,
    isExpiringSoon,
  };
}

/**
 * Parses raw barcode payload according to GS1 AI syntax (e.g. DataMatrix or GS1-128)
 * Example input:
 * "(01)08901117001234(17)261231(10)DL24B01(21)SN987654"
 * or separator formatted: "01089011170012341726123110DL24B01"
 */
export function parseGs1Barcode(rawPayload: string): ParsedGS1Data {
  const clean = rawPayload.trim();
  const errors: string[] = [];

  let gtin: string | undefined = undefined;
  let batchNumber: string | undefined = undefined;
  let rawExpiry: string | undefined = undefined;
  let serialNumber: string | undefined = undefined;

  // 1. Check if bracketed GS1 format: (01)...(17)...(10)...
  if (clean.includes("(") && clean.includes(")")) {
    const aiRegex = /\((\d{2,4})\)([^()]+)/g;
    let match: RegExpExecArray | null;
    while ((match = aiRegex.exec(clean)) !== null) {
      const ai = match[1];
      const val = match[2];
      if (ai === "01") {
        gtin = val;
      } else if (ai === "17") {
        rawExpiry = val;
      } else if (ai === "10") {
        batchNumber = val;
      } else if (ai === "21") {
        serialNumber = val;
      }
    }
  }
  // 2. Continuous GS1 stream (common standard GS1 DataMatrix)
  else if (clean.startsWith("01") && clean.length >= 16) {
    gtin = clean.substring(2, 16);
    let remainder = clean.substring(16);

    // AI (17) is fixed length 6 digits
    if (remainder.startsWith("17") && remainder.length >= 8) {
      rawExpiry = remainder.substring(2, 8);
      remainder = remainder.substring(8);
    }

    // AI (10) batch is variable length up to 20 alphanumeric characters
    if (remainder.startsWith("10")) {
      const batchPart = remainder.substring(2);
      // If there's an FNC1 delimiter (char 29) or another known AI
      const nextAiIndex = batchPart.search(/\x1D|21/);
      if (nextAiIndex !== -1) {
        batchNumber = batchPart.substring(0, nextAiIndex);
      } else {
        batchNumber = batchPart;
      }
    }
  }
  // 3. Standard EAN-13 or GTIN-14 barcode
  else if (/^\d{8,14}$/.test(clean)) {
    gtin = clean;
  }

  // Process GTIN validation
  if (gtin) {
    const isValidCheck = validateGtinCheckDigit(gtin);
    if (!isValidCheck) {
      errors.push("GTIN check-digit calculation mismatch. Verify digits.");
    }
  }

  // Process Expiry Date if present
  let expiryParsed: ReturnType<typeof parseGs1ExpiryDate> | null = null;
  if (rawExpiry) {
    expiryParsed = parseGs1ExpiryDate(rawExpiry);
    if (expiryParsed.error) {
      errors.push(expiryParsed.error);
    }
  }

  const symbology = clean.includes("(") || (clean.startsWith("01") && clean.length > 14)
    ? "GS1 DataMatrix 2D"
    : clean.length === 13
    ? "EAN-13 1D"
    : "Code 128 / Barcode";

  return {
    raw: rawPayload,
    symbology,
    gtin: gtin ? normalizeGtinTo14(gtin) : undefined,
    batchNumber,
    expiryDateFormatted: expiryParsed?.formattedDate,
    expiryMonthYear: expiryParsed?.monthYear,
    isExpired: expiryParsed?.isExpired,
    isExpiringSoon: expiryParsed?.isExpiringSoon,
    serialNumber,
    validationErrors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * In-memory / storage moderation queue for unknown barcodes submitted by users
 */
const UNKNOWN_SUBMISSIONS: UnknownBarcodeSubmission[] = [
  {
    id: "sub-101",
    barcode: "8904001099881",
    symbology: "EAN-13",
    candidateBrand: "Voveran SR 100",
    candidateStrength: "100 mg",
    candidateSalt: "Diclofenac Sodium",
    extractedOcrText: "VOVERAN SR 100 Diclofenac Sodium prolonged release",
    submittedAt: "2024-08-14T10:30:00Z",
    status: "pending_review",
  }
];

export function submitUnknownBarcode(sub: Omit<UnknownBarcodeSubmission, "id" | "submittedAt" | "status">): UnknownBarcodeSubmission {
  const newSubmission: UnknownBarcodeSubmission = {
    ...sub,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: "pending_review",
  };
  UNKNOWN_SUBMISSIONS.unshift(newSubmission);
  return newSubmission;
}

export function getUnknownBarcodeSubmissions(): UnknownBarcodeSubmission[] {
  return [...UNKNOWN_SUBMISSIONS];
}
