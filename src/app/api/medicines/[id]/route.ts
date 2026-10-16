import { NextRequest, NextResponse } from "next/server";
import { getMedicineById } from "@/lib/searchEngine";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicine = getMedicineById(params.id);
    if (!medicine) {
      return NextResponse.json(
        { success: false, error: "Medicine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: medicine,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve medicine" },
      { status: 500 }
    );
  }
}
