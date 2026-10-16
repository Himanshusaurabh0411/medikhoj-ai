import { ImportPreviewReport, Medicine } from "@/types/medicine";
import { NPPA_CEILING_RECORDS } from "@/data/nppaPriceCeilings";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";

export interface RawImportRecord {
  sourceName: string;
  brandName: string;
  genericName?: string;
  saltComposition: string;
  strength?: string;
  dosageForm?: string;
  manufacturerName?: string;
  mrp?: number;
  packSize?: number;
  nppaCeilingPrice?: number;
  gazetteRef?: string;
  isJanAushadhi?: boolean;
}

export interface ImportValidationIssue {
  recordIndex: number;
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface ConflictingPriceIssue {
  brandName: string;
  existingPrice: number;
  incomingPrice: number;
  existingSource: string;
  incomingSource: string;
  priceDeltaPercent: number;
}

export interface ImportRunResult {
  report: ImportPreviewReport;
  issues: ImportValidationIssue[];
  conflictingPrices: ConflictingPriceIssue[];
  importedCount: number;
  updatedCount: number;
  skippedCount: number;
  isDryRun: boolean;
}

export class DataImporter {
  /**
   * Validates raw dataset schema before importing
   */
  public static validateDataset(records: RawImportRecord[]): ImportValidationIssue[] {
    const issues: ImportValidationIssue[] = [];

    records.forEach((rec, idx) => {
      if (!rec.brandName || rec.brandName.trim().length === 0) {
        issues.push({ recordIndex: idx, field: "brandName", message: "Brand name is missing or empty.", severity: "error" });
      }
      if (!rec.saltComposition || rec.saltComposition.trim().length === 0) {
        issues.push({ recordIndex: idx, field: "saltComposition", message: "Salt composition is mandatory.", severity: "error" });
      }
      if (rec.mrp !== undefined && (rec.mrp <= 0 || isNaN(rec.mrp))) {
        issues.push({ recordIndex: idx, field: "mrp", message: "MRP must be a positive numeric value.", severity: "error" });
      }
      if (rec.packSize !== undefined && (rec.packSize <= 0 || !Number.isInteger(rec.packSize))) {
        issues.push({ recordIndex: idx, field: "packSize", message: "Pack size must be a positive integer.", severity: "warning" });
      }
      if (!rec.sourceName) {
        issues.push({ recordIndex: idx, field: "sourceName", message: "Source attribution provenance is missing.", severity: "error" });
      }
    });

    return issues;
  }

  /**
   * Identifies conflicting prices against existing database without silently overwriting
   */
  public static detectPriceConflicts(records: RawImportRecord[], currentMedicines: Medicine[]): ConflictingPriceIssue[] {
    const conflicts: ConflictingPriceIssue[] = [];

    for (const rec of records) {
      if (!rec.mrp) continue;
      const existing = currentMedicines.find(m => m.brandName.toLowerCase() === rec.brandName.toLowerCase());
      if (existing && existing.mrp !== rec.mrp) {
        const delta = Math.abs(existing.mrp - rec.mrp);
        const percent = Math.round((delta / existing.mrp) * 100);
        conflicts.push({
          brandName: existing.brandName,
          existingPrice: existing.mrp,
          incomingPrice: rec.mrp,
          existingSource: existing.sources[0]?.sourceName || "Primary DB",
          incomingSource: rec.sourceName,
          priceDeltaPercent: percent,
        });
      }
    }

    return conflicts;
  }

  /**
   * Runs an import or dry run
   */
  public static runImport(
    sourceName: string,
    records: RawImportRecord[],
    options: { dryRun?: boolean; overwritePriceConflicts?: boolean } = { dryRun: true }
  ): ImportRunResult {
    const issues = this.validateDataset(records);
    const hasFatalErrors = issues.some(i => i.severity === "error");

    const conflictingPrices = this.detectPriceConflicts(records, INDIAN_MEDICINES);

    const newRecordsCount = records.filter(r =>
      !INDIAN_MEDICINES.some(m => m.brandName.toLowerCase() === r.brandName.toLowerCase())
    ).length;

    const updatedRecordsCount = records.length - newRecordsCount;

    const report: ImportPreviewReport = {
      sourceName,
      recordsAnalyzed: records.length,
      newRecordsCount,
      updatedRecordsCount,
      conflictingPricesCount: conflictingPrices.length,
      schemaViolationsCount: issues.length,
      validationPassRate: records.length > 0 ? Number((((records.length - issues.filter(i => i.severity === "error").length) / records.length) * 100).toFixed(1)) : 100,
      timestamp: new Date().toISOString(),
    };

    return {
      report,
      issues,
      conflictingPrices,
      importedCount: options.dryRun ? 0 : newRecordsCount,
      updatedCount: options.dryRun ? 0 : updatedRecordsCount,
      skippedCount: hasFatalErrors ? records.length : 0,
      isDryRun: options.dryRun ?? true,
    };
  }

  /**
   * Helper to simulate sample NPPA / DPCO import batch
   */
  public static getSampleNppaBatch(): RawImportRecord[] {
    return NPPA_CEILING_RECORDS.map(nppa => ({
      sourceName: "NPPA DPCO Gazette 2024",
      brandName: nppa.formulation,
      genericName: nppa.activeIngredients,
      saltComposition: `${nppa.activeIngredients} (${nppa.strength})`,
      strength: nppa.strength,
      dosageForm: nppa.dosageForm,
      mrp: nppa.ceilingPricePerUnit,
      packSize: 1,
      nppaCeilingPrice: nppa.ceilingPricePerUnit,
      gazetteRef: nppa.gazetteRef,
    }));
  }

  /**
   * Helper to simulate sample Kaggle / Indian Brands batch
   */
  public static getSampleKaggleBatch(): RawImportRecord[] {
    return [
      {
        sourceName: "Kaggle A-Z Indian Medicine Dataset 2024",
        brandName: "Dolo 650",
        saltComposition: "Paracetamol (650mg)",
        mrp: 34.00, // Slightly conflicting price to demonstrate conflict detection
        packSize: 15,
        manufacturerName: "Micro Labs Ltd",
        dosageForm: "Tablet",
      },
      {
        sourceName: "Kaggle A-Z Indian Medicine Dataset 2024",
        brandName: "Cipcal 500",
        saltComposition: "Calcium Carbonate (1250mg eq. to 500mg elemental Ca) + Vitamin D3 (250 IU)",
        mrp: 98.50,
        packSize: 15,
        manufacturerName: "Cipla Ltd",
        dosageForm: "Tablet",
      },
      {
        sourceName: "Kaggle A-Z Indian Medicine Dataset 2024",
        brandName: "Becosules Z",
        saltComposition: "B-Complex + Vitamin C + Zinc",
        mrp: 52.00,
        packSize: 20,
        manufacturerName: "Pfizer Ltd",
        dosageForm: "Capsule",
      }
    ];
  }
}
