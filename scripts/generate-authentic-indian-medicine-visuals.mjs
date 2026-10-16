import fs from "node:fs";
import path from "node:path";

// Load medicines from indianMedicines.ts
const indianMedContent = fs.readFileSync(path.resolve(process.cwd(), "src/data/indianMedicines.ts"), "utf8");
const jsonMatch = indianMedContent.match(/export const INDIAN_MEDICINES: Medicine\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error("Could not parse INDIAN_MEDICINES from src/data/indianMedicines.ts");
  process.exit(1);
}

const medicines = JSON.parse(jsonMatch[1]);
console.log(`Loaded ${medicines.length} medicines for authentic packaging generation.`);

const publicDir = path.resolve(process.cwd(), "public/medicines");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// -----------------------------------------------------------------------------
// Visual Profiles for every specific Indian medicine
// -----------------------------------------------------------------------------
const MEDICINE_VISUAL_PROFILES = {
  // Paracetamol
  "med-dolo-650": {
    type: "blister",
    brandHeader: "DOLO-650",
    brandHindi: "डोलो ६५०",
    tagline: "PARACETAMOL TABLETS I.P. 650 mg",
    headerBg: "linear-gradient(135deg, #071E3D 0%, #0C3866 50%, #0099DD 100%)",
    headerColor: "#0A2540",
    brandColor: "#FFFFFF",
    accentColor: "#00B4D8",
    logoText: "MICRO LABS",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Fever & Pain Relief • Fast Dispersing",
    isScheduleH: false
  },
  "med-calpol-650": {
    type: "blister",
    brandHeader: "CALPOL 650",
    brandHindi: "कैलपोल ६५०",
    tagline: "PARACETAMOL TABLETS I.P. 650 mg",
    headerBg: "linear-gradient(135deg, #4A154B 0%, #6B21A8 60%, #E11D48 100%)",
    headerColor: "#581C87",
    brandColor: "#FFFFFF",
    accentColor: "#F59E0B",
    logoText: "GSK GlaxoSmithKline",
    pillType: "caplet",
    pillColor: "#FAFAFA",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Pain & Fever Caplets • Fast Relief",
    isScheduleH: false
  },
  "med-crocin-650": {
    type: "blister",
    brandHeader: "CROCIN 650",
    brandHindi: "क्रोसिन ६५० एडवांस",
    tagline: "PARACETAMOL FAST RELEASE TABLETS 650 mg",
    headerBg: "linear-gradient(135deg, #0A369D 0%, #0284C7 50%, #10B981 100%)",
    headerColor: "#0369A1",
    brandColor: "#FFFFFF",
    accentColor: "#10B981",
    logoText: "HALEON / GSK",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Optizorb Fast Release Technology",
    isScheduleH: false,
    hasOptizorb: true
  },
  "med-pacimol-650": {
    type: "blister",
    brandHeader: "PACIMOL-650",
    brandHindi: "पैसिमोल ६५०",
    tagline: "PARACETAMOL TABLETS I.P. 650 mg",
    headerBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0D9488 100%)",
    headerColor: "#1E293B",
    brandColor: "#FFFFFF",
    accentColor: "#0D9488",
    logoText: "IPCA",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Quality Antipyretic Analgesic",
    isScheduleH: false
  },
  "med-janaushadhi-paracetamol-650": {
    type: "pmbjp",
    genericName: "PARACETAMOL TABLETS I.P.",
    strength: "650 mg",
    hindi: "पैरासिटामोल गोलियाँ ६५० मि.ग्रा.",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹10.00",
    isScheduleH: false
  },

  // Pain / NSAIDs
  "med-combiflam": {
    type: "blister",
    brandHeader: "COMBIFLAM",
    brandHindi: "कॉम्बीफ्लेम",
    tagline: "IBUPROFEN 400mg + PARACETAMOL 325mg TABLETS",
    headerBg: "linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #B91C1C 100%)",
    headerColor: "#B91C1C",
    brandColor: "#FFFFFF",
    accentColor: "#FBBF24",
    logoText: "SANOFI",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 2,
    foilTone: "silver",
    subBrand: "Dual Action Body Pain & Inflammation",
    isScheduleH: true
  },
  "med-janaushadhi-ibuprofen-paracetamol": {
    type: "pmbjp",
    genericName: "IBUPROFEN & PARACETAMOL TABLETS",
    strength: "400 mg + 325 mg",
    hindi: "इबुप्रोफेन एवं पैरासिटामोल गोलियाँ",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹12.00",
    isScheduleH: true
  },
  "med-zerodol-p": {
    type: "blister",
    brandHeader: "ZERODOL-P",
    brandHindi: "ज़ेरोडोल-पी",
    tagline: "ACECLOFENAC 100mg + PARACETAMOL 325mg",
    headerBg: "linear-gradient(135deg, #78350F 0%, #D97706 60%, #B45309 100%)",
    headerColor: "#B45309",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "IPCA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "Anti-Inflammatory Joint & Muscle Pain Care",
    isScheduleH: true
  },
  "med-zerodol-sp": {
    type: "blister",
    brandHeader: "ZERODOL-SP",
    brandHindi: "ज़ेरोडोल-एसपी",
    tagline: "ACECLOFENAC + PARACETAMOL + SERRATIOPEPTIDASE",
    headerBg: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B45309 100%)",
    headerColor: "#991B1B",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "IPCA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "Triple Action Swelling & Pain Relief",
    isScheduleH: true
  },
  "med-voveran-50": {
    type: "blister",
    brandHeader: "VOVERAN 50",
    brandHindi: "वोवेरान ५०",
    tagline: "DICLOFENAC SODIUM GASTRO-RESISTANT 50mg",
    headerBg: "linear-gradient(135deg, #991B1B 0%, #B91C1C 50%, #C2410C 100%)",
    headerColor: "#B91C1C",
    brandColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    logoText: "NOVARTIS",
    pillType: "biconvex-round",
    pillColor: "#FDE047",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Enteric Coated Targeted Anti-Inflammatory",
    isScheduleH: true
  },
  "med-voveran-sr-100": {
    type: "blister",
    brandHeader: "VOVERAN SR 100",
    brandHindi: "वोवेरान एसआर १००",
    tagline: "DICLOFENAC SODIUM PROLONGED RELEASE 100mg",
    headerBg: "linear-gradient(135deg, #581C87 0%, #701A75 50%, #991B1B 100%)",
    headerColor: "#701A75",
    brandColor: "#FFFFFF",
    accentColor: "#FACC15",
    logoText: "NOVARTIS",
    pillType: "biconvex-round",
    pillColor: "#FEF08A",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "24-Hour Sustained Pain & Arthritis Care",
    isScheduleH: true
  },
  "med-meftal-spas": {
    type: "blister",
    brandHeader: "MEFTAL-SPAS",
    brandHindi: "मेफ्टाल-स्पास",
    tagline: "MEFENAMIC ACID 250mg + DICYCLOMINE HCl 10mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #F59E0B 100%)",
    headerColor: "#1E3A8A",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "BLUE CROSS",
    pillType: "biconvex-round",
    pillColor: "#FACC15",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "Spasmodic Pain & Cramp Relief",
    isScheduleH: true
  },

  // Antibiotics
  "med-augmentin-625": {
    type: "blister",
    brandHeader: "AUGMENTIN 625 DUO",
    brandHindi: "ऑगमेंटिन ६२५ डुओ",
    tagline: "AMOXYCILLIN 500mg & POTASSIUM CLAVULANATE 125mg",
    headerBg: "linear-gradient(135deg, #0F172A 0%, #172554 60%, #1E40AF 100%)",
    headerColor: "#172554",
    brandColor: "#FFFFFF",
    accentColor: "#38BDF8",
    logoText: "GSK GlaxoSmithKline",
    pillType: "oblong",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "Potentiated Broad Spectrum Antibiotic",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-clavam-625": {
    type: "blister",
    brandHeader: "CLAVAM 625",
    brandHindi: "क्लेवाम ६२५",
    tagline: "AMOXYCILLIN & POTASSIUM CLAVULANATE TABLETS",
    headerBg: "linear-gradient(135deg, #042F2E 0%, #0F766E 60%, #14B8A6 100%)",
    headerColor: "#0F766E",
    brandColor: "#FFFFFF",
    accentColor: "#CCFBF1",
    logoText: "ALKEM",
    pillType: "oblong",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "Potentiated Penicillin Therapy",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-moxikind-cv-625": {
    type: "blister",
    brandHeader: "MOXIKIND-CV 625",
    brandHindi: "मॉक्सिकाइंड-सीवी ६२५",
    tagline: "AMOXYCILLIN 500mg + CLAVULANIC ACID 125mg",
    headerBg: "linear-gradient(135deg, #0C4A6E 0%, #0284C7 60%, #38BDF8 100%)",
    headerColor: "#0284C7",
    brandColor: "#FFFFFF",
    accentColor: "#E0F2FE",
    logoText: "MANKIND",
    pillType: "oblong",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "Anti-Infective Therapeutic Formulation",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-janaushadhi-amoxi-clav-625": {
    type: "pmbjp",
    genericName: "AMOXYCILLIN & POTASSIUM CLAVULANATE",
    strength: "500 mg + 125 mg",
    hindi: "अमोक्सीसिलिन एवं पोटैशियम क्लैव्युलानेट गोलियाँ",
    pillType: "oblong",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹65.00",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-azee-500": {
    type: "blister",
    brandHeader: "AZEE 500",
    brandHindi: "एज़ी ५००",
    tagline: "AZITHROMYCIN TABLETS I.P. 500 mg",
    headerBg: "linear-gradient(135deg, #075985 0%, #0284C7 60%, #06B6D4 100%)",
    headerColor: "#0369A1",
    brandColor: "#FFFFFF",
    accentColor: "#BAE6FD",
    logoText: "CIPLA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 1,
    foilTone: "silver",
    subBrand: "3/5 Day Macrolide Respiratory Therapy",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-azithral-500": {
    type: "blister",
    brandHeader: "AZITHRAL 500",
    brandHindi: "एजिथ्रल ५००",
    tagline: "AZITHROMYCIN TABLETS I.P. 500 mg",
    headerBg: "linear-gradient(135deg, #831843 0%, #BE185D 60%, #F472B6 100%)",
    headerColor: "#9D174D",
    brandColor: "#FFFFFF",
    accentColor: "#FCE7F3",
    logoText: "ALEMBIC",
    pillType: "caplet",
    pillColor: "#F472B6",
    cols: 5,
    rows: 1,
    foilTone: "silver",
    subBrand: "Targeted Macrolide Antibacterial",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-janaushadhi-azithromycin-500": {
    type: "pmbjp",
    genericName: "AZITHROMYCIN TABLETS I.P.",
    strength: "500 mg",
    hindi: "एज़िथ्रोमाइसिन गोलियाँ ५०० मि.ग्रा.",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 3,
    rows: 1,
    pack: "3 Tablets",
    mrp: "₹24.00",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-taxim-o-200": {
    type: "blister",
    brandHeader: "TAXIM-O 200",
    brandHindi: "टैक्सिम-ओ २००",
    tagline: "CEFIXIME TABLETS I.P. 200 mg",
    headerBg: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #4338CA 100%)",
    headerColor: "#312E81",
    brandColor: "#FFFFFF",
    accentColor: "#A5B4FC",
    logoText: "ALKEM",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "3rd Generation Cephalosporin",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-mahacef-200": {
    type: "blister",
    brandHeader: "MAHACEF 200",
    brandHindi: "महासेफ २००",
    tagline: "CEFIXIME DISPERSIBLE TABLETS 200 mg",
    headerBg: "linear-gradient(135deg, #064E3B 0%, #047857 60%, #10B981 100%)",
    headerColor: "#047857",
    brandColor: "#FFFFFF",
    accentColor: "#D1FAE5",
    logoText: "MANKIND",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "Broad Cephalosporin Oral Suspension",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-cifran-500": {
    type: "blister",
    brandHeader: "CIFRAN 500",
    brandHindi: "सिफरान ५००",
    tagline: "CIPROFLOXACIN TABLETS I.P. 500 mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #3B82F6 100%)",
    headerColor: "#1E3A8A",
    brandColor: "#FFFFFF",
    accentColor: "#BFDBFE",
    logoText: "SUN PHARMA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "Fluoroquinolone Antibacterial",
    isScheduleH: true,
    isScheduleH1: true
  },
  "med-o2": {
    type: "blister",
    brandHeader: "O2 TABLET",
    brandHindi: "ओ-२ टैबलेट",
    tagline: "OFLOXACIN 200mg + ORNIDAZOLE 500mg",
    headerBg: "linear-gradient(135deg, #7C2D12 0%, #C2410C 60%, #EA580C 100%)",
    headerColor: "#C2410C",
    brandColor: "#FFFFFF",
    accentColor: "#FFEDD5",
    logoText: "MEDLEY",
    pillType: "caplet",
    pillColor: "#FBBF24",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "Antimicrobial & Antiprotozoal Diarrheal Care",
    isScheduleH: true,
    isScheduleH1: true
  },

  // Gastro
  "med-pan-40": {
    type: "blister",
    brandHeader: "PAN 40",
    brandHindi: "पैन ४०",
    tagline: "PANTOPRAZOLE GASTRO-RESISTANT 40 mg",
    headerBg: "linear-gradient(135deg, #581C87 0%, #701A75 60%, #A21CAF 100%)",
    headerColor: "#701A75",
    brandColor: "#FFFFFF",
    accentColor: "#F5D0FE",
    logoText: "ALKEM",
    pillType: "biconvex-round",
    pillColor: "#FACC15",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Proton Pump Inhibitor • Acid Reducer",
    isScheduleH: true
  },
  "med-pantocid-40": {
    type: "blister",
    brandHeader: "PANTOCID 40",
    brandHindi: "पैंटोसिड ४०",
    tagline: "PANTOPRAZOLE SODIUM TABLETS I.P. 40 mg",
    headerBg: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #7C3AED 100%)",
    headerColor: "#312E81",
    brandColor: "#FFFFFF",
    accentColor: "#DDD6FE",
    logoText: "SUN PHARMA",
    pillType: "biconvex-round",
    pillColor: "#FDE047",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "GERD & Acid Peptic Disorder Care",
    isScheduleH: true
  },
  "med-pan-d": {
    type: "blister",
    brandHeader: "PAN-D",
    brandHindi: "पैन-डी",
    tagline: "PANTOPRAZOLE 40mg + DOMPERIDONE SR 30mg",
    headerBg: "linear-gradient(135deg, #4A044E 0%, #701A75 50%, #BE123C 100%)",
    headerColor: "#701A75",
    brandColor: "#FFFFFF",
    accentColor: "#FBCFE8",
    logoText: "ALKEM",
    pillType: "capsule",
    capsuleCap: "#701A75",
    capsuleBody: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Dual Acid Reducer & Anti-Reflux Prokinetic",
    isScheduleH: true
  },
  "med-pantocid-dsr": {
    type: "blister",
    brandHeader: "PANTOCID DSR",
    brandHindi: "पैंटोसिड डीएसआर",
    tagline: "PANTOPRAZOLE 40mg + DOMPERIDONE 30mg SR",
    headerBg: "linear-gradient(135deg, #831843 0%, #9D174D 50%, #C2410C 100%)",
    headerColor: "#9D174D",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "SUN PHARMA",
    pillType: "capsule",
    capsuleCap: "#9D174D",
    capsuleBody: "#FACC15",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Sustained Release Reflux & Nausea Relief",
    isScheduleH: true
  },
  "med-janaushadhi-pantoprazole-40": {
    type: "pmbjp",
    genericName: "PANTOPRAZOLE GASTRO-RESISTANT TABLETS",
    strength: "40 mg",
    hindi: "पैंटोप्राजोल गैस्ट्रो-रेसिस्टेंट गोलियाँ ४० मि.ग्रा.",
    pillType: "biconvex-round",
    pillColor: "#FDE047",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹22.00",
    isScheduleH: true
  },
  "med-omez-20": {
    type: "blister",
    brandHeader: "OMEZ 20",
    brandHindi: "ओमेज़ २०",
    tagline: "OMEPRAZOLE CAPSULES I.P. 20 mg",
    headerBg: "linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0284C7 100%)",
    headerColor: "#0369A1",
    brandColor: "#FFFFFF",
    accentColor: "#BAE6FD",
    logoText: "DR. REDDY'S",
    pillType: "capsule",
    capsuleCap: "#0284C7",
    capsuleBody: "#F0F9FF",
    cols: 10,
    rows: 2,
    foilTone: "silver",
    subBrand: "Micro-Pellet Enteric Proton Pump Inhibitor",
    isScheduleH: true
  },
  "med-razo-20": {
    type: "blister",
    brandHeader: "RAZO 20",
    brandHindi: "राज़ो २०",
    tagline: "RABEPRAZOLE SODIUM TABLETS I.P. 20 mg",
    headerBg: "linear-gradient(135deg, #064E3B 0%, #047857 50%, #10B981 100%)",
    headerColor: "#047857",
    brandColor: "#FFFFFF",
    accentColor: "#A7F3D0",
    logoText: "DR. REDDY'S",
    pillType: "biconvex-round",
    pillColor: "#FDE047",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Fast Action Acid Peptic Healing",
    isScheduleH: true
  },
  "med-emeset-4": {
    type: "blister",
    brandHeader: "EMESET 4",
    brandHindi: "एमेसेट ४",
    tagline: "ONDANSETRON TABLETS I.P. 4 mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #38BDF8 100%)",
    headerColor: "#1E3A8A",
    brandColor: "#FFFFFF",
    accentColor: "#BAE6FD",
    logoText: "CIPLA",
    pillType: "round-small",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "5-HT3 Antiemetic • Nausea & Vomiting Control",
    isScheduleH: true
  },

  // Cardiovascular
  "med-telma-40": {
    type: "blister",
    brandHeader: "TELMA 40",
    brandHindi: "टेल्मा ४०",
    tagline: "TELMISARTAN TABLETS I.P. 40 mg",
    headerBg: "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 60%, #EA580C 100%)",
    headerColor: "#B91C1C",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "GLENMARK",
    pillType: "biconvex-round",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Angiotensin II Receptor Antagonist (ARB)",
    isScheduleH: true
  },
  "med-telmikind-40": {
    type: "blister",
    brandHeader: "TELMIKIND 40",
    brandHindi: "टेल्मीकाइंड ४०",
    tagline: "TELMISARTAN TABLETS I.P. 40 mg",
    headerBg: "linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #F97316 100%)",
    headerColor: "#DC2626",
    brandColor: "#FFFFFF",
    accentColor: "#FFEDD5",
    logoText: "MANKIND",
    pillType: "biconvex-round",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "alu-alu",
    subBrand: "24-Hour Blood Pressure Management",
    isScheduleH: true
  },
  "med-janaushadhi-telmisartan-40": {
    type: "pmbjp",
    genericName: "TELMISARTAN TABLETS I.P.",
    strength: "40 mg",
    hindi: "टेल्मिसार्टन गोलियाँ ४० मि.ग्रा.",
    pillType: "biconvex-round",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹14.50",
    isScheduleH: true
  },
  "med-amlopres-5": {
    type: "blister",
    brandHeader: "AMLOPRES 5",
    brandHindi: "एमलोप्रेस ५",
    tagline: "AMLODIPINE BESYLATE TABLETS I.P. 5 mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #0284C7 100%)",
    headerColor: "#1D4ED8",
    brandColor: "#FFFFFF",
    accentColor: "#BFDBFE",
    logoText: "CIPLA",
    pillType: "round-small",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 3,
    foilTone: "silver",
    subBrand: "Calcium Channel Blocker Vasodilator",
    isScheduleH: true
  },
  "med-cardace-5": {
    type: "blister",
    brandHeader: "CARDACE 5",
    brandHindi: "कारडेस ५",
    tagline: "RAMIPRIL TABLETS I.P. 5 mg",
    headerBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #3B82F6 100%)",
    headerColor: "#1E293B",
    brandColor: "#FFFFFF",
    accentColor: "#FACC15",
    logoText: "SANOFI",
    pillType: "round-small",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Cardioprotective ACE Inhibitor",
    isScheduleH: true
  },
  "med-betaloc-50": {
    type: "blister",
    brandHeader: "BETALOC 50",
    brandHindi: "बीटालॉक ५०",
    tagline: "METOPROLOL TARTRATE TABLETS 50 mg",
    headerBg: "linear-gradient(135deg, #042F2E 0%, #115E59 50%, #14B8A6 100%)",
    headerColor: "#115E59",
    brandColor: "#FFFFFF",
    accentColor: "#99F6E4",
    logoText: "ASTRAZENECA",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 3,
    foilTone: "silver",
    subBrand: "Selective Cardioselective Beta Blocker",
    isScheduleH: true
  },
  "med-ecosprin-75": {
    type: "blister",
    brandHeader: "ECOSPRIN 75",
    brandHindi: "इकोस्प्रिन ७५",
    tagline: "ASPIRIN GASTRO-RESISTANT TABLETS 75 mg",
    headerBg: "linear-gradient(135deg, #9A3412 0%, #EA580C 60%, #FB923C 100%)",
    headerColor: "#EA580C",
    brandColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    logoText: "USV",
    pillType: "biconvex-round",
    pillColor: "#FB923C",
    cols: 7,
    rows: 2,
    foilTone: "silver",
    subBrand: "Low-Dose Antiplatelet Cardio Protection",
    isScheduleH: true
  },

  // Diabetes
  "med-glycomet-500": {
    type: "blister",
    brandHeader: "GLYCOMET 500",
    brandHindi: "ग्लाइकोमेट ५००",
    tagline: "METFORMIN HYDROCHLORIDE TABLETS 500 mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #3B82F6 100%)",
    headerColor: "#1D4ED8",
    brandColor: "#FFFFFF",
    accentColor: "#BFDBFE",
    logoText: "USV",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 2,
    foilTone: "silver",
    subBrand: "First-Line Type 2 Glycemic Control",
    isScheduleH: true
  },
  "med-glycomet-sr-500": {
    type: "blister",
    brandHeader: "GLYCOMET-SR 500",
    brandHindi: "ग्लाइकोमेट-एसआर ५००",
    tagline: "METFORMIN SUSTAINED RELEASE 500 mg",
    headerBg: "linear-gradient(135deg, #0F172A 0%, #172554 60%, #D97706 100%)",
    headerColor: "#172554",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "USV",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 2,
    foilTone: "silver",
    subBrand: "Extended Release Glycemic Management",
    isScheduleH: true
  },
  "med-janaushadhi-metformin-500": {
    type: "pmbjp",
    genericName: "METFORMIN HYDROCHLORIDE TABLETS I.P.",
    strength: "500 mg",
    hindi: "मेटफॉर्मिन हाइड्रोक्लोराइड गोलियाँ ५०० मि.ग्रा.",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹9.00",
    isScheduleH: true
  },
  "med-amaryl-1": {
    type: "blister",
    brandHeader: "AMARYL 1",
    brandHindi: "एमरिल १",
    tagline: "GLIMEPIRIDE TABLETS I.P. 1 mg",
    headerBg: "linear-gradient(135deg, #0891B2 0%, #06B6D4 60%, #22D3EE 100%)",
    headerColor: "#0891B2",
    brandColor: "#FFFFFF",
    accentColor: "#ECFEFF",
    logoText: "SANOFI",
    pillType: "round-small",
    pillColor: "#FFFFFF",
    cols: 10,
    rows: 3,
    foilTone: "silver",
    subBrand: "2nd Gen Sulfonylurea Pancreatic Insulin Release",
    isScheduleH: true
  },
  "med-galvus-50": {
    type: "blister",
    brandHeader: "GALVUS 50",
    brandHindi: "गैल्वस ५०",
    tagline: "VILDAGLIPTIN TABLETS 50 mg",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #4F46E5 100%)",
    headerColor: "#1E3A8A",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "NOVARTIS",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 7,
    rows: 2,
    foilTone: "silver",
    subBrand: "DPP-4 Inhibitor Glycemic Control",
    isScheduleH: true
  },
  "med-forxiga-10": {
    type: "blister",
    brandHeader: "FORXIGA 10",
    brandHindi: "फॉक्सीगा १०",
    tagline: "DAPAGLIFLOZIN TABLETS 10 mg",
    headerBg: "linear-gradient(135deg, #064E3B 0%, #059669 50%, #D97706 100%)",
    headerColor: "#059669",
    brandColor: "#FFFFFF",
    accentColor: "#FEF3C7",
    logoText: "ASTRAZENECA",
    pillType: "biconvex-round",
    pillColor: "#FDE047",
    cols: 7,
    rows: 2,
    foilTone: "silver",
    subBrand: "SGLT2 Inhibitor Cardio-Renal Protection",
    isScheduleH: true
  },

  // Respiratory & Allergy
  "med-montair-lc": {
    type: "blister",
    brandHeader: "MONTAIR-LC",
    brandHindi: "मोंटेयर-एलसी",
    tagline: "MONTELUKAST 10mg + LEVOCETIRIZINE 5mg",
    headerBg: "linear-gradient(135deg, #0284C7 0%, #0369A1 50%, #BE123C 100%)",
    headerColor: "#0369A1",
    brandColor: "#FFFFFF",
    accentColor: "#FFE4E6",
    logoText: "CIPLA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "alu-alu",
    subBrand: "Dual Action Allergic Rhinitis & Bronchospasm",
    isScheduleH: true
  },
  "med-janaushadhi-montelukast-levocetirizine": {
    type: "pmbjp",
    genericName: "MONTELUKAST & LEVOCETIRIZINE TABLETS",
    strength: "10 mg + 5 mg",
    hindi: "मोंटेलुकास्ट एवं लेवोसेटिरिज़िन गोलियाँ",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹32.00",
    isScheduleH: true
  },
  "med-allegra-120": {
    type: "blister",
    brandHeader: "ALLEGRA 120",
    brandHindi: "एलेग्रा १२०",
    tagline: "FEXOFENADINE HYDROCHLORIDE TABLETS 120 mg",
    headerBg: "linear-gradient(135deg, #581C87 0%, #7E22CE 50%, #E11D48 100%)",
    headerColor: "#7E22CE",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "SANOFI",
    pillType: "caplet",
    pillColor: "#FED7AA",
    cols: 5,
    rows: 2,
    foilTone: "silver",
    subBrand: "24-Hour Non-Drowsy Anti-Allergic",
    isScheduleH: true
  },
  "med-asthalin-inhaler": {
    type: "inhaler",
    brandHeader: "ASTHALIN",
    brandHindi: "अस्थालिन इनहेलर",
    tagline: "SALBUTAMOL INHALER B.P. 100 mcg",
    logoText: "CIPLA",
    mrp: "₹148.00",
    puffs: "200 Metered Doses",
    isScheduleH: true
  },

  // Vitamins & Supplements
  "med-shelcal-500": {
    type: "blister",
    brandHeader: "SHELCAL 500",
    brandHindi: "शैलकल ५००",
    tagline: "CALCIUM 500mg FROM OYSTER SHELL + VITAMIN D3",
    headerBg: "linear-gradient(135deg, #14532D 0%, #15803D 50%, #0284C7 100%)",
    headerColor: "#15803D",
    brandColor: "#FFFFFF",
    accentColor: "#BBF7D0",
    logoText: "TORRENT",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Bone Mineral Density & Calcium Therapy",
    isScheduleH: false
  },
  "med-cipcal-500": {
    type: "blister",
    brandHeader: "CIPCAL 500",
    brandHindi: "सिपकल ५००",
    tagline: "CALCIUM CARBONATE 500mg + VITAMIN D3 250 IU",
    headerBg: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #16A34A 100%)",
    headerColor: "#1D4ED8",
    brandColor: "#FFFFFF",
    accentColor: "#DCFCE7",
    logoText: "CIPLA",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "High Elemental Calcium with Cholecalciferol",
    isScheduleH: false
  },
  "med-janaushadhi-calcium-vitd3": {
    type: "pmbjp",
    genericName: "CALCIUM CARBONATE & VITAMIN D3 TABLETS",
    strength: "500 mg + 250 IU",
    hindi: "कैल्शियम कार्बोनेट एवं विटामिन डी३ गोलियाँ",
    pillType: "caplet",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    pack: "10 Tablets",
    mrp: "₹18.00",
    isScheduleH: false
  },
  "med-becosules-z": {
    type: "blister",
    brandHeader: "BECOSULES Z",
    brandHindi: "बिकोसूल्स ज़ेड",
    tagline: "B-COMPLEX FORTE WITH VITAMIN C & ZINC",
    headerBg: "linear-gradient(135deg, #451A03 0%, #78350F 50%, #D97706 100%)",
    headerColor: "#78350F",
    brandColor: "#FFFFFF",
    accentColor: "#FDE047",
    logoText: "PFIZER",
    pillType: "capsule",
    capsuleCap: "#451A03",
    capsuleBody: "#EAB308",
    cols: 10,
    rows: 2,
    foilTone: "amber-gold",
    subBrand: "Cellular Energy, Immunity & Vitality Capsule",
    isScheduleH: false
  },
  "med-neurobion-forte": {
    type: "blister",
    brandHeader: "NEUROBION FORTE",
    brandHindi: "न्यूरोबायोन फोर्टे",
    tagline: "VITAMIN B1, B6 & VITAMIN B12 WITH NICOTINAMIDE",
    headerBg: "linear-gradient(135deg, #831843 0%, #BE185D 50%, #E11D48 100%)",
    headerColor: "#BE185D",
    brandColor: "#FFFFFF",
    accentColor: "#FFE4E6",
    logoText: "PROCTER & GAMBLE",
    pillType: "biconvex-round",
    pillColor: "#BE185D",
    cols: 10,
    rows: 3,
    foilTone: "silver",
    subBrand: "Nerve Health & Peripheral Neuropathy Care",
    isScheduleH: false
  },
  "med-limcee-500": {
    type: "blister",
    brandHeader: "LIMCEE 500",
    brandHindi: "लिम्सी ५००",
    tagline: "ASCORBIC ACID CHEWABLE TABLETS 500 mg",
    headerBg: "linear-gradient(135deg, #7C2D12 0%, #EA580C 50%, #F59E0B 100%)",
    headerColor: "#EA580C",
    brandColor: "#FFFFFF",
    accentColor: "#FEF08A",
    logoText: "ABBOTT",
    pillType: "chewable-orange",
    pillColor: "#FB923C",
    cols: 5,
    rows: 3,
    foilTone: "orange-foil",
    subBrand: "Orange Flavour Vitamin C Antioxidant",
    isScheduleH: false
  },

  // CNS & Psychiatry
  "med-clonafit-05": {
    type: "blister",
    brandHeader: "CLONAFIT 0.5",
    brandHindi: "क्लोनाफिट ०.५",
    tagline: "CLONAZEPAM TABLETS I.P. 0.5 mg",
    headerBg: "linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)",
    headerColor: "#BE123C",
    brandColor: "#FFFFFF",
    accentColor: "#FFE4E6",
    logoText: "MANKIND",
    pillType: "round-scored",
    pillColor: "#FECDD3",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "GABA-A Receptor Anxiolytic & Anticonvulsant",
    isScheduleH: true
  },
  "med-nexito-10": {
    type: "blister",
    brandHeader: "NEXITO 10",
    brandHindi: "नेक्सिटो १०",
    tagline: "ESCITALOPRAM TABLETS I.P. 10 mg",
    headerBg: "linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)",
    headerColor: "#6D28D9",
    brandColor: "#FFFFFF",
    accentColor: "#EDE9FE",
    logoText: "SUN PHARMA",
    pillType: "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 3,
    foilTone: "silver",
    subBrand: "Selective Serotonin Reuptake Inhibitor (SSRI)",
    isScheduleH: true
  },

  // AYUSH Herbal
  "med-himalaya-liv-52": {
    type: "ayush-bottle",
    brandHeader: "Himalaya LIV.52",
    brandHindi: "लिव.५२ गोलियाँ",
    tagline: "HERBAL HEPATOPROTECTIVE RASAYANA",
    capColor: "#15803D",
    bottleColor: "#FFFFFF",
    accentColor: "#F59E0B",
    countText: "100 Tablets",
    mrp: "₹180.00",
    mfg: "The Himalaya Drug Company",
    features: ["Himsra (Capparis spinosa)", "Kasani (Cichorium intybus)"]
  },
  "med-himalaya-cystone": {
    type: "ayush-bottle",
    brandHeader: "Himalaya CYSTONE",
    brandHindi: "सिस्टोन गोलियाँ",
    tagline: "HERBAL RENAL & URINARY CARE FORMULA",
    capColor: "#15803D",
    bottleColor: "#FFFFFF",
    accentColor: "#0284C7",
    countText: "60 Tablets",
    mrp: "₹175.00",
    mfg: "The Himalaya Drug Company",
    features: ["Shilapushpa (Didymocarpus)", "Pasanabheda (Saxifraga)"]
  },
  "med-dabur-chyawanprash": {
    type: "ayush-jar",
    brandHeader: "Dabur CHYAWANPRASH",
    brandHindi: "डाबर च्यवनप्राश",
    tagline: "AUTHENTIC AYURVEDIC RASAYANA WITH 40+ HERBS",
    jarColor: "#78350F",
    lidColor: "#F59E0B",
    mrp: "₹230.00",
    netWeight: "500 g",
    mfg: "Dabur India Limited",
    features: ["Amla Rasayana", "Clinically Tested Immunity 2X Protection"]
  }
};

