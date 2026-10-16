import fs from "fs";
import path from "path";

const MEDICINES_META = [
  // 1. Paracetamol 650 Group
  {
    id: "med-dolo-650",
    brand: "DOLO 650",
    hindi: "डोलो ६५०",
    generic: "Paracetamol Tablets I.P. 650 mg",
    mfg: "Micro Labs Limited",
    mrp: "₹33.68",
    pack: "15 Tablets",
    batch: "DL24B01",
    exp: "12/2026",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "caplet",
    accentColor: "#0D3B66",
    subBrand: "Analgesic & Antipyretic",
    gtin: "08901117001234"
  },
  {
    id: "med-calpol-650",
    brand: "CALPOL 650",
    hindi: "कैलपोल ६५०",
    generic: "Paracetamol Tablets I.P. 650 mg",
    mfg: "GlaxoSmithKline Pharmaceuticals Ltd (GSK)",
    mrp: "₹32.50",
    pack: "15 Tablets",
    batch: "CP24K88",
    exp: "11/2026",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "caplet",
    accentColor: "#1B4965",
    subBrand: "Fast Pain Relief",
    gtin: "08901043004561"
  },
  {
    id: "med-crocin-650",
    brand: "CROCIN 650",
    hindi: "क्रोसिन ६५०",
    generic: "Paracetamol Tablets I.P. 650 mg",
    mfg: "Haleon India (Glaxo Consumer Healthcare)",
    mrp: "₹33.20",
    pack: "15 Tablets",
    batch: "CR24M12",
    exp: "09/2026",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#FAFAFA",
    pillShape: "caplet",
    accentColor: "#C1121F",
    subBrand: "Advanced Optizorb Formulation",
    gtin: "08901043001188"
  },
  {
    id: "med-pacimol-650",
    brand: "PACIMOL 650",
    hindi: "पैसिमोल ६५०",
    generic: "Paracetamol Tablets I.P. 650 mg",
    mfg: "Ipca Laboratories Ltd",
    mrp: "₹24.00",
    pack: "15 Tablets",
    batch: "IPC24H04",
    exp: "10/2026",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "caplet",
    accentColor: "#2B2D42",
    subBrand: "Antipyretic & Body Pain Care",
    gtin: "08901235007890"
  },
  {
    id: "med-janaushadhi-paracetamol-650",
    brand: "PARACETAMOL 650",
    hindi: "पैरासिटामोल ६५०",
    generic: "Paracetamol Tablets I.P. 650 mg",
    mfg: "Pharmaceuticals & Medical Devices Bureau (PMBI)",
    mrp: "₹10.00",
    pack: "10 Tablets",
    batch: "GEN24P01",
    exp: "10/2026",
    isScheduleH: false,
    isGeneric: true,
    pillColor: "#FFFFFF",
    pillShape: "caplet",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001001211"
  },

  // 2. Amoxycillin + Potassium Clavulanate 625 Group
  {
    id: "med-augmentin-625",
    brand: "AUGMENTIN 625 DUO",
    hindi: "ऑगमेंटिन ६२५ डुओ",
    generic: "Amoxycillin and Potassium Clavulanate Tablets I.P.",
    mfg: "GlaxoSmithKline Pharmaceuticals Ltd",
    mrp: "₹223.50",
    pack: "10 Tablets",
    batch: "GSK24A09",
    exp: "08/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#1A365D",
    subBrand: "Broad-Spectrum Antibacterial",
    gtin: "08901043007812"
  },
  {
    id: "med-moxikind-cv-625",
    brand: "MOXIKIND-CV 625",
    hindi: "मॉक्सिकाइंड-सीवी ६२५",
    generic: "Amoxycillin and Potassium Clavulanate Tablets I.P.",
    mfg: "Mankind Pharma Ltd",
    mrp: "₹185.00",
    pack: "10 Tablets",
    batch: "MK24C11",
    exp: "07/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#0284C7",
    subBrand: "Antibiotic Therapy",
    gtin: "08902043009988"
  },
  {
    id: "med-clavam-625",
    brand: "CLAVAM 625",
    hindi: "क्लेवाम ६२५",
    generic: "Amoxycillin and Potassium Clavulanate Tablets I.P.",
    mfg: "Alkem Laboratories Ltd",
    mrp: "₹204.00",
    pack: "10 Tablets",
    batch: "ALK24D18",
    exp: "09/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#0F766E",
    subBrand: "Potentiated Penicillin",
    gtin: "08901117006622"
  },
  {
    id: "med-janaushadhi-amoxi-clav-625",
    brand: "AMOXYCILLIN & CLAVULANATE 625",
    hindi: "अमोक्सीसिलिन एवं क्लैव्युलानेट ६२५",
    generic: "Amoxycillin (500mg) + Clavulanic Acid (125mg) I.P.",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹65.00",
    pack: "10 Tablets",
    batch: "GEN24AC09",
    exp: "08/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001002455"
  },

  // 3. Azithromycin 500 Group
  {
    id: "med-azithral-500",
    brand: "AZITHRAL 500",
    hindi: "एजिथ्रल ५००",
    generic: "Azithromycin Tablets I.P. 500 mg",
    mfg: "Alembic Pharmaceuticals Ltd",
    mrp: "₹132.50",
    pack: "5 Tablets",
    batch: "ALM24Z02",
    exp: "11/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#F472B6",
    pillShape: "caplet",
    accentColor: "#BE185D",
    subBrand: "Macrolide Antibiotic",
    gtin: "08901117009811"
  },
  {
    id: "med-azee-500",
    brand: "AZEE 500",
    hindi: "एज़ी ५००",
    generic: "Azithromycin Tablets I.P. 500 mg",
    mfg: "Cipla Ltd",
    mrp: "₹128.00",
    pack: "5 Tablets",
    batch: "CIP24A77",
    exp: "10/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FB7185",
    pillShape: "caplet",
    accentColor: "#9F1239",
    subBrand: "Respiratory & Skin Anti-Infective",
    gtin: "08901117005423"
  },
  {
    id: "med-janaushadhi-azithromycin-500",
    brand: "AZITHROMYCIN 500",
    hindi: "एज़िथ्रोमाइसिन ५००",
    generic: "Azithromycin Tablets I.P. 500 mg",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹45.00",
    pack: "3 Tablets",
    batch: "GEN24AZ03",
    exp: "11/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#F472B6",
    pillShape: "caplet",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001003124"
  },

  // 4. Metformin 500 Group
  {
    id: "med-glycomet-500",
    brand: "GLYCOMET 500",
    hindi: "ग्लाइकोमेट ५००",
    generic: "Metformin Hydrochloride Tablets I.P. 500 mg",
    mfg: "USV Private Limited",
    mrp: "₹24.50",
    pack: "10 Tablets",
    batch: "USV24G01",
    exp: "01/2027",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "round",
    accentColor: "#1E3A8A",
    subBrand: "Anti-Diabetic Biguanide",
    gtin: "08901117003456"
  },
  {
    id: "med-janaushadhi-metformin-500",
    brand: "METFORMIN 500",
    hindi: "मेटफॉर्मिन ५००",
    generic: "Metformin Hydrochloride Tablets I.P. 500 mg",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹7.50",
    pack: "10 Tablets",
    batch: "GEN24M10",
    exp: "01/2027",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FFFFFF",
    pillShape: "round",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001004558"
  },

  // 5. Pantoprazole 40 Group
  {
    id: "med-pantocid-40",
    brand: "PANTOCID 40",
    hindi: "पैन्टोसिड ४०",
    generic: "Pantoprazole Gastro-Resistant Tablets I.P. 40 mg",
    mfg: "Sun Pharmaceutical Industries Ltd",
    mrp: "₹172.00",
    pack: "15 Tablets",
    batch: "SUN24P08",
    exp: "12/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FBBF24",
    pillShape: "oval",
    accentColor: "#B45309",
    subBrand: "Proton Pump Inhibitor (Gastro-Resistant)",
    gtin: "08901117004321"
  },
  {
    id: "med-pan-40",
    brand: "PAN 40",
    hindi: "पैन ४०",
    generic: "Pantoprazole Gastro-Resistant Tablets I.P. 40 mg",
    mfg: "Alkem Laboratories Ltd",
    mrp: "₹155.00",
    pack: "15 Tablets",
    batch: "ALK24P14",
    exp: "11/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FBBF24",
    pillShape: "oval",
    accentColor: "#9A3412",
    subBrand: "Gastro-Resistant Anti-Ulcerant",
    gtin: "08901117007788"
  },
  {
    id: "med-janaushadhi-pantoprazole-40",
    brand: "PANTOPRAZOLE 40",
    hindi: "पैंटोप्राजोल ४०",
    generic: "Pantoprazole Gastro-Resistant Tablets I.P. 40 mg",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹24.00",
    pack: "10 Tablets",
    batch: "GEN24PT05",
    exp: "12/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FBBF24",
    pillShape: "oval",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001005112"
  },

  // 6. Telmisartan 40 Group
  {
    id: "med-telma-40",
    brand: "TELMA 40",
    hindi: "टेल्मा ४०",
    generic: "Telmisartan Tablets I.P. 40 mg",
    mfg: "Glenmark Pharmaceuticals Ltd",
    mrp: "₹238.00",
    pack: "15 Tablets",
    batch: "GLN24T19",
    exp: "09/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "round",
    accentColor: "#4338CA",
    subBrand: "Angiotensin II Receptor Antagonist (Cardio Care)",
    gtin: "08901117002233"
  },
  {
    id: "med-telmikind-40",
    brand: "TELMIKIND 40",
    hindi: "टेल्मीकाइंड ४०",
    generic: "Telmisartan Tablets I.P. 40 mg",
    mfg: "Mankind Pharma Ltd",
    mrp: "₹85.00",
    pack: "10 Tablets",
    batch: "MK24T03",
    exp: "08/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "round",
    accentColor: "#2563EB",
    subBrand: "Anti-Hypertensive Care",
    gtin: "08902043001155"
  },
  {
    id: "med-janaushadhi-telmisartan-40",
    brand: "TELMISARTAN 40",
    hindi: "टेल्मिसार्टन ४०",
    generic: "Telmisartan Tablets I.P. 40 mg",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹18.00",
    pack: "10 Tablets",
    batch: "GEN24TS01",
    exp: "09/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FFFFFF",
    pillShape: "round",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001006774"
  },

  // 7. Montelukast 10mg + Levocetirizine 5mg Group
  {
    id: "med-montair-lc",
    brand: "MONTAIR-LC",
    hindi: "मॉन्टेयर-एलसी",
    generic: "Montelukast Sodium and Levocetirizine Dihydrochloride Tablets",
    mfg: "Cipla Ltd",
    mrp: "₹220.00",
    pack: "15 Tablets",
    batch: "CIP24M89",
    exp: "10/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FB923C",
    pillShape: "oval",
    accentColor: "#C2410C",
    subBrand: "Dual Antihistamine & Leukotriene Receptor Antagonist",
    gtin: "08901117008899"
  },
  {
    id: "med-janaushadhi-montelukast-levocetirizine",
    brand: "MONTELUKAST & LEVOCETIRIZINE",
    hindi: "मॉन्टेलुकास्ट एवं लेवोसेटिरीज़ीन",
    generic: "Montelukast (10mg) + Levocetirizine (5mg) I.P.",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹35.00",
    pack: "10 Tablets",
    batch: "GEN24ML02",
    exp: "10/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FB923C",
    pillShape: "oval",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001007883"
  },

  // 8. Combiflam (Ibuprofen + Paracetamol) Group
  {
    id: "med-combiflam",
    brand: "COMBIFLAM",
    hindi: "कॉम्बीफ्लेम",
    generic: "Ibuprofen and Paracetamol Tablets I.P.",
    mfg: "Sanofi India Ltd",
    mrp: "₹52.00",
    pack: "20 Tablets",
    batch: "SNF24C45",
    exp: "08/2026",
    isScheduleH: true,
    isGeneric: false,
    pillColor: "#FEF08A",
    pillShape: "caplet",
    accentColor: "#A16207",
    subBrand: "Dual Anti-Inflammatory Analgesic",
    gtin: "08901117006611"
  },
  {
    id: "med-janaushadhi-ibuprofen-paracetamol",
    brand: "IBUPROFEN & PARACETAMOL",
    hindi: "आइबुप्रोफेन एवं पैरासिटामोल",
    generic: "Ibuprofen (400mg) + Paracetamol (325mg) I.P.",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹12.00",
    pack: "10 Tablets",
    batch: "GEN24IP09",
    exp: "08/2026",
    isScheduleH: true,
    isGeneric: true,
    pillColor: "#FEF08A",
    pillShape: "caplet",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001008991"
  },

  // 9. Shelcal 500 (Calcium + Vit D3) Group
  {
    id: "med-shelcal-500",
    brand: "SHELCAL 500",
    hindi: "शेलकल ५००",
    generic: "Calcium 500mg with Vitamin D3 Tablets",
    mfg: "Torrent Pharmaceuticals Ltd",
    mrp: "₹144.00",
    pack: "15 Tablets",
    batch: "TOR24S22",
    exp: "02/2027",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#047857",
    subBrand: "Bone & Joint Mineral Supplement",
    gtin: "08901117009944"
  },
  {
    id: "med-janaushadhi-calcium-vitd3",
    brand: "CALCIUM & VITAMIN D3",
    hindi: "कैल्शियम एवं विटामिन डी३",
    generic: "Calcium Carbonate 500mg + Cholecalciferol 250 IU",
    mfg: "PMBI Quality Certified Formulation",
    mrp: "₹28.00",
    pack: "10 Tablets",
    batch: "GEN24CD01",
    exp: "02/2027",
    isScheduleH: false,
    isGeneric: true,
    pillColor: "#FFFFFF",
    pillShape: "oblong",
    accentColor: "#15803D",
    subBrand: "Verified Generic Bio-Equivalent Substitute",
    gtin: "08908001009002"
  },

  // 10. AYUSH / Herbal Products (Non-interchangeable with allopathy)
  {
    id: "med-dabur-chyawanprash",
    brand: "DABUR CHYAWANPRASH",
    hindi: "डाबर च्यवनप्राश",
    generic: "Classical Ayurvedic Rasayana Formulation (Amla & 40+ Herbs)",
    mfg: "Dabur India Ltd",
    mrp: "₹395.00",
    pack: "1000 gm Jar",
    batch: "DAB24CP88",
    exp: "05/2027",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#78350F",
    pillShape: "jar",
    accentColor: "#B45309",
    subBrand: "Ayurvedic Immunity Booster (AYUSH)",
    gtin: "08901207001122"
  },
  {
    id: "med-himalaya-liv-52",
    brand: "HIMALAYA LIV.52",
    hindi: "हिमालय लिव.५२",
    generic: "Ayurvedic Proprietary Formulation (Himsra, Kasani)",
    mfg: "The Himalaya Drug Company",
    mrp: "₹180.00",
    pack: "100 Tablets",
    batch: "HIM24L52",
    exp: "06/2027",
    isScheduleH: false,
    isGeneric: false,
    pillColor: "#15803D",
    pillShape: "bottle",
    accentColor: "#047857",
    subBrand: "Hepato-Protective Ayurvedic Formulation",
    gtin: "08901138501238"
  }
];

