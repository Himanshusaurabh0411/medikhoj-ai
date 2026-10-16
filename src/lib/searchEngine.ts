import { Medicine, PrescriptionCategory, ProductType } from "@/types/medicine";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";

export interface SearchFilters {
  query?: string;
  dosageForm?: string;
  prescriptionCategory?: PrescriptionCategory | 'ALL';
  productType?: ProductType | 'ALL';
  isJanAushadhiOnly?: boolean;
  isPriceControlledOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  manufacturer?: string;
}

export type SortOption = 'price_low_high' | 'price_high_low' | 'brand_asc' | 'savings_high';

export interface SearchResultItem {
  medicine: Medicine;
  matchType: 'exact_brand' | 'exact_salt' | 'exact_barcode' | 'partial_match';
  score: number;
}

export interface SearchResults {
  items: SearchResultItem[];
  totalCount: number;
  exactMatchesCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableDosageForms: string[];
  availableManufacturers: string[];
}

// Hindi transliteration and common Indian medicine aliases
const TRANSLITERATION_MAP: Record<string, string> = {
  "पैरासिटामोल": "paracetamol",
  "बुखार": "fever paracetamol",
  "दर्द": "pain paracetamol",
  "डोलो": "dolo",
  "कैलपोल": "calpol",
  "क्रोसिन": "crocin",
  "ऑगमेंटिन": "augmentin",
  "एजिथ्रल": "azithral",
  "एजी": "azee",
  "ग्लाइकोमेट": "glycomet",
  "शुगर": "sugar metformin diabetes",
  "मधुमेह": "metformin diabetes",
  "गैस": "acidity pantoprazole",
  "पैंटोसिड": "pantocid",
  "पैन": "pan",
  "पैन-डी": "pan-d",
  "टेल्मा": "telma",
  "बीपी": "blood pressure telmisartan",
  "रक्तचाप": "telmisartan",
  "जन औषधि": "jan aushadhi",
  "च्यवनप्राश": "chyawanprash",
  "लिव 52": "liv.52",
};