// -----------------------------------------------------------------------------
// SVG RENDERING ENGINES
// -----------------------------------------------------------------------------

// 1. INHALER RENDERER (Asthalin Inhaler)
function renderInhalerSVG(meta, med) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#090E17; border-radius:18px;">
  <defs>
    <!-- Actuator Plastic Gradient -->
    <linearGradient id="actuator-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="25%" stop-color="#0284C7" />
      <stop offset="70%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#075985" />
    </linearGradient>

    <!-- Aluminum Canister Metallic Shimmer -->
    <linearGradient id="canister-alu" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8" />
      <stop offset="30%" stop-color="#F1F5F9" />
      <stop offset="60%" stop-color="#CBD5E1" />
      <stop offset="85%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#64748B" />
    </linearGradient>

    <!-- Mouthpiece Cap Gradient -->
    <linearGradient id="cap-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0EA5E9" />
      <stop offset="100%" stop-color="#0369A1" />
    </linearGradient>

    <filter id="inhaler-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Studio Stage Background Lighting -->
  <radialGradient id="stage-spot" cx="35%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9" />
    <stop offset="100%" stop-color="#090E17" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#stage-spot)" />

  <!-- Ambient Ground Shadow -->
  <ellipse cx="220" cy="345" rx="140" ry="16" fill="#000000" opacity="0.6" />

  <!-- 3D Pressurized Metered-Dose Inhaler (pMDI) -->
  <g filter="url(#inhaler-shadow)">
    <!-- 1. Metallic Aerosol Canister Top -->
    <rect x="175" y="45" width="85" height="70" rx="8" fill="url(#canister-alu)" stroke="#475569" stroke-width="1.2" />
    <ellipse cx="217.5" cy="45" rx="42.5" ry="10" fill="#E2E8F0" stroke="#64748B" stroke-width="1" />
    
    <!-- Dose Counter Notch on Canister Rim -->
    <rect x="202" y="60" width="32" height="18" rx="4" fill="#0F172A" />
    <text x="218" y="73" text-anchor="middle" font-family="monospace" font-size="10" font-weight="900" fill="#38BDF8">200</text>
    <text x="218" y="92" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7" font-weight="800" fill="#94A3B8" letter-spacing="1">CFC FREE</text>

    <!-- 2. L-Shaped Ergonomic Medical Plastic Actuator Body -->
    <!-- Vertical Column -->
    <path d="M 160 95 L 275 95 L 275 250 Q 275 295 240 310 L 130 310 Q 110 310 110 290 L 110 250 Q 110 230 160 230 Z" fill="url(#actuator-body)" stroke="#0284C7" stroke-width="1.5" />

    <!-- Specular Highlight Curve on Plastic -->
    <path d="M 170 105 L 178 105 L 178 240 Q 178 280 205 298 L 195 298 Q 170 280 170 240 Z" fill="#FFFFFF" opacity="0.25" />

    <!-- Mouthpiece Extension (Horizontal Spout) -->
    <path d="M 110 245 L 85 248 Q 70 252 70 270 Q 70 288 85 292 L 110 295 Z" fill="#0284C7" stroke="#0369A1" stroke-width="1" />
    
    <!-- Mouthpiece Dust Cap Attached with Strap -->
    <path d="M 68 250 L 52 254 Q 40 258 40 270 Q 40 282 52 286 L 68 290 Z" fill="url(#cap-blue)" stroke="#38BDF8" stroke-width="1.5" />
    <ellipse cx="40" cy="270" rx="4" ry="16" fill="#0369A1" />
    <!-- Flexible retaining loop strap -->
    <path d="M 60 290 Q 75 325 125 315" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />

    <!-- Authentic Brand Label on Inhaler Body -->
    <rect x="180" y="125" width="80" height="95" rx="6" fill="#FFFFFF" />
    <rect x="180" y="125" width="80" height="20" rx="6" fill="#0284C7" />
    <text x="220" y="139" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF">CIPLA</text>
    
    <text x="220" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#075985" letter-spacing="0.5">ASTHALIN</text>
    <text x="220" y="174" text-anchor="middle" font-family="'Noto Sans Devanagari', system-ui" font-size="8.5" font-weight="700" fill="#0284C7">अस्थालिन इनहेलर</text>
    <text x="220" y="190" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#475569">Salbutamol 100mcg</text>
    <text x="220" y="202" text-anchor="middle" font-family="system-ui, sans-serif" font-size="6.5" font-weight="800" fill="#BE123C">SCHEDULE H DRUG</text>
    <text x="220" y="214" text-anchor="middle" font-family="monospace" font-size="6.5" font-weight="700" fill="#64748B">200 PUFFS • ₹148.00</text>
  </g>

  <!-- Right Information Display Panel -->
  <g transform="translate(320, 60)">
    <!-- Verification Badge -->
    <rect x="0" y="0" width="130" height="22" rx="6" fill="#0369A1" />
    <text x="65" y="14" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">METERED DOSE INHALER</text>

    <text x="0" y="50" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
      ASTHALIN INHALER
    </text>
    <text x="0" y="70" font-family="'Noto Sans Devanagari', system-ui" font-size="13" font-weight="700" fill="#38BDF8">
      अस्थालिन इनहेलर (सालव्युटामोल)
    </text>

    <!-- Salt & Clinical Delivery -->
    <text x="0" y="98" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#E2E8F0">
      Salbutamol Inhalation Aerosol B.P. 100 mcg
    </text>
    <text x="0" y="115" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">
      Each actuation delivers Salbutamol 100 mcg (CFC-Free)
    </text>

    <!-- Schedule H Statutory Red Line Warning Box -->
    <rect x="0" y="132" width="250" height="42" rx="6" fill="#450A0A" stroke="#DC2626" stroke-width="1.2" />
    <text x="10" y="148" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#EF4444" letter-spacing="0.5">
      SCHEDULE H PRESCRIPTION DRUG - CAUTION
    </text>
    <text x="10" y="162" font-family="system-ui, sans-serif" font-size="7.5" font-weight="600" fill="#FCA5A5">
      To be sold by retail on the prescription of an RMP only.
    </text>

    <!-- Packaging & Regulatory Batch Card -->
    <rect x="0" y="190" width="250" height="70" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1" />
    <text x="12" y="212" font-family="monospace" font-size="9.5" font-weight="700" fill="#E2E8F0">
      CANISTER: 200 Actuations (Pressurized)
    </text>
    <text x="12" y="230" font-family="monospace" font-size="9.5" font-weight="700" fill="#34D399">
      MAX RETAIL PRICE: ₹148.00 (Incl. Taxes)
    </text>
    <text x="12" y="248" font-family="monospace" font-size="8.5" font-weight="600" fill="#94A3B8">
      MFG: Cipla Ltd • GTIN: 08901117009899
    </text>
  </g>
