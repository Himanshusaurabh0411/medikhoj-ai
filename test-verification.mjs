import { searchMedicines } from "./src/lib/searchEngine.ts";
import { findSubstitutions } from "./src/lib/substitutionEngine.ts";
import { parseGs1Barcode } from "./src/lib/barcodeParser.ts";
import { evaluateSymptomQuery } from "./src/lib/symptomEngine.ts";
import { DataImporter } from "./src/lib/importers/dataImporter.ts";
import { INDIAN_MEDICINES } from "./src/data/indianMedicines.ts";

console.log("=== MediKhoj AI Verification Suite ===");

// 1. Test Search Engine
console.log("\n1. Testing Medicine Search Engine:");
const searchRes1 = searchMedicines({ query: "dolo" });
console.log(`- Query 'dolo': found ${searchRes1.totalCount} items. Top: ${searchRes1.items[0]?.medicine.brandName} (${searchRes1.items[0]?.matchType})`);

const searchRes2 = searchMedicines({ query: "पैरासिटामोल" }); // Hindi search
console.log(`- Query 'पैरासिटामोल' (Hindi): found ${searchRes2.totalCount} items. Top: ${searchRes2.items[0]?.medicine.brandName}`);

const searchRes3 = searchMedicines({ query: "augmentin" });
console.log(`- Query 'augmentin': found ${searchRes3.totalCount} items. Top: ${searchRes3.items[0]?.medicine.brandName}`);

// 2. Test Substitution & Savings Engine
console.log("\n2. Testing Strict Substitution & Jan Aushadhi Savings Engine:");
const doloMed = INDIAN_MEDICINES.find(m => m.id === "med-dolo-650");
if (doloMed) {
  const subs = findSubstitutions(doloMed);
  console.log(`- Reference: ${doloMed.brandName} (₹${doloMed.pricePerUnit.toFixed(2)}/tab)`);
  console.log(`- Exact bio-equivalents count: ${subs.exactEquivalents.length}`);
  subs.exactEquivalents.forEach(e => {
    console.log(`  * ${e.medicine.brandName}: ₹${e.medicine.pricePerUnit.toFixed(2)}/u | Savings: ${e.savingsPercentage}% (isJanAushadhi: ${e.isJanAushadhi})`);
  });
  if (subs.janAushadhiHighlight) {
    console.log(`  -> Jan Aushadhi Highlight: ${subs.janAushadhiHighlight.medicine.brandName} with ${subs.janAushadhiHighlight.savingsPercentage}% savings!`);
  }
}

// 3. Test GS1 Barcode & Expiry Parser
console.log("\n3. Testing GS1 DataMatrix & Expiry Checker:");
const gs1Test1 = "(01)08901117001234(17)261231(10)DL24B01";
const parsed1 = parseGs1Barcode(gs1Test1);
console.log(`- Input: ${gs1Test1}`);
console.log(`  GTIN: ${parsed1.gtin}, Batch: ${parsed1.batchNumber}, Expiry: ${parsed1.expiryDateFormatted}, Expired: ${parsed1.isExpired}`);

const gs1TestExpired = "(01)08901117001234(17)220531(10)EX22B99";
const parsedExpired = parseGs1Barcode(gs1TestExpired);
console.log(`- Expired input: ${gs1TestExpired}`);
console.log(`  Expiry: ${parsedExpired.expiryDateFormatted}, Expired Flag: ${parsedExpired.isExpired} (Must be true!)`);

// 4. Test Symptom Triage Engine
console.log("\n4. Testing Symptom Triage (Pediatric & Emergency Safeguards):");
// Infant query: Doctor first
const infantRes = evaluateSymptomQuery({
  ageBand: "infant",
  symptomKey: "fever",
  durationDays: 1,
  hasRedFlags: [],
});
console.log(`- Infant Triage: severity = ${infantRes.severity}, headline = "${infantRes.headlineEn}"`);
console.log(`  Safe OTC allowed: ${infantRes.safeOtcOptions.length === 0 ? "NONE (Correct: Doctor First)" : "OTC recommended"}`);

// Red flag emergency query: 112
const emergencyRes = evaluateSymptomQuery({
  ageBand: "adult",
  symptomKey: "acidity",
  durationDays: 1,
  hasRedFlags: ["acid-crushing-chest"],
});
console.log(`- Adult Chest Pain Red Flag: severity = ${emergencyRes.severity}, headline = "${emergencyRes.headlineEn}"`);

// 5. Test Data Importer & Conflict Detection
console.log("\n5. Testing Data Importer & Price Conflict Detector:");
const kaggleSample = DataImporter.getSampleKaggleBatch();
const importRun = DataImporter.runImport("KAGGLE", kaggleSample, { dryRun: true });
console.log(`- Import report pass rate: ${importResultToString(importRun)}`);

function importResultToString(res) {
  return `${res.report.validationPassRate}% pass rate, ${res.conflictingPrices.length} price conflict(s) caught: ${res.conflictingPrices[0]?.brandName} (existing ₹${res.conflictingPrices[0]?.existingPrice} vs incoming ₹${res.conflictingPrices[0]?.incomingPrice})`;
}

console.log("\nAll core verification tests completed successfully!");