// Synchronize exact GTIN and MRP from indianMedicines.ts
const indianMedContent = fs.readFileSync(path.resolve(process.cwd(), "src/data/indianMedicines.ts"), "utf8");
for (const med of MEDICINES_META) {
  const gtinMatch = indianMedContent.match(new RegExp(`id:\\s*"${med.id}"[\\s\\S]*?gtin:\\s*"([^"]+)"`));
  if (gtinMatch) {
    med.gtin = gtinMatch[1];
  }
}

function generatePackagingSVG(item) {
  const isJar = item.pillShape === "jar";
  const isBottle = item.pillShape === "bottle";

  if (isJar || isBottle) {
    // Render realistic pharmaceutical/ayurvedic bottle container
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#F8F6F2; border-radius:18px;">
  <defs>
    <linearGradient id="jar-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#451A03" />
      <stop offset="25%" stop-color="#78350F" />
      <stop offset="50%" stop-color="#B45309" />
      <stop offset="75%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#291003" />
    </linearGradient>
    <linearGradient id="gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350F" />
      <stop offset="30%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FDE68A" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#090E17" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Shadow below container -->
  <ellipse cx="300" cy="340" rx="140" ry="20" fill="#090E17" opacity="0.18" />

  <!-- Container Base -->
  <g filter="url(#shadow)">
    <!-- Main Body -->
    <rect x="200" y="90" width="200" height="230" rx="30" fill="url(#jar-body)" />

    <!-- Screw Cap -->
    <rect x="230" y="45" width="140" height="50" rx="12" fill="url(#gold-cap)" />
    <!-- Cap Ridges -->
    <line x1="250" y1="45" x2="250" y2="95" stroke="#78350F" stroke-width="2" opacity="0.4" />
    <line x1="275" y1="45" x2="275" y2="95" stroke="#78350F" stroke-width="2" opacity="0.4" />
    <line x1="300" y1="45" x2="300" y2="95" stroke="#78350F" stroke-width="2" opacity="0.4" />
    <line x1="325" y1="45" x2="325" y2="95" stroke="#78350F" stroke-width="2" opacity="0.4" />
    <line x1="350" y1="45" x2="350" y2="95" stroke="#78350F" stroke-width="2" opacity="0.4" />

    <!-- Label Wrap -->
    <rect x="205" y="115" width="190" height="175" rx="10" fill="#FFFDF9" stroke="#E2DCD5" stroke-width="1.5" />

    <!-- Label Header -->
    <rect x="205" y="115" width="190" height="32" rx="10" fill="${item.accentColor}" />
    <text x="300" y="136" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" letter-spacing="1">
      ${item.subBrand.toUpperCase()}
    </text>

    <!-- Brand Name -->
    <text x="300" y="172" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#090E17">
      ${item.brand}
    </text>
    <text x="300" y="190" text-anchor="middle" font-family="'Noto Sans Devanagari', system-ui" font-size="12" font-weight="700" fill="#78350F">
      ${item.hindi}
    </text>

    <!-- Composition Line -->
    <foreignObject x="215" y="196" width="170" height="42">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui, sans-serif; font-size:8.5px; text-align:center; color:#57534E; font-weight:600; line-height:1.2;">
        ${item.generic}
      </div>
    </foreignObject>

    <!-- Batch & Regulatory stamp -->
    <rect x="215" y="240" width="170" height="40" rx="6" fill="#F5F3EF" stroke="#E7E5E4" stroke-width="1" />
    <text x="222" y="254" font-family="monospace" font-size="8" font-weight="700" fill="#44403C">B.No: ${item.batch} | EXP: ${item.exp}</text>
    <text x="222" y="268" font-family="monospace" font-size="8" font-weight="700" fill="#090E17">MRP: ${item.mrp} (${item.pack})</text>

    <!-- Manufacturer Seal -->
    <text x="300" y="284" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7.5" font-weight="700" fill="#78716C">
      ${item.mfg}
    </text>
  </g>
</svg>`;
  }

  // Blister Foil Strip (Tablets / Capsules)
  const isGeneric = item.isGeneric;
  const isScheduleH = item.isScheduleH;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#090E17; border-radius:18px;">
  <defs>
    <!-- Metallic Brushed Aluminum Gradient -->
    <linearGradient id="foil-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="20%" stop-color="#CBD5E1" />
      <stop offset="40%" stop-color="#F1F5F9" />
      <stop offset="60%" stop-color="#CBD5E1" />
      <stop offset="80%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>

    <!-- Realistic Pill Convex Gradient -->
    <radialGradient id="pill-glow" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="${item.pillColor}" />
      <stop offset="100%" stop-color="#94A3B8" />
    </radialGradient>

    <!-- Blister Pocket Cavity Shader -->
    <radialGradient id="pocket-cavity" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="transparent" />
      <stop offset="90%" stop-color="#64748B" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#334155" stop-opacity="0.7" />
    </radialGradient>

    <!-- Micro-embossed foil texture pattern -->
    <pattern id="foil-grid" width="6" height="6" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="6" y2="0" stroke="#94A3B8" stroke-width="0.35" opacity="0.35" />
      <line x1="0" y1="0" x2="0" y2="6" stroke="#94A3B8" stroke-width="0.35" opacity="0.35" />
    </pattern>

    <filter id="strip-shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Ambient background glow -->
  <radialGradient id="ambient" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="#1E293B" stop-opacity="0.8" />
    <stop offset="100%" stop-color="#090E17" stop-opacity="1" />
  </radialGradient>
  <rect width="600" height="380" fill="url(#ambient)" />

  <!-- Realistic Blister Strip Body -->
  <g filter="url(#strip-shadow)">
    <!-- Base Aluminum Foil -->
    <rect x="35" y="30" width="530" height="320" rx="18" fill="url(#foil-metallic)" stroke="#64748B" stroke-width="1.5" />
    <!-- Foil Texture Overlay -->
    <rect x="35" y="30" width="530" height="320" rx="18" fill="url(#foil-grid)" />

    <!-- Authentic Perforation Lines -->
    <line x1="165" y1="30" x2="165" y2="350" stroke="#64748B" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
    <line x1="295" y1="30" x2="295" y2="350" stroke="#64748B" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
    <line x1="425" y1="30" x2="425" y2="350" stroke="#64748B" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />

    <!-- STATUTORY SCHEDULE H / H1 LAL LAKIR (RED LINE) -->
    ${isScheduleH ? `
    <g id="lal-lakir">
      <rect x="35" y="172" width="530" height="18" fill="#C8162A" />
      <text x="300" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" letter-spacing="1">
        SCHEDULE H PRESCRIPTION DRUG - CAUTION: NOT TO BE SOLD BY RETAIL WITHOUT PRESCRIPTION
      </text>
    </g>` : ''}

    <!-- GENERIC BIO-EQUIVALENT SUBSTITUTE QUALITY BANNER -->
    ${isGeneric ? `
    <g id="generic-quality-banner">
      <rect x="35" y="30" width="530" height="28" rx="18" fill="#15803D" />
      <rect x="35" y="44" width="530" height="14" fill="#15803D" />
      <text x="300" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" letter-spacing="1">
        ✓ VERIFIED LOW-COST BIO-EQUIVALENT GENERIC SUBSTITUTE
      </text>
    </g>` : ''}

    <!-- BLISTER POCKETS WITH EMBOSSED PILLS (Top & Bottom Rows) -->
    <!-- Pocket 1 -->
    <g transform="translate(100, 100)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 2 -->
    <g transform="translate(230, 100)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 3 -->
    <g transform="translate(360, 100)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 4 -->
    <g transform="translate(490, 100)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Bottom Row Pockets -->
    <!-- Pocket 5 -->
    <g transform="translate(100, 270)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 6 -->
    <g transform="translate(230, 270)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 7 -->
    <g transform="translate(360, 270)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Pocket 8 -->
    <g transform="translate(490, 270)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#pocket-cavity)" />
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="url(#pill-glow)" stroke="#94A3B8" stroke-width="0.8" />
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- PRINTED PHARMACEUTICAL FOIL LABEL -->
    <!-- Main Brand Block -->
    <rect x="50" y="${isGeneric ? '58' : '45'}" width="500" height="28" rx="6" fill="#090E17" opacity="0.08" />
    <text x="60" y="${isGeneric ? '78' : '65'}" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="${item.accentColor}" letter-spacing="0.5">
      ${item.brand}
    </text>
    <text x="320" y="${isGeneric ? '78' : '65'}" font-family="'Noto Sans Devanagari', system-ui" font-size="14" font-weight="700" fill="#334155">
      ${item.hindi}
    </text>

    <!-- Salt Composition (Pharmacopeial Formulation) -->
    <text x="60" y="${isGeneric ? '146' : '142'}" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#1E293B">
      ${item.generic}
    </text>
    <text x="60" y="${isGeneric ? '162' : '158'}" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#475569">
      Therapeutic Focus: ${item.subBrand} • Pack of ${item.pack}
    </text>

    <!-- Batch, Manufacturing, Expiry & Pricing Stamp -->
    <rect x="50" y="306" width="500" height="34" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
    <text x="60" y="322" font-family="monospace" font-size="9" font-weight="700" fill="#0F172A">
      B.No: ${item.batch} | MFG: 02/2024 | EXP: ${item.exp}
    </text>
    <text x="60" y="334" font-family="monospace" font-size="8.5" font-weight="800" fill="#C8162A">
      M.R.P. ${item.mrp} (INCL. OF ALL TAXES) • GTIN: ${item.gtin}
    </text>

    <!-- Manufacturer Insignia -->
    <text x="540" y="328" text-anchor="end" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#334155">
      ${item.mfg}
    </text>
  </g>
</svg>`;
}

const outDir = path.resolve(process.cwd(), "public/medicines");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let count = 0;
for (const med of MEDICINES_META) {
  const svg = generatePackagingSVG(med);
  const filePath = path.join(outDir, `${med.id}.svg`);
  fs.writeFileSync(filePath, svg, "utf8");
  count++;
}

console.log(`Successfully generated ${count} authentic medicine & substitute packaging SVGs in ${outDir}`);