</svg>`;
}

// 2. AYURVEDIC BOTTLE RENDERER (Himalaya Liv.52, Cystone)
function renderAyushBottleSVG(meta, med) {
  const isLiv52 = med.id.includes("liv-52");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#081018; border-radius:18px;">
  <defs>
    <!-- White Bottle Body Cylindrical Gradient -->
    <linearGradient id="bottle-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CBD5E1" />
      <stop offset="25%" stop-color="#F8FAFC" />
      <stop offset="65%" stop-color="#FFFFFF" />
      <stop offset="90%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>

    <!-- Forest Green Ribbed Cap Gradient -->
    <linearGradient id="green-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#064E3B" />
      <stop offset="35%" stop-color="#047857" />
      <stop offset="65%" stop-color="#10B981" />
      <stop offset="90%" stop-color="#047857" />
      <stop offset="100%" stop-color="#064E3B" />
    </linearGradient>

    <!-- Gold Foil Neck Seal -->
    <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B45309" />
      <stop offset="50%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <filter id="bottle-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Ambient Light -->
  <radialGradient id="stage-spot" cx="30%" cy="50%" r="65%">
    <stop offset="0%" stop-color="#064E3B" stop-opacity="0.4" />
    <stop offset="100%" stop-color="#081018" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#stage-spot)" />

  <!-- Ground Shadow -->
  <ellipse cx="190" cy="345" rx="110" ry="16" fill="#000000" opacity="0.6" />

  <!-- 3D Cylindrical Pharmaceutical Bottle -->
  <g filter="url(#bottle-shadow)">
    <!-- 1. Ribbed Cap -->
    <rect x="135" y="45" width="110" height="42" rx="8" fill="url(#green-cap)" stroke="#065F46" stroke-width="1.2" />
    <!-- Cap Gripping Ribs -->
    ${[...Array(11)].map((_, i) => `
      <line x1="${142 + i * 9}" y1="48" x2="${142 + i * 9}" y2="83" stroke="#064E3B" stroke-width="2" opacity="0.5" />
      <line x1="${143 + i * 9}" y1="48" x2="${143 + i * 9}" y2="83" stroke="#34D399" stroke-width="1" opacity="0.4" />
    `).join("")}

    <!-- 2. Gold Tamper-Evident Safety Ring -->
    <rect x="140" y="87" width="100" height="10" rx="3" fill="url(#gold-seal)" stroke="#B45309" stroke-width="0.8" />

    <!-- 3. White HDPE Cylindrical Bottle Body -->
    <rect x="110" y="97" width="160" height="235" rx="20" fill="url(#bottle-body)" stroke="#94A3B8" stroke-width="1.2" />
    
    <!-- Specular Reflection Column -->
    <rect x="135" y="105" width="18" height="215" rx="8" fill="#FFFFFF" opacity="0.4" />

    <!-- 4. Front Label Graphic -->
    <rect x="118" y="115" width="144" height="200" rx="10" fill="#FFFDF8" stroke="#E2DCD5" stroke-width="1" />
    
    <!-- Brand Top Ribbon -->
    <rect x="118" y="115" width="144" height="38" rx="10" fill="#047857" />
    <rect x="118" y="140" width="144" height="13" fill="#047857" />
    <text x="190" y="134" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      Himalaya SINCE 1930
    </text>

    <!-- Main Medicine Logo -->
    <text x="190" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#064E3B" letter-spacing="0.5">
      ${isLiv52 ? "Liv.52" : "Cystone"}
    </text>
    <text x="190" y="196" text-anchor="middle" font-family="'Noto Sans Devanagari', system-ui" font-size="10.5" font-weight="700" fill="#D97706">
      ${isLiv52 ? "लिव.५२" : "सिस्टोन"}
    </text>

    <!-- Ayurvedic Indicator & Pack Count -->
    <rect x="135" y="210" width="110" height="18" rx="4" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" />
    <text x="190" y="222" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#047857">
      ${meta.countText} • HERBAL
    </text>

    <text x="190" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="700" fill="#334155">
      ${isLiv52 ? "Hepatoprotective Formula" : "Renal & Urinary Care"}
    </text>
    <text x="190" y="264" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7.5" font-weight="600" fill="#64748B">
      ${isLiv52 ? "Promotes Liver Function" : "Helps Flush Urinary Tract"}
    </text>

    <!-- Authentic GMP & MRP footer -->
    <rect x="118" y="285" width="144" height="30" rx="8" fill="#F8FAFC" />
    <text x="190" y="298" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="800" fill="#0F172A">
      MRP ${meta.mrp}
    </text>
    <text x="190" y="309" text-anchor="middle" font-family="system-ui, sans-serif" font-size="6.5" font-weight="700" fill="#64748B">
      AYURVEDIC PROPRIETARY MEDICINE
    </text>
  </g>

  <!-- Right Information Panel -->
  <g transform="translate(310, 55)">
    <!-- AYUSH Badge -->
    <rect x="0" y="0" width="145" height="22" rx="6" fill="#047857" />
    <text x="72.5" y="14" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">AYURVEDA RASAYANA</text>

    <text x="0" y="50" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF">
      ${med.brandName}
    </text>
    <text x="0" y="70" font-family="'Noto Sans Devanagari', system-ui" font-size="13" font-weight="700" fill="#34D399">
      ${med.brandNameHindi || "आयुर्वेदिक औषधि"}
    </text>

    <text x="0" y="96" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#E2E8F0">
      ${med.saltComposition}
    </text>
    <text x="0" y="113" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">
      Standardized traditional polyherbal therapeutic formulation
    </text>

    <!-- Key Active Herbs -->
    <rect x="0" y="132" width="260" height="52" rx="8" fill="#064E3B" stroke="#059669" stroke-width="1" opacity="0.8" />
    <text x="12" y="152" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#34D399" letter-spacing="0.5">
      ACTIVE BOTANICAL CONSTITUENTS
    </text>
    <text x="12" y="170" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#F8FAFC">
      ${meta.features.join(" • ")}
    </text>

    <!-- Batch & Regulatory Info -->
    <rect x="0" y="198" width="260" height="70" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1" />
    <text x="12" y="220" font-family="monospace" font-size="9.5" font-weight="700" fill="#E2E8F0">
      PACKAGE: Bottle of ${med.packSize} Tablets
    </text>
    <text x="12" y="238" font-family="monospace" font-size="9.5" font-weight="700" fill="#34D399">
      MAX RETAIL PRICE: ₹${med.mrp.toFixed(2)} (₹${med.pricePerUnit.toFixed(2)}/tab)
    </text>
    <text x="12" y="256" font-family="monospace" font-size="8.5" font-weight="600" fill="#94A3B8">
      MFG: ${med.manufacturer.name} • GTIN: ${med.gtin || "08901138801234"}
    </text>
  </g>
</svg>`;
}

