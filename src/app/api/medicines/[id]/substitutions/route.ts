import { NextRequest, NextResponse } from "next/server";
import { getMedicineById } from "@/lib/searchEngine";
import { findSubstitutions } from "@/lib/substitutionEngine";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicine = getMedicineById(params.id);
    if (!medicine) {
      return NextResponse.json(
        { success: false, error: "Reference medicine not found" },
        { status: 404 }
      );
    }

    const substitutions = findSubstitutions(medicine);

    return NextResponse.json({
      success: true,
      data: substitutions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to calculate substitutions" },
      { status: 500 }
    );
  }
}
