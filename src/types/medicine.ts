export type PrescriptionCategory = 'Schedule H' | 'Schedule H1' | 'Schedule X' | 'OTC' | 'Unverified';

export type ProductType = 'allopathic' | 'ayush';

export type UnitType = 'tablet' | 'capsule' | 'ml' | 'gm' | 'gram' | 'vial' | 'strip' | 'sachet' | 'puff';

export type VerificationStatus = 'officially_verified' | 'secondary_imported' | 'user_reported_pending' | 'unverified';

export interface SourceProvenance {
  sourceName: string;
  sourceRecordId?: string;
  sourceUrl?: string;
  lastUpdated: string;
  confidence: 'official' | 'secondary' | 'user_reported';
  licenseNotes?: string;
}

export interface ActiveIngredientDetail {
  name: string;
  standardName: string;
  strength: string;
  strengthValue?: number;
  strengthUnit?: string;
}

export interface Medicine {
  id: string;
  brandName: string;
  brandNameHindi?: string;
  genericName: string;
  saltComposition: string; // e.g. "Paracetamol (500mg)"
  activeIngredients: ActiveIngredientDetail[];
  strength: string; // e.g. "500 mg"
  dosageForm: string; // "Tablet", "Capsule", "Syrup", "Injection", "Ointment"
  routeOfAdministration: string; // "Oral", "Topical", "Intravenous"
  packSize: number; // e.g. 10, 15, 100
  packUnit: string; // "tablets", "capsules", "ml", "gm"
  mrp: number; // in INR
  pricePerUnit: number; // mrp / packSize
  unitType: UnitType;
  manufacturer: {
    name: string;
    originCountry: string;
    licenseNo?: string;
    isIndianPharma: boolean;
  };
  prescriptionCategory: PrescriptionCategory;
  productType: ProductType;
  therapeuticClass: string;
  isNLEM: boolean;
  nlemVersion?: string;
  isPriceControlled: boolean;
  ceilingPrice?: number;
  nppaNotificationRef?: string;
  isJanAushadhi: boolean;
  janAushadhiCode?: string;
  barcode?: string;
  gtin?: string;
  imageUrl?: string; // Path or URL to realistic packaging/blister photograph
  releaseType?: 'immediate' | 'extended' | 'sustained' | 'delayed';
  isNarrowTherapeuticIndex?: boolean; // Requires strict clinical TDM; brand switching cautioned
  storageInfo: {
    en: string;
    hi: string;
  };
  indications: {
    en: string[];
    hi: string[];
  };
  warnings: {
    en: string[];
    hi: string[];
  };
  contraindications: {
    en: string[];
    hi: string[];
  };
  interactions: {
    en: string[];
    hi: string[];
  };
  sideEffects: {
    en: string[];
    hi: string[];
  };
  sources: SourceProvenance[];
  verificationStatus: VerificationStatus;
  lastAuditedDate: string;
}

export interface SubstitutionResult {
  referenceMedicine: Medicine;
  exactEquivalents: {
    medicine: Medicine;
    savingsPercentage: number; // positive if cheaper
    priceDifferencePerUnit: number;
    isCheaper: boolean;
    isJanAushadhi: boolean;
  }[];
  sameTherapeuticClass: {
    medicine: Medicine;
    activeDifference: string;
    clinicalNote: string;
  }[];
  janAushadhiHighlight?: {
    medicine: Medicine;
    savingsPercentage: number;
    packSavings: number;
  };
  lowestPriceSubstitute?: {
    medicine: Medicine;
    savingsPercentage: number;
    packSavings: number;
  };
}

export interface ParsedGS1Data {
  raw: string;
  symbology: string;
  gtin?: string;
  batchNumber?: string;
  expiryDateFormatted?: string; // YYYY-MM-DD
  expiryMonthYear?: string; // MM/YYYY
  isExpired?: boolean;
  isExpiringSoon?: boolean; // within 30 days
  serialNumber?: string;
  validationErrors?: string[];
}

export interface UnknownBarcodeSubmission {
  id: string;
  barcode: string;
  symbology: string;
  candidateBrand?: string;
  candidateStrength?: string;
  candidateSalt?: string;
  extractedOcrText?: string;
  submittedAt: string;
  status: 'pending_review' | 'verified_and_added' | 'rejected';
}

export interface PoisonControlContact {
  centerName: string;
  institution: string;
  city: string;
  state: string;
  tollFree?: string;
  emergencyPhone: string;
  timing: string;
  source: string;
  verificationDate: string;
}

export type AgeBand = 'infant' | 'child' | 'adult' | 'elderly';

export interface SymptomTriageQuery {
  ageBand: AgeBand;
  symptomKey: string;
  durationDays: number;
  hasRedFlags: string[];
  isPregnantOrLactating?: boolean;
  knownConditions?: string[];
}

export interface SymptomTriageResult {
  severity: 'emergency' | 'consult_doctor' | 'self_care_otc';
  headlineEn: string;
  headlineHi: string;
  primaryActionEn: string;
  primaryActionHi: string;
  redFlagsTriggered: string[];
  contraindicationsNotes: string[];
  recommendedTesting?: string[];
  generalAdvice: { en: string; hi: string }[];
  safeOtcOptions: {
    saltName: string;
    dosageForm: string;
    cautions: string;
  }[];
  prescriptionOnlyMentioned: string[];
  disclaimerEn: string;
  disclaimerHi: string;
}

export interface ImportPreviewReport {
  sourceName: string;
  recordsAnalyzed: number;
  newRecordsCount: number;
  updatedRecordsCount: number;
  conflictingPricesCount: number;
  schemaViolationsCount: number;
  validationPassRate: number;
  timestamp: string;
}