// 3. AYURVEDIC JAR RENDERER (Dabur Chyawanprash)
function renderAyushJarSVG(meta, med) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#081018; border-radius:18px;">
  <defs>
    <!-- Dark Amber/Maroon Jar Body Gradient -->
    <linearGradient id="jar-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#451A03" />
      <stop offset="25%" stop-color="#78350F" />
      <stop offset="65%" stop-color="#9A3412" />
      <stop offset="90%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>

    <!-- Metallic Gold Cap Gradient -->
    <linearGradient id="gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#92400E" />
      <stop offset="25%" stop-color="#FBBF24" />
      <stop offset="60%" stop-color="#FDE68A" />
      <stop offset="85%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>

    <filter id="jar-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Ambient Light -->
  <radialGradient id="stage-spot" cx="30%" cy="50%" r="65%">
    <stop offset="0%" stop-color="#78350F" stop-opacity="0.4" />
    <stop offset="100%" stop-color="#081018" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#stage-spot)" />

  <!-- Ground Shadow -->
  <ellipse cx="195" cy="345" rx="125" ry="16" fill="#000000" opacity="0.6" />

  <!-- 3D Wide Mouth Amber Glass / PET Jar -->
  <g filter="url(#jar-shadow)">
    <!-- 1. Metallic Gold Screw Cap -->
    <rect x="130" y="45" width="130" height="45" rx="10" fill="url(#gold-cap)" stroke="#B45309" stroke-width="1.2" />
    ${[...Array(13)].map((_, i) => `
      <line x1="${138 + i * 9}" y1="48" x2="${138 + i * 9}" y2="86" stroke="#78350F" stroke-width="1.8" opacity="0.4" />
      <line x1="${139 + i * 9}" y1="48" x2="${139 + i * 9}" y2="86" stroke="#FEF3C7" stroke-width="1" opacity="0.5" />
    `).join("")}

    <!-- 2. Jar Neck Ring -->
    <rect x="135" y="90" width="120" height="12" rx="4" fill="#78350F" stroke="#451A03" stroke-width="1" />

    <!-- 3. Wide Jar Body -->
    <rect x="105" y="102" width="180" height="230" rx="26" fill="url(#jar-body)" stroke="#451A03" stroke-width="1.5" />
    
    <!-- Specular Highlight Column -->
    <rect x="130" y="110" width="22" height="210" rx="10" fill="#FFFFFF" opacity="0.25" />

    <!-- 4. Front Label Graphic -->
    <rect x="114" y="120" width="162" height="195" rx="12" fill="#FFFDF8" stroke="#E2DCD5" stroke-width="1" />
    
    <!-- Red Dabur Header Ribbon -->
    <rect x="114" y="120" width="162" height="38" rx="12" fill="#BE123C" />
    <rect x="114" y="145" width="162" height="13" fill="#BE123C" />
    <text x="195" y="139" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      Dabur
    </text>

    <!-- Main Medicine Logo -->
    <text x="195" y="182" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#78350F">
      CHYAWANPRASH
    </text>
    <text x="195" y="198" text-anchor="middle" font-family="'Noto Sans Devanagari', system-ui" font-size="11" font-weight="700" fill="#BE123C">
      डाबर च्यवनप्राश
    </text>

    <!-- Immunity Badge -->
    <rect x="135" y="212" width="120" height="20" rx="6" fill="#FEF3C7" stroke="#FBBF24" stroke-width="1" />
    <text x="195" y="226" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#92400E">
      2X IMMUNITY • 40+ HERBS
    </text>

    <text x="195" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="700" fill="#334155">
      Enriched with Fresh Amla &amp; Ghee
    </text>
    <text x="195" y="268" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7.5" font-weight="600" fill="#64748B">
      Authentic Ayurvedic Rasayana Paste
    </text>

    <!-- Pack weight & MRP footer -->
    <rect x="114" y="285" width="162" height="30" rx="8" fill="#F8FAFC" />
    <text x="195" y="298" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="800" fill="#0F172A">
      NET: ${meta.netWeight} • MRP ${meta.mrp}
    </text>
    <text x="195" y="309" text-anchor="middle" font-family="system-ui, sans-serif" font-size="6.5" font-weight="700" fill="#64748B">
      DABUR INDIA LIMITED • SHREE BAIDYANATH
    </text>
  </g>

  <!-- Right Information Panel -->
  <g transform="translate(320, 55)">
    <rect x="0" y="0" width="145" height="22" rx="6" fill="#B45309" />
    <text x="72.5" y="14" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">AYURVEDA RASAYANA</text>

    <text x="0" y="50" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF">
      ${med.brandName}
    </text>
    <text x="0" y="70" font-family="'Noto Sans Devanagari', system-ui" font-size="13" font-weight="700" fill="#FBBF24">
      ${med.brandNameHindi || "डाबर च्यवनप्राश (अवलेह)"}
    </text>

    <text x="0" y="96" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#E2E8F0">
      ${med.saltComposition}
    </text>
    <text x="0" y="113" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">
      Traditional Ayurvedic restorative jam for respiratory &amp; immune health
    </text>

    <!-- Key Active Herbs -->
    <rect x="0" y="132" width="250" height="52" rx="8" fill="#78350F" stroke="#B45309" stroke-width="1" opacity="0.8" />
    <text x="12" y="152" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#FDE68A" letter-spacing="0.5">
      KEY INGREDIENTS
    </text>
    <text x="12" y="170" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#F8FAFC">
      ${meta.features.join(" • ")}
    </text>

    <!-- Batch & Regulatory Info -->
    <rect x="0" y="198" width="250" height="70" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1" />
    <text x="12" y="220" font-family="monospace" font-size="9.5" font-weight="700" fill="#E2E8F0">
      PACK: Glass Jar of 500 grams
    </text>
    <text x="12" y="238" font-family="monospace" font-size="9.5" font-weight="700" fill="#34D399">
      MAX RETAIL PRICE: ₹${med.mrp.toFixed(2)} (₹0.46/g)
    </text>
    <text x="12" y="256" font-family="monospace" font-size="8.5" font-weight="600" fill="#94A3B8">
      MFG: ${med.manufacturer.name} • AYUSH LICENSED
    </text>
  </g>
