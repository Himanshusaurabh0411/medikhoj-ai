import { NextRequest, NextResponse } from "next/server";
import { DataImporter, RawImportRecord } from "@/lib/importers/dataImporter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sourceKey = body?.sourceKey || "nppa";
    const dryRun = body?.dryRun !== false; // default to true (safe)
    let records: RawImportRecord[] = [];

    if (sourceKey === "nppa") {
      records = DataImporter.getSampleNppaBatch();
    } else if (sourceKey === "kaggle") {
      records = DataImporter.getSampleKaggleBatch();
    } else if (Array.isArray(body?.customRecords)) {
      records = body.customRecords;
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid source key specified." },
        { status: 400 }
      );
    }

    const result = DataImporter.runImport(
      sourceKey.toUpperCase(),
      records,
      { dryRun }
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to run importer" },
      { status: 500 }
    );
  }
}
