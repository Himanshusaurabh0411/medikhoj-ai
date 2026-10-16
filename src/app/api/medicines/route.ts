import { NextRequest, NextResponse } from "next/server";
import { searchMedicines, SortOption } from "@/lib/searchEngine";
import { PrescriptionCategory, ProductType } from "@/types/medicine";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";
    const dosageForm = searchParams.get("dosageForm") || undefined;
    const prescriptionCategory = (searchParams.get("prescriptionCategory") as PrescriptionCategory) || undefined;
    const productType = (searchParams.get("productType") as ProductType) || undefined;
    const isJanAushadhiOnly = searchParams.get("janAushadhi") === "true";
    const isPriceControlledOnly = searchParams.get("priceControlled") === "true";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const manufacturer = searchParams.get("manufacturer") || undefined;
    const sortBy = (searchParams.get("sort") as SortOption) || "price_low_high";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 12;

    const results = searchMedicines(
      {
        query,
        dosageForm,
        prescriptionCategory,
        productType,
        isJanAushadhiOnly,
        isPriceControlledOnly,
        minPrice,
        maxPrice,
        manufacturer,
      },
      sortBy,
      page,
      pageSize
    );

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to search medicines" },
      { status: 500 }
    );
  }
}
