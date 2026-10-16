export interface NppaCeilingRecord {
  formulation: string;
  activeIngredients: string;
  strength: string;
  dosageForm: string;
  ceilingPricePerUnit: number; // in INR
  unit: string;
  gazetteRef: string;
  effectiveDate: string;
  sourceUrl: string;
  nlemStatus: boolean;
}

export const NPPA_CEILING_RECORDS: NppaCeilingRecord[] = [
  {
    formulation: "Paracetamol 500mg Tablet",
    activeIngredients: "Paracetamol",
    strength: "500 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 0.90,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1499(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Paracetamol 650mg Tablet",
    activeIngredients: "Paracetamol",
    strength: "650 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 1.84,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1500(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Amoxicillin + Clavulanic Acid 500mg + 125mg Tablet",
    activeIngredients: "Amoxicillin, Clavulanic Acid",
    strength: "625 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 19.46,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1501(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Azithromycin 500mg Tablet",
    activeIngredients: "Azithromycin",
    strength: "500 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 23.88,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1503(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Metformin Hydrochloride 500mg Tablet",
    activeIngredients: "Metformin Hydrochloride",
    strength: "500 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 1.54,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1505(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Telmisartan 40mg Tablet",
    activeIngredients: "Telmisartan",
    strength: "40 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 6.80,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1512(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Atorvastatin 10mg Tablet",
    activeIngredients: "Atorvastatin",
    strength: "10 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 5.86,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1518(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Pantoprazole 40mg Tablet",
    activeIngredients: "Pantoprazole",
    strength: "40 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 8.20,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1522(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
  {
    formulation: "Cetirizine Hydrochloride 10mg Tablet",
    activeIngredients: "Cetirizine Hydrochloride",
    strength: "10 mg",
    dosageForm: "Tablet",
    ceilingPricePerUnit: 1.85,
    unit: "1 Tablet",
    gazetteRef: "S.O. 1528(E) dated 25.03.2023",
    effectiveDate: "2023-04-01",
    sourceUrl: "https://www.nppaindia.nic.in/ceiling_price_orders",
    nlemStatus: true,
  },
];