</svg>`;
}

// 4. GOVERNMENT JAN AUSHADHI PMBJP GENERIC BLISTER RENDERER
function renderPmbjpGenericSVG(meta, med) {
  const isScheduleH = med.prescriptionCategory === "Schedule H" || med.prescriptionCategory === "Schedule H1";
  const cols = meta.cols || 5;
  const rows = meta.rows || 2;
  const totalSlots = cols * rows;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#090E17; border-radius:18px;">
  <defs>
    <!-- Matte Paper-Back / White Foil Gradient -->
    <linearGradient id="pmbjp-paper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="30%" stop-color="#F8FAFC" />
      <stop offset="70%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>

    <!-- Official PMBJP Emerald Green Ribbon -->
    <linearGradient id="pmbjp-green" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#044E47" />
      <stop offset="50%" stop-color="#00796B" />
      <stop offset="100%" stop-color="#00897B" />
    </linearGradient>

    <!-- Cavity Shadow -->
    <radialGradient id="pocket-cavity" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="transparent" />
      <stop offset="90%" stop-color="#64748B" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#334155" stop-opacity="0.65" />
    </radialGradient>

    <!-- Blister Rim Highlight -->
    <linearGradient id="pocket-rim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#CBD5E1" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#475569" stop-opacity="0.7" />
    </linearGradient>

    <filter id="blister-shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Ambient Light -->
  <radialGradient id="ambient" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="#004D40" stop-opacity="0.3" />
    <stop offset="100%" stop-color="#090E17" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#ambient)" />

  <!-- Ground Shadow -->
  <ellipse cx="300" cy="350" rx="265" ry="16" fill="#000000" opacity="0.55" />

  <!-- Main Blister Card -->
  <g filter="url(#blister-shadow)">
    <!-- Base Card Body -->
    <rect x="25" y="25" width="550" height="315" rx="16" fill="url(#pmbjp-paper)" stroke="#94A3B8" stroke-width="1.2" />

    <!-- Official PMBJP Green Top Header Band -->
    <rect x="25" y="25" width="550" height="64" rx="16" fill="url(#pmbjp-green)" />
    <rect x="25" y="55" width="550" height="34" fill="url(#pmbjp-green)" />

    <!-- Government Saffron & Green Accent Tri-Stripe -->
    <rect x="25" y="85" width="550" height="4" fill="#FF9933" />

    <!-- PMBJP Emblem & Header Typography -->
    <g transform="translate(45, 42)">
      <!-- Government National Emblem / PMBJP Badge -->
      <circle cx="20" cy="18" r="16" fill="#FFFFFF" />
      <circle cx="20" cy="18" r="13" fill="#00796B" />
      <text x="20" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#FF9933">PM</text>

      <text x="45" y="14" font-family="'Noto Sans Devanagari', system-ui" font-size="12" font-weight="900" fill="#FFFFFF">
        प्रधानमंत्री भारतीय जनऔषधि परियोजना
      </text>
      <text x="45" y="29" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#E0F2F1" letter-spacing="0.5">
        PRADHAN MANTRI BHARTIYA JANAUSHADHI PARIYOJANA (PMBJP)
      </text>
    </g>

    <!-- Pack size / Certified Badge on Header Right -->
    <rect x="420" y="38" width="135" height="28" rx="6" fill="#004D40" stroke="#80CBC4" stroke-width="1" />
    <text x="487.5" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF">
      ✓ BPPI CERTIFIED
    </text>

    <!-- Central Generic Name -->
    <g transform="translate(45, 105)">
      <text x="0" y="16" font-family="system-ui, sans-serif" font-size="17" font-weight="900" fill="#004D40">
        ${meta.genericName}
      </text>
      <text x="0" y="34" font-family="'Noto Sans Devanagari', system-ui" font-size="12" font-weight="700" fill="#00796B">
        ${meta.hindi}
      </text>
    </g>

    <!-- Mandatory Schedule H / H1 Lal Lakir Warning Stripe if applicable -->
    ${isScheduleH ? `
    <rect x="25" y="146" width="550" height="15" fill="#DC2626" />
    <text x="300" y="157" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7.5" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      SCHEDULE H PRESCRIPTION DRUG - CAUTION: NOT TO BE SOLD BY RETAIL WITHOUT PRESCRIPTION
    </text>
    ` : `
    <line x1="25" y1="150" x2="575" y2="150" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4" />
    `}

    <!-- Tablet / Capsule Cavity Relief Grid -->
    <g transform="translate(45, ${isScheduleH ? 175 : 165})">
      ${renderPillGrid(meta, cols, rows)}
    </g>

    <!-- Bottom Regulatory / MRP Imprint Banner -->
    <g transform="translate(45, 290)">
      <rect x="0" y="0" width="510" height="40" rx="8" fill="#F0FDFA" stroke="#99F6E4" stroke-width="1" />
      
      <!-- MRP Highlighting -->
      <text x="15" y="18" font-family="monospace" font-size="11" font-weight="900" fill="#004D40">
        MRP ${meta.mrp} (INCL. OF ALL TAXES)
      </text>
      <text x="15" y="32" font-family="system-ui, sans-serif" font-size="8" font-weight="700" fill="#0D9488">
        Pack of ${med.packSize} ${med.packUnit} • Verified Bio-Equivalent Substitute
      </text>

      <text x="360" y="18" font-family="monospace" font-size="9" font-weight="700" fill="#334155">
        B.No. PMB${Math.abs(med.id.split('').reduce((a,b)=>(a<<5)-a+b.charCodeAt(0),0)%900+100)}
      </text>
      <text x="360" y="32" font-family="monospace" font-size="8.5" font-weight="600" fill="#64748B">
        EXP. 12/2027 • PMBI QUALITY
      </text>
    </g>
  </g>
</svg>`;
}

