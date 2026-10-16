import { Medicine, SubstitutionResult } from "@/types/medicine";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";

function normalizeStringForComparison(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

/**
 * Checks if two medicines have clinically identical active ingredients,
 * strengths, dosage form, and route of administration.
 */
export function areMedicinesStrictlyEquivalent(medA: Medicine, medB: Medicine): boolean {
  if (medA.id === medB.id) return false;

  // 1. AYUSH and allopathic must NEVER be treated as equivalent
  if (medA.productType !== medB.productType) return false;

  // 2. Dosage form must match (e.g. Tablet vs Tablet, Capsule vs Capsule)
  if (normalizeStringForComparison(medA.dosageForm) !== normalizeStringForComparison(medB.dosageForm)) {
    return false;
  }

  // 3. Route of administration must match (e.g. Oral vs Oral)
  if (normalizeStringForComparison(medA.routeOfAdministration) !== normalizeStringForComparison(medB.routeOfAdministration)) {
    return false;
  }

  // 4. Overall strength string must match
  if (normalizeStringForComparison(medA.strength) !== normalizeStringForComparison(medB.strength)) {
    return false;
  }

  // 5. Release type must match (e.g. immediate release vs sustained release)
  if (medA.releaseType && medB.releaseType && medA.releaseType !== medB.releaseType) {
    return false;
  }

  // 6. Compare active ingredients count
  if (medA.activeIngredients.length !== medB.activeIngredients.length) {
    return false;
  }

  // 6. Compare each active ingredient name and individual strength
  const ingredientsB = [...medB.activeIngredients];

  for (const ingA of medA.activeIngredients) {
    const normNameA = normalizeStringForComparison(ingA.standardName || ingA.name);
    const normStrengthA = normalizeStringForComparison(ingA.strength);

    const matchIndex = ingredientsB.findIndex(ingB => {
      const normNameB = normalizeStringForComparison(ingB.standardName || ingB.name);
      const normStrengthB = normalizeStringForComparison(ingB.strength);
      return normNameB === normNameA && normStrengthB === normStrengthA;
    });

    if (matchIndex === -1) {
      return false; // Ingredient or strength mismatch
    }

    // Remove matched ingredient so 1-to-1 matching is enforced
    ingredientsB.splice(matchIndex, 1);
  }

  return true;
}

/**
 * Calculates exact percentage savings:
 * Formula: ((Reference Price − Alternative Price) / Reference Price) * 100
 */
export function calculateSavings(referenceUnitPrice: number, alternativeUnitPrice: number): {
  savingsPercentage: number;
  priceDifference: number;
  isCheaper: boolean;
} {
  if (!referenceUnitPrice || referenceUnitPrice <= 0 || !alternativeUnitPrice) {
    return { savingsPercentage: 0, priceDifference: 0, isCheaper: false };
  }

  const priceDifference = referenceUnitPrice - alternativeUnitPrice;
  const isCheaper = priceDifference > 0;
  const savingsPercentage = isCheaper
    ? Math.round(((priceDifference) / referenceUnitPrice) * 100)
    : 0;

  return {
    savingsPercentage,
    priceDifference: Number(priceDifference.toFixed(2)),
    isCheaper
  };
}

/**
 * Finds all strict bio-equivalent substitutes and same-therapeutic class alternatives
 * for a reference medicine.
 */
export function findSubstitutions(referenceMedicine: Medicine): SubstitutionResult {
  const exactEquivalentsList: SubstitutionResult['exactEquivalents'] = [];
  const sameTherapeuticClassList: SubstitutionResult['sameTherapeuticClass'] = [];
  let janAushadhiHighlight: SubstitutionResult['janAushadhiHighlight'] = undefined;

  for (const med of INDIAN_MEDICINES) {
    if (med.id === referenceMedicine.id) continue;

    // Strict equivalence check
    if (areMedicinesStrictlyEquivalent(referenceMedicine, med)) {
      const { savingsPercentage, priceDifference, isCheaper } = calculateSavings(
        referenceMedicine.pricePerUnit,
        med.pricePerUnit
      );

      const item = {
        medicine: med,
        savingsPercentage,
        priceDifferencePerUnit: priceDifference,
        isCheaper,
        isJanAushadhi: med.isJanAushadhi,
      };

      exactEquivalentsList.push(item);

      // Track Jan Aushadhi product for dedicated highlight card
      if (med.isJanAushadhi) {
        const packSavings = referenceMedicine.mrp - (med.pricePerUnit * referenceMedicine.packSize);
        janAushadhiHighlight = {
          medicine: med,
          savingsPercentage,
          packSavings: Number(packSavings.toFixed(2)),
        };
      }
    }
    // Same therapeutic class, different ingredient / formulation
    else if (
      med.therapeuticClass &&
      referenceMedicine.therapeuticClass &&
      normalizeStringForComparison(med.therapeuticClass) === normalizeStringForComparison(referenceMedicine.therapeuticClass) &&
      med.productType === referenceMedicine.productType
    ) {
      sameTherapeuticClassList.push({
        medicine: med,
        activeDifference: `${med.brandName} (${med.saltComposition}) vs ${referenceMedicine.brandName} (${referenceMedicine.saltComposition})`,
        clinicalNote: "Same therapeutic class but different molecule/strength. Physician consultation mandatory before switching.",
      });
    }
  }

  // Sort exact equivalents purely by lowest unit price
  exactEquivalentsList.sort((a, b) => a.medicine.pricePerUnit - b.medicine.pricePerUnit);

  // Lowest price substitute with positive savings
  const cheapestEquivalent = exactEquivalentsList.find(e => e.isCheaper);
  const lowestPriceSubstitute = cheapestEquivalent
    ? {
        medicine: cheapestEquivalent.medicine,
        savingsPercentage: cheapestEquivalent.savingsPercentage,
        packSavings: Number(
          (referenceMedicine.mrp - cheapestEquivalent.medicine.pricePerUnit * referenceMedicine.packSize).toFixed(2)
        )
      }
    : undefined;

  return {
    referenceMedicine,
    exactEquivalents: exactEquivalentsList,
    sameTherapeuticClass: sameTherapeuticClassList,
    janAushadhiHighlight: janAushadhiHighlight || lowestPriceSubstitute,
    lowestPriceSubstitute,
  };
}