export function normalizeSearchString(str: string): string {
  if (!str) return "";
  let clean = str.trim().toLowerCase();
  // Map Hindi tokens to English counterparts if found
  for (const [hindi, eng] of Object.entries(TRANSLITERATION_MAP)) {
    if (clean.includes(hindi)) {
      clean = clean.replace(new RegExp(hindi, 'g'), ` ${eng} `);
    }
  }
  return clean.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function searchMedicines(
  filters: SearchFilters,
  sortBy: SortOption = 'price_low_high',
  page: number = 1,
  pageSize: number = 10
): SearchResults {
  let allMedicines = [...INDIAN_MEDICINES];

  const rawQuery = (filters.query || "").trim();
  const normalizedQuery = normalizeSearchString(rawQuery);

  let scoredItems: SearchResultItem[] = [];

  for (const med of allMedicines) {
    let matchType: 'exact_brand' | 'exact_salt' | 'exact_barcode' | 'partial_match' = 'partial_match';
    let score = 0;

    if (!normalizedQuery) {
      score = 10;
    } else {
      const brandClean = normalizeSearchString(med.brandName);
      const saltClean = normalizeSearchString(med.saltComposition);
      const genericClean = normalizeSearchString(med.genericName);
      const mfgClean = normalizeSearchString(med.manufacturer.name);
      const barcodeClean = med.barcode || "";
      const gtinClean = med.gtin || "";
      const strengthClean = normalizeSearchString(med.strength);

      // 1. Exact Barcode / GTIN match
      if (rawQuery === barcodeClean || rawQuery === gtinClean) {
        matchType = 'exact_barcode';
        score = 1000;
      }
      // 2. Exact Brand match
      else if (brandClean === normalizedQuery || (med.brandNameHindi && med.brandNameHindi.trim() === rawQuery)) {
        matchType = 'exact_brand';
        score = 500;
      }
      // 3. Exact Salt / Generic match
      else if (genericClean === normalizedQuery || saltClean === normalizedQuery) {
        matchType = 'exact_salt';
        score = 400;
      }
      // 4. Brand starts with query
      else if (brandClean.startsWith(normalizedQuery)) {
        matchType = 'exact_brand';
        score = 300;
      }
      // 5. Brand contains query
      else if (brandClean.includes(normalizedQuery)) {
        matchType = 'exact_brand';
        score = 200;
      }
      // 6. Salt contains query
      else if (saltClean.includes(normalizedQuery) || genericClean.includes(normalizedQuery)) {
        matchType = 'exact_salt';
        score = 150;
      }
      // 7. Multi-token partial match
      else {
        const tokens = normalizedQuery.split(" ").filter(Boolean);
        let tokenMatches = 0;
        for (const token of tokens) {
          if (
            brandClean.includes(token) ||
            saltClean.includes(token) ||
            genericClean.includes(token) ||
            mfgClean.includes(token) ||
            strengthClean.includes(token)
          ) {
            tokenMatches++;
          }
        }
        if (tokenMatches > 0) {
          score = tokenMatches * 20;
          matchType = 'partial_match';
        }
      }
    }

    if (score > 0) {
      // Apply filters
      if (filters.dosageForm && filters.dosageForm !== 'ALL' && med.dosageForm.toLowerCase() !== filters.dosageForm.toLowerCase()) {
        continue;
      }
      if (filters.prescriptionCategory && filters.prescriptionCategory !== 'ALL' && med.prescriptionCategory !== filters.prescriptionCategory) {
        continue;
      }
      if (filters.productType && filters.productType !== 'ALL' && med.productType !== filters.productType) {
        continue;
      }
      if (filters.isJanAushadhiOnly && !med.isJanAushadhi) {
        continue;
      }
      if (filters.isPriceControlledOnly && !med.isPriceControlled) {
        continue;
      }
      if (filters.minPrice !== undefined && med.pricePerUnit < filters.minPrice) {
        continue;
      }
      if (filters.maxPrice !== undefined && med.pricePerUnit > filters.maxPrice) {
        continue;
      }
      if (filters.manufacturer && filters.manufacturer !== 'ALL' && !med.manufacturer.name.toLowerCase().includes(filters.manufacturer.toLowerCase())) {
        continue;
      }

      scoredItems.push({ medicine: med, matchType, score });
    }
  }

  // Sort results
  scoredItems.sort((a, b) => {
    // If scores differ significantly (e.g. exact match vs partial), rank by score first
    if (Math.abs(a.score - b.score) >= 100) {
      return b.score - a.score;
    }

    if (sortBy === 'price_low_high') {
      return a.medicine.pricePerUnit - b.medicine.pricePerUnit;
    }
    if (sortBy === 'price_high_low') {
      return b.medicine.pricePerUnit - a.medicine.pricePerUnit;
    }
    if (sortBy === 'brand_asc') {
      return a.medicine.brandName.localeCompare(b.medicine.brandName);
    }
    return b.score - a.score;
  });

  const totalCount = scoredItems.length;
  const exactMatchesCount = scoredItems.filter(item => item.matchType !== 'partial_match').length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = scoredItems.slice(startIndex, startIndex + pageSize);

  // Extract available filter facets
  const dosageFormsSet = new Set<string>();
  const manufacturersSet = new Set<string>();
  for (const m of allMedicines) {
    if (m.dosageForm) dosageFormsSet.add(m.dosageForm);
    if (m.manufacturer?.name) manufacturersSet.add(m.manufacturer.name);
  }

  return {
    items: paginatedItems,
    totalCount,
    exactMatchesCount,
    page: currentPage,
    pageSize,
    totalPages,
    availableDosageForms: Array.from(dosageFormsSet).sort(),
    availableManufacturers: Array.from(manufacturersSet).sort(),
  };
}

export function getMedicineById(id: string): Medicine | undefined {
  return INDIAN_MEDICINES.find(m => m.id === id);
}

export function getMedicineByBarcode(barcodeOrGtin: string): Medicine | undefined {
  if (!barcodeOrGtin) return undefined;
  const raw = barcodeOrGtin.trim();
  
  // Extract clean digits
  const cleanDigits = raw.replace(/[^0-9]/g, "");
  
  // Try direct match first
  const direct = INDIAN_MEDICINES.find(m => m.barcode === raw || m.gtin === raw);
  if (direct) return direct;

  // Handle GTIN 14 vs EAN 13 normalization
  const clean14 = cleanDigits.padStart(14, "0");
  const clean13 = cleanDigits.length === 14 && cleanDigits.startsWith("0") ? cleanDigits.substring(1) : cleanDigits;

  return INDIAN_MEDICINES.find(m => {
    const mBarcode = m.barcode?.replace(/[^0-9]/g, "");
    const mGtin = m.gtin?.replace(/[^0-9]/g, "");
    return (
      mBarcode === cleanDigits ||
      mGtin === cleanDigits ||
      mBarcode === clean13 ||
      mGtin === clean14 ||
      (cleanDigits.length >= 13 && (mBarcode && cleanDigits.includes(mBarcode))) ||
      (cleanDigits.length >= 14 && (mGtin && cleanDigits.includes(mGtin)))
    );
  });
}