// 5. STANDARD / ALUM-ALU BLISTER STRIP RENDERER (Dolo, Calpol, Augmentin, etc.)
function renderBlisterStripSVG(meta, med) {
  const isScheduleH = med.prescriptionCategory === "Schedule H" || med.prescriptionCategory === "Schedule H1";
  const isScheduleH1 = med.prescriptionCategory === "Schedule H1";
  const cols = meta.cols || 5;
  const rows = meta.rows || 3;
  const isAluAlu = meta.foilTone === "alu-alu";
  const isAmberGold = meta.foilTone === "amber-gold";
  const isOrangeFoil = meta.foilTone === "orange-foil";

  const foilGradient = isAmberGold
    ? `<linearGradient id="foil-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#78350F" />
        <stop offset="25%" stop-color="#D97706" />
        <stop offset="50%" stop-color="#FBBF24" />
        <stop offset="75%" stop-color="#B45309" />
        <stop offset="100%" stop-color="#78350F" />
      </linearGradient>`
    : isOrangeFoil
    ? `<linearGradient id="foil-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EA580C" />
        <stop offset="25%" stop-color="#FB923C" />
        <stop offset="50%" stop-color="#FED7AA" />
        <stop offset="75%" stop-color="#F97316" />
        <stop offset="100%" stop-color="#C2410C" />
      </linearGradient>`
    : `<linearGradient id="foil-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CBD5E1" />
        <stop offset="20%" stop-color="#F1F5F9" />
        <stop offset="40%" stop-color="#E2E8F0" />
        <stop offset="65%" stop-color="#FFFFFF" />
        <stop offset="85%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#090E17; border-radius:18px;">
  <defs>
    ${foilGradient}

    <!-- Micro-embossed Aluminum Texture Grid -->
    <pattern id="foil-texture" width="5" height="5" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="5" y2="0" stroke="#94A3B8" stroke-width="0.3" opacity="0.35" />
      <line x1="0" y1="0" x2="0" y2="5" stroke="#94A3B8" stroke-width="0.3" opacity="0.35" />
    </pattern>

    <!-- 3D Cavity Shadow -->
    <radialGradient id="pocket-cavity" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="transparent" />
      <stop offset="90%" stop-color="#475569" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#1E293B" stop-opacity="0.75" />
    </radialGradient>

    <!-- Beveled Pocket Rim -->
    <linearGradient id="pocket-rim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#94A3B8" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.8" />
    </linearGradient>

    <filter id="strip-shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Ambient Light -->
  <radialGradient id="ambient" cx="50%" cy="45%" r="70%">
    <stop offset="0%" stop-color="#1E293B" stop-opacity="0.85" />
    <stop offset="100%" stop-color="#090E17" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#ambient)" />

  <!-- Ground Shadow -->
  <ellipse cx="300" cy="350" rx="270" ry="18" fill="#000000" opacity="0.6" />

  <!-- 3D Realistic Pharmaceutical Blister Strip -->
  <g filter="url(#strip-shadow)">
    <!-- Base Aluminum Foil Card -->
    <rect x="25" y="25" width="550" height="315" rx="18" fill="url(#foil-metallic)" stroke="#64748B" stroke-width="1.2" />
    <rect x="25" y="25" width="550" height="315" rx="18" fill="url(#foil-texture)" />

    <!-- Top Brand Header Banner -->
    <rect x="25" y="25" width="550" height="66" rx="18" fill="${meta.headerColor || '#0F172A'}" />
    <rect x="25" y="55" width="550" height="36" fill="${meta.headerColor || '#0F172A'}" />

    <!-- Brand Header Typography -->
    <g transform="translate(45, 42)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="${meta.brandColor || '#FFFFFF'}" letter-spacing="0.5">
        ${meta.brandHeader}
      </text>
      <text x="0" y="38" font-family="'Noto Sans Devanagari', system-ui" font-size="11" font-weight="700" fill="${meta.accentColor || '#E2E8F0'}">
        ${meta.brandHindi}
      </text>
      
      <!-- Tagline / Salt -->
      <text x="180" y="26" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" opacity="0.95">
        ${meta.tagline}
      </text>
    </g>

    <!-- Manufacturer / Pack badge on top right -->
    <rect x="420" y="38" width="135" height="28" rx="6" fill="#000000" opacity="0.35" />
    <text x="487.5" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#FFFFFF">
      ${meta.logoText} • ${med.packSize} ${med.packUnit}
    </text>

    <!-- Schedule H / H1 Statutory Lal Lakir (Red Warning Stripe) -->
    ${isScheduleH ? `
    <rect x="25" y="91" width="550" height="15" fill="#DC2626" />
    <text x="300" y="102" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7.5" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      ${isScheduleH1 ? "SCHEDULE H1 PRESCRIPTION DRUG - CAUTION: NOT TO BE SOLD WITHOUT PRESCRIPTION" : "SCHEDULE H PRESCRIPTION DRUG - CAUTION: NOT TO BE SOLD BY RETAIL WITHOUT PRESCRIPTION"}
    </text>
    ` : `
    <line x1="25" y1="91" x2="575" y2="91" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
    `}

    <!-- Authentic Perforation Lines between Blister Pockets -->
    ${[...Array(cols - 1)].map((_, i) => {
      const step = 490 / cols;
      const x = 55 + (i + 1) * step;
      return `<line x1="${x}" y1="106" x2="${x}" y2="280" stroke="#94A3B8" stroke-width="0.9" stroke-dasharray="2,3" opacity="0.7" />`;
    }).join("")}

    <!-- Blister Pockets Relief Grid -->
    <g transform="translate(55, ${isScheduleH ? 116 : 108})">
      ${renderPillGrid(meta, cols, rows)}
    </g>

    <!-- Bottom Batch & Expiry Imprint Bar -->
    <g transform="translate(45, 292)">
      <rect x="0" y="0" width="510" height="38" rx="6" fill="#F8FAFC" opacity="0.92" stroke="#CBD5E1" stroke-width="1" />
      <text x="15" y="16" font-family="monospace" font-size="9.5" font-weight="700" fill="#0F172A">
        B.No. ${med.id.replace('med-','').substring(0,4).toUpperCase()}25  •  MFD. 01/2025
      </text>
      <text x="15" y="30" font-family="monospace" font-size="9.5" font-weight="800" fill="#DC2626">
        EXP. 12/2027  •  M.R.P. ₹${med.mrp.toFixed(2)} (INCL. ALL TAXES)
      </text>

      <text x="320" y="16" font-family="monospace" font-size="9" font-weight="600" fill="#475569">
        GTIN: ${med.gtin || "08901234567890"}
      </text>
      <text x="320" y="30" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#0F172A">
        Mfg: ${med.manufacturer.name.substring(0, 26)}
      </text>
    </g>
  </g>
</svg>`;
}

