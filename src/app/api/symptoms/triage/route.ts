import { NextRequest, NextResponse } from "next/server";
import { evaluateSymptomQuery } from "@/lib/symptomEngine";
import { SymptomTriageQuery } from "@/types/medicine";

export async function POST(request: NextRequest) {
  try {
    const body: SymptomTriageQuery = await request.json();

    if (!body || !body.ageBand || !body.symptomKey) {
      return NextResponse.json(
        { success: false, error: "Missing required triage parameters (ageBand, symptomKey)" },
        { status: 400 }
      );
    }

    const triageResult = evaluateSymptomQuery(body);

    return NextResponse.json({
      success: true,
      data: triageResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process symptom triage" },
      { status: 500 }
    );
  }
}
