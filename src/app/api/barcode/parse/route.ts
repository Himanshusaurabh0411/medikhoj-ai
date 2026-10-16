import { NextRequest, NextResponse } from "next/server";
import { parseGs1Barcode, submitUnknownBarcode, getUnknownBarcodeSubmissions } from "@/lib/barcodeParser";
import { getMedicineByBarcode } from "@/lib/searchEngine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = body?.payload;

    if (!payload || typeof payload !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing barcode payload" },
        { status: 400 }
      );
    }

    const parsed = parseGs1Barcode(payload);

    let matchedMedicine = null;
    if (parsed.gtin) {
      matchedMedicine = getMedicineByBarcode(parsed.gtin);
    }
    if (!matchedMedicine && parsed.raw) {
      matchedMedicine = getMedicineByBarcode(parsed.raw);
    }

    return NextResponse.json({
      success: true,
      data: {
        parsed,
        matchedMedicine,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to parse barcode" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { barcode, symbology, candidateBrand, candidateStrength, candidateSalt, extractedOcrText } = body;

    if (!barcode) {
      return NextResponse.json({ success: false, error: "Barcode is required" }, { status: 400 });
    }

    const submission = submitUnknownBarcode({
      barcode,
      symbology: symbology || "Unknown",
      candidateBrand,
      candidateStrength,
      candidateSalt,
      extractedOcrText,
    });

    return NextResponse.json({
      success: true,
      data: submission,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit unknown barcode" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = getUnknownBarcodeSubmissions();
    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get submissions" },
      { status: 500 }
    );
  }
}