// Helper: Renders accurate pill shapes inside blister pocket cavities
function renderPillGrid(meta, cols, rows) {
  const pillType = meta.pillType || "round-scored";
  const pillColor = meta.pillColor || "#FFFFFF";
  
  const widthArea = 490;
  const heightArea = 160;
  const colStep = widthArea / cols;
  const rowStep = heightArea / rows;

  let elements = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = colStep * c + colStep / 2;
      const cy = rowStep * r + rowStep / 2;

      // 1. Cavity Rim & Shadow
      const pocketW = colStep * 0.78;
      const pocketH = rowStep * 0.78;

      let pillSvg = "";

      if (pillType === "capsule") {
        // Two-tone pharmaceutical capsule
        const capColor = meta.capsuleCap || "#1E3A8A";
        const bodyColor = meta.capsuleBody || "#FFFFFF";
        const capW = Math.min(pocketW * 0.75, 42);
        const capH = Math.min(pocketH * 0.7, 24);

        pillSvg = `
          <g transform="translate(${cx}, ${cy})">
            <!-- Cavity recess -->
            <rect x="${-capW/2 - 2}" y="${-capH/2 - 2}" width="${capW + 4}" height="${capH + 4}" rx="${capH/2 + 2}" fill="url(#pocket-cavity)" />
            <!-- Capsule Left Cap -->
            <path d="M ${-capW/2} 0 Q ${-capW/2} ${-capH/2} 0 ${-capH/2} L 0 ${capH/2} Q ${-capW/2} ${capH/2} ${-capW/2} 0 Z" fill="${capColor}" stroke="#94A3B8" stroke-width="0.8" />
            <!-- Capsule Right Body -->
            <path d="M 0 ${-capH/2} Q ${capW/2} ${-capH/2} ${capW/2} 0 Q ${capW/2} ${capH/2} 0 ${capH/2} Z" fill="${bodyColor}" stroke="#94A3B8" stroke-width="0.8" />
            <!-- Specular shine on capsule -->
            <ellipse cx="0" cy="${-capH/4}" rx="${capW/3}" ry="2.5" fill="#FFFFFF" opacity="0.5" />
          </g>
        `;
      } else if (pillType === "caplet" || pillType === "oblong") {
        // Elongated caplet / oblong tablet
        const capW = Math.min(pocketW * 0.82, 46);
        const capH = Math.min(pocketH * 0.72, 22);

        pillSvg = `
          <g transform="translate(${cx}, ${cy})">
            <!-- Pocket Cavity -->
            <rect x="${-capW/2 - 3}" y="${-capH/2 - 3}" width="${capW + 6}" height="${capH + 6}" rx="${capH/2 + 3}" fill="url(#pocket-cavity)" stroke="url(#pocket-rim)" stroke-width="1.5" />
            <!-- Caplet Body -->
            <rect x="${-capW/2}" y="${-capH/2}" width="${capW}" height="${capH}" rx="${capH/2}" fill="${pillColor}" stroke="#94A3B8" stroke-width="0.8" />
            <!-- Debossed score line down center -->
            <line x1="0" y1="${-capH/2 + 3}" x2="0" y2="${capH/2 - 3}" stroke="#CBD5E1" stroke-width="1.2" />
            <!-- Specular shine -->
            <ellipse cx="0" cy="${-capH/4}" rx="${capW/3}" ry="2" fill="#FFFFFF" opacity="0.6" />
          </g>
        `;
      } else if (pillType === "chewable-orange") {
        // Round orange chewable tablet (Limcee 500)
        const rad = Math.min(colStep, rowStep) * 0.35;
        pillSvg = `
          <g transform="translate(${cx}, ${cy})">
            <circle cx="0" cy="0" r="${rad + 3}" fill="url(#pocket-cavity)" stroke="url(#pocket-rim)" stroke-width="1.5" />
            <circle cx="0" cy="0" r="${rad}" fill="#FB923C" stroke="#EA580C" stroke-width="1" />
            <!-- Concentric inner chewable bevel -->
            <circle cx="0" cy="0" r="${rad * 0.6}" fill="none" stroke="#F97316" stroke-width="1.2" />
            <text x="0" y="3" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7" font-weight="900" fill="#C2410C">C</text>
          </g>
        `;
      } else {
        // Round scored tablet (Dolo 650, Calpol round, etc.)
        const rad = Math.min(colStep, rowStep) * 0.35;
        pillSvg = `
          <g transform="translate(${cx}, ${cy})">
            <!-- Cavity rim -->
            <circle cx="0" cy="0" r="${rad + 3}" fill="url(#pocket-cavity)" stroke="url(#pocket-rim)" stroke-width="1.5" />
            <!-- Round tablet -->
            <circle cx="0" cy="0" r="${rad}" fill="${pillColor}" stroke="#94A3B8" stroke-width="0.8" />
            <!-- Scored split line -->
            <line x1="0" y1="${-rad + 3}" x2="0" y2="${rad - 3}" stroke="#CBD5E1" stroke-width="1.2" />
            <!-- Bevel edge highlight -->
            <ellipse cx="${-rad * 0.2}" cy="${-rad * 0.2}" rx="${rad * 0.4}" ry="${rad * 0.2}" fill="#FFFFFF" opacity="0.5" />
          </g>
        `;
      }

      elements.push(pillSvg);
    }
  }

  return elements.join("\n");
}

// -----------------------------------------------------------------------------
// EXECUTION: GENERATE ACCURATE PACKAGING FOR ALL 59 MEDICINES
// -----------------------------------------------------------------------------
let count = 0;
for (const med of medicines) {
  const meta = MEDICINE_VISUAL_PROFILES[med.id] || {
    type: "blister",
    brandHeader: med.brandName.toUpperCase(),
    brandHindi: med.brandNameHindi || "",
    tagline: med.saltComposition,
    headerColor: "#1E293B",
    brandColor: "#FFFFFF",
    accentColor: "#38BDF8",
    logoText: med.manufacturer.name.split(" ")[0].toUpperCase(),
    pillType: med.dosageForm === "Capsule" ? "capsule" : "round-scored",
    pillColor: "#FFFFFF",
    cols: 5,
    rows: 2,
    foilTone: "silver"
  };

  let svgContent = "";
  if (meta.type === "inhaler") {
    svgContent = renderInhalerSVG(meta, med);
  } else if (meta.type === "ayush-bottle") {
    svgContent = renderAyushBottleSVG(meta, med);
  } else if (meta.type === "ayush-jar") {
    svgContent = renderAyushJarSVG(meta, med);
  } else if (meta.type === "pmbjp") {
    svgContent = renderPmbjpGenericSVG(meta, med);
  } else {
    svgContent = renderBlisterStripSVG(meta, med);
  }

  const outPath = path.join(publicDir, `${med.id}.svg`);
  fs.writeFileSync(outPath, svgContent, "utf8");
  count++;
}

console.log(`\n🎉 Successfully generated ${count} authentic pharmaceutical packaging visuals in public/medicines/\n`);
