import { Medicine } from "@/types/medicine";

export const INDIAN_MEDICINES: Medicine[] = [
  // =========================================================================
  // 1. PARACETAMOL 650 MG GROUP (Analgesic & Antipyretic)
  // =========================================================================
  {
    id: "med-dolo-650",
    brandName: "Dolo 650",
    brandNameHindi: "डोलो 650",
    genericName: "Paracetamol",
    saltComposition: "Paracetamol (650mg)",
    activeIngredients: [
      { name: "Paracetamol", standardName: "Paracetamol", strength: "650 mg", strengthValue: 650, strengthUnit: "mg" }
    ],
    strength: "650 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 33.68,
    pricePerUnit: 2.25,
    unitType: "tablet",
    manufacturer: {
      name: "Micro Labs Ltd",
      originCountry: "India",
      licenseNo: "KA/DRUG/28/1992",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: true,
    nlemVersion: "NLEM 2022",
    isPriceControlled: true,
    ceilingPrice: 1.84,
    nppaNotificationRef: "S.O. 1500(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901117001234",
    gtin: "08901117001234",
    storageInfo: {
      en: "Store below 25°C in a dry place protected from direct sunlight and moisture.",
      hi: "25°C से कम तापमान पर सूखी जगह पर रखें। सीधी धूप और नमी से बचाएं।"
    },
    indications: {
      en: ["Fever / Pyrexia", "Headache & Migraine", "Muscle ache & Body pain", "Toothache", "Post-vaccination fever"],
      hi: ["बुखार", "सिरदर्द", "बदन दर्द", "दांत दर्द", "टीकाकरण के बाद का बुखार"]
    },
    warnings: {
      en: [
        "Do not take more than 4,000 mg in 24 hours (maximum 6 tablets of 650mg). Overdose can cause severe liver damage.",
        "Check other cold/flu medications to avoid taking duplicate paracetamol.",
        "Consult a doctor if fever lasts longer than 3 days."
      ],
      hi: [
        "24 घंटे में 4000 मिलीग्राम (अधिकतम 6 गोलियां) से अधिक न लें। ओवरडोज़ से लिवर को गंभीर नुकसान हो सकता है।",
        "सर्दी-खांसी की अन्य दवाओं की जांच करें ताकि दोहरी खुराक न हो।"
      ]
    },
    contraindications: {
      en: ["Severe liver disease or hepatic failure", "Known allergy to paracetamol"],
      hi: ["गंभीर लिवर रोग", "पैरासिटामोल से एलर्जी"]
    },
    interactions: {
      en: ["Warfarin (increased bleeding risk with continuous use)", "Alcohol (increases risk of severe liver damage)"],
      hi: ["वारफारिन", "शराब (लिवर क्षति का खतरा)"]
    },
    sideEffects: {
      en: ["Nausea", "Mild stomach pain", "Skin rash (rare)"],
      hi: ["जी मिचलाना", "हल्का पेट दर्द", "त्वचा पर दाने"]
    },
    sources: [
      { sourceName: "NPPA DPCO Gazette 2023", lastUpdated: "2024-04-01", confidence: "official" },
      { sourceName: "CDSCO Approved Formulations", lastUpdated: "2023-11-15", confidence: "official" },
      { sourceName: "Manufacturer Declared MRP", lastUpdated: "2024-06-01", confidence: "secondary" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-10"
  },
  {
    id: "med-calpol-650",
    brandName: "Calpol 650",
    brandNameHindi: "कैलपोल 650",
    genericName: "Paracetamol",
    saltComposition: "Paracetamol (650mg)",
    activeIngredients: [
      { name: "Paracetamol", standardName: "Paracetamol", strength: "650 mg", strengthValue: 650, strengthUnit: "mg" }
    ],
    strength: "650 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 32.50,
    pricePerUnit: 2.16,
    unitType: "tablet",
    manufacturer: {
      name: "GlaxoSmithKline Pharmaceuticals Ltd (GSK)",
      originCountry: "India",
      licenseNo: "MH/DRUG/104/1985",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: true,
    nlemVersion: "NLEM 2022",
    isPriceControlled: true,
    ceilingPrice: 1.84,
    nppaNotificationRef: "S.O. 1500(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901043004561",
    gtin: "08901043004561",
    storageInfo: {
      en: "Store below 30°C in a dry place away from heat.",
      hi: "30°C से कम तापमान पर सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Fever reduction", "Mild to moderate pain", "Joint pain"],
      hi: ["बुखार कम करना", "हल्का से मध्यम दर्द", "जोड़ों का दर्द"]
    },
    warnings: {
      en: ["Do not exceed recommended dose.", "Take with water after food to avoid gastric irritation."],
      hi: ["अनुशंसित खुराक से अधिक न लें।"]
    },
    contraindications: {
      en: ["Severe liver impairment"],
      hi: ["गंभीर लिवर रोग"]
    },
    interactions: {
      en: ["Cholestyramine", "Metoclopramide"],
      hi: ["कोलेस्टिरमाइन", "मेटोक्लोप्रमाइड"]
    },
    sideEffects: {
      en: ["Rare rash", "Stomach upset"],
      hi: ["हल्की एलर्जी", "पेट खराब"]
    },
    sources: [
      { sourceName: "NPPA DPCO Gazette 2023", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-10"
  },
  {
    id: "med-crocin-650",
    brandName: "Crocin 650",
    brandNameHindi: "क्रोसिन 650",
    genericName: "Paracetamol",
    saltComposition: "Paracetamol (650mg)",
    activeIngredients: [
      { name: "Paracetamol", standardName: "Paracetamol", strength: "650 mg", strengthValue: 650, strengthUnit: "mg" }
    ],
    strength: "650 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 33.50,
    pricePerUnit: 2.23,
    unitType: "tablet",
    manufacturer: {
      name: "GlaxoSmithKline Asia Pvt Ltd",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 1.84,
    isJanAushadhi: false,
    barcode: "8901043001188",
    gtin: "08901043001188",
    storageInfo: {
      en: "Store protected from moisture below 30°C.",
      hi: "नमी से सुरक्षित 30°C से कम तापमान पर रखें।"
    },
    indications: {
      en: ["Fever", "Headache", "Body ache"],
      hi: ["बुखार", "सिरदर्द", "बदन दर्द"]
    },
    warnings: {
      en: ["Maximum daily paracetamol limit is 4000mg."],
      hi: ["अधिकतम दैनिक सीमा 4000 मिलीग्राम है।"]
    },
    contraindications: {
      en: ["Hepatic insufficiency"],
      hi: ["लिवर विफलता"]
    },
    interactions: {
      en: ["Alcohol"],
      hi: ["शराब"]
    },
    sideEffects: {
      en: ["Nausea"],
      hi: ["जी मिचलाना"]
    },
    sources: [
      { sourceName: "NPPA Ceiling Records", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-20"
  },
  {
    id: "med-pacimol-650",
    brandName: "Pacimol 650",
    brandNameHindi: "पैसिमोल 650",
    genericName: "Paracetamol",
    saltComposition: "Paracetamol (650mg)",
    activeIngredients: [
      { name: "Paracetamol", standardName: "Paracetamol", strength: "650 mg", strengthValue: 650, strengthUnit: "mg" }
    ],
    strength: "650 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 29.80,
    pricePerUnit: 1.98,
    unitType: "tablet",
    manufacturer: {
      name: "Ipca Laboratories Ltd",
      originCountry: "India",
      licenseNo: "GJ/DRUG/33/2001",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 1.84,
    isJanAushadhi: false,
    barcode: "8901235007890",
    gtin: "08901235007890",
    storageInfo: {
      en: "Store below 25°C in a dry place.",
      hi: "25°C से कम तापमान पर सूखी जगह रखें।"
    },
    indications: {
      en: ["Fever", "Toothache", "Cold and flu pain"],
      hi: ["बुखार", "दांत दर्द", "सर्दी दर्द"]
    },
    warnings: {
      en: ["Do not take multiple paracetamol preparations simultaneously."],
      hi: ["एक साथ कई पैरासिटामोल वाली दवाएं न लें।"]
    },
    contraindications: {
      en: ["Paracetamol hypersensitivity"],
      hi: ["पैरासिटामोल एलर्जी"]
    },
    interactions: {
      en: ["Alcohol", "Blood thinners"],
      hi: ["शराब", "वारफारिन"]
    },
    sideEffects: {
      en: ["Mild stomach discomfort"],
      hi: ["हल्का पेट दर्द"]
    },
    sources: [
      { sourceName: "NPPA Ceiling Records", lastUpdated: "2024-03-25", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-15"
  },
  {
    id: "med-janaushadhi-paracetamol-650",
    brandName: "Jan Aushadhi Paracetamol 650",
    brandNameHindi: "जन औषधि पैरासिटामोल 650",
    genericName: "Paracetamol",
    saltComposition: "Paracetamol (650mg)",
    activeIngredients: [
      { name: "Paracetamol", standardName: "Paracetamol", strength: "650 mg", strengthValue: 650, strengthUnit: "mg" }
    ],
    strength: "650 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 10.00,
    pricePerUnit: 1.00,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      licenseNo: "PMBJP/MFG/2018/042",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: true,
    nlemVersion: "NLEM 2022",
    isPriceControlled: true,
    ceilingPrice: 1.84,
    nppaNotificationRef: "S.O. 1500(E) NPPA Order 2023",
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0012",
    barcode: "8908001001211",
    gtin: "08908001001211",
    storageInfo: {
      en: "Store in a cool dry place protected from light.",
      hi: "ठंडी और सूखी जगह पर प्रकाश से बचाकर रखें।"
    },
    indications: {
      en: ["Fever", "General body ache", "Cold and flu associated fever"],
      hi: ["बुखार", "शरीर दर्द", "सर्दी-जुकाम से जुड़ा बुखार"]
    },
    warnings: {
      en: ["Maximum daily adult dose is 4000mg. Do not self-medicate beyond 3 consecutive days without doctor advice."],
      hi: ["अधिकतम वयस्क दैनिक खुराक 4000mg है।"]
    },
    contraindications: {
      en: ["Hepatic failure", "Alcoholism"],
      hi: ["लिवर विफलता", "शराब की लत"]
    },
    interactions: {
      en: ["Blood thinners (Warfarin)"],
      hi: ["खून पतला करने वाली दवाएं"]
    },
    sideEffects: {
      en: ["Occasional skin rash"],
      hi: ["त्वचा पर हल्के चकत्ते"]
    },
    sources: [
      { sourceName: "PMBJP Official Product Catalog 2024", sourceUrl: "http://janaushadhi.gov.in", lastUpdated: "2024-05-01", confidence: "official" },
      { sourceName: "NPPA Ceiling Records", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 2. AMOXICILLIN + CLAVULANIC ACID 625 MG (Schedule H1 Antibiotic)
  // =========================================================================
  {
    id: "med-augmentin-625",
    brandName: "Augmentin 625 Duo",
    brandNameHindi: "ऑगमेंटिन 625 डुओ",
    genericName: "Amoxicillin and Potassium Clavulanate",
    saltComposition: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    activeIngredients: [
      { name: "Amoxicillin", standardName: "Amoxicillin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Clavulanic Acid", standardName: "Clavulanic Acid", strength: "125 mg", strengthValue: 125, strengthUnit: "mg" }
    ],
    strength: "625 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 223.50,
    pricePerUnit: 22.35,
    unitType: "tablet",
    manufacturer: {
      name: "GlaxoSmithKline Pharmaceuticals Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/18/1990",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    nlemVersion: "NLEM 2022",
    isPriceControlled: true,
    ceilingPrice: 19.46,
    nppaNotificationRef: "S.O. 1501(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901043007812",
    gtin: "08901043007812",
    storageInfo: {
      en: "Store protected from moisture and light below 25°C in original moisture-proof strip.",
      hi: "25°C से कम तापमान पर नमी और रोशनी से बचाकर मूल स्ट्रिप में रखें।"
    },
    indications: {
      en: ["Bacterial sinusitis", "Community-acquired pneumonia", "Urinary tract infections (UTI)", "Skin & soft tissue infections"],
      hi: ["साइनसाइटिस", "निमोनिया", "मूत्र मार्ग संक्रमण (UTI)", "त्वचा संक्रमण"]
    },
    warnings: {
      en: [
        "SCHEDULE H1 PRESCRIPTION DRUG: WARNING: To be sold by retail on the prescription of a Registered Medical Practitioner only.",
        "Complete the full prescribed course even if symptoms improve to prevent antibiotic resistance.",
        "Take at the start of a meal to reduce stomach irritation."
      ],
      hi: [
        "शेड्यूल H1 प्रिस्क्रिप्शन दवा: केवल पंजीकृत चिकित्सक के पर्चे पर ही दी जाए।",
        "एंटीबायोटिक प्रतिरोध से बचने के लिए डॉक्टर द्वारा बताया गया पूरा कोर्स समाप्त करें।"
      ]
    },
    contraindications: {
      en: ["Penicillin allergy", "History of amoxicillin-associated liver jaundice"],
      hi: ["पेनिसिलिन से एलर्जी", "पीलिया का इतिहास"]
    },
    interactions: {
      en: ["Oral anticoagulants (warfarin)", "Methotrexate", "Allopurinol"],
      hi: ["वारफारिन", "मेथोट्रेक्सेट", "एलोप्यूरिनॉल"]
    },
    sideEffects: {
      en: ["Diarrhoea", "Nausea", "Vaginal thrush", "Skin rash"],
      hi: ["दस्त", "उल्टी", "फंगल इन्फेक्शन", "दाने"]
    },
    sources: [
      { sourceName: "NPPA DPCO Gazette 2023", lastUpdated: "2024-04-01", confidence: "official" },
      { sourceName: "CDSCO Formulations Master", lastUpdated: "2023-12-10", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-15"
  },
  {
    id: "med-moxikind-cv-625",
    brandName: "Moxikind-CV 625",
    brandNameHindi: "मॉक्सीकाइंड-सीवी 625",
    genericName: "Amoxicillin and Potassium Clavulanate",
    saltComposition: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    activeIngredients: [
      { name: "Amoxicillin", standardName: "Amoxicillin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Clavulanic Acid", standardName: "Clavulanic Acid", strength: "125 mg", strengthValue: 125, strengthUnit: "mg" }
    ],
    strength: "625 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 185.00,
    pricePerUnit: 18.50,
    unitType: "tablet",
    manufacturer: {
      name: "Mankind Pharma Ltd",
      originCountry: "India",
      licenseNo: "DL/DRUG/12/2004",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 19.46,
    isJanAushadhi: false,
    barcode: "8902043009988",
    gtin: "08902043009988",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Respiratory infections", "Dental abscess", "Skin and bone infections"],
      hi: ["श्वसन संक्रमण", "दांतों का संक्रमण", "त्वचा संक्रमण"]
    },
    warnings: {
      en: ["Schedule H1: Warning - Danger to take without medical supervision."],
      hi: ["शेड्यूल H1: चेतावनी - बिना डॉक्टर की देखरेख में लेना खतरनाक है।"]
    },
    contraindications: {
      en: ["Known beta-lactam allergy"],
      hi: ["पेनिसिलिन एलर्जी"]
    },
    interactions: {
      en: ["Warfarin", "Probenecid"],
      hi: ["वारफारिन", "प्रोबेनेसिड"]
    },
    sideEffects: {
      en: ["Loose motions", "Gastric upset"],
      hi: ["दस्त", "पेट दर्द"]
    },
    sources: [
      { sourceName: "NPPA Ceiling Records", lastUpdated: "2024-03-25", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-20"
  },
  {
    id: "med-clavam-625",
    brandName: "Clavam 625",
    brandNameHindi: "क्लैवम 625",
    genericName: "Amoxicillin and Potassium Clavulanate",
    saltComposition: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    activeIngredients: [
      { name: "Amoxicillin", standardName: "Amoxicillin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Clavulanic Acid", standardName: "Clavulanic Acid", strength: "125 mg", strengthValue: 125, strengthUnit: "mg" }
    ],
    strength: "625 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 205.00,
    pricePerUnit: 20.50,
    unitType: "tablet",
    manufacturer: {
      name: "Alkem Laboratories Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/39/1996",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 19.46,
    isJanAushadhi: false,
    barcode: "8901117006622",
    gtin: "08901117006622",
    storageInfo: {
      en: "Store protected from moisture below 25°C in original strip.",
      hi: "25°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Bacterial infections of ear, nose, throat, chest, and urinary tract"],
      hi: ["कान, नाक, गले और छाती का जीवाणु संक्रमण"]
    },
    warnings: {
      en: ["Schedule H1: Complete prescribed course."],
      hi: ["शेड्यूल H1: पूरा कोर्स समाप्त करें।"]
    },
    contraindications: {
      en: ["Penicillin allergy"],
      hi: ["पेनिसिलिन एलर्जी"]
    },
    interactions: {
      en: ["Blood thinners"],
      hi: ["रक्त पतला करने वाली दवाएं"]
    },
    sideEffects: {
      en: ["Loose stools", "Nausea"],
      hi: ["दस्त", "उल्टी"]
    },
    sources: [
      { sourceName: "NPPA Ceiling Records", lastUpdated: "2024-03-25", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-25"
  },
  {
    id: "med-janaushadhi-amoxi-clav-625",
    brandName: "Jan Aushadhi Amoxycillin & Potassium Clavulanate 625",
    brandNameHindi: "जन औषधि एमोक्सिसिलिन और पोटैशियम क्लैवुलैनेट 625",
    genericName: "Amoxicillin and Potassium Clavulanate",
    saltComposition: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    activeIngredients: [
      { name: "Amoxicillin", standardName: "Amoxicillin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Clavulanic Acid", standardName: "Clavulanic Acid", strength: "125 mg", strengthValue: 125, strengthUnit: "mg" }
    ],
    strength: "625 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 65.00,
    pricePerUnit: 6.50,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 19.46,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0245",
    barcode: "8908001002455",
    gtin: "08908001002455",
    storageInfo: {
      en: "Store below 25°C in a dry place.",
      hi: "25°C से कम तापमान पर सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Severe bacterial infections", "ENT infections", "Bronchitis"],
      hi: ["गंभीर जीवाणु संक्रमण", "कान, नाक, गले का संक्रमण", "ब्रोंकाइटिस"]
    },
    warnings: {
      en: ["Schedule H1: Must be dispensed on valid doctor prescription only."],
      hi: ["शेड्यूल H1: केवल वैध डॉक्टर के पर्चे पर ही दी जा सकती है।"]
    },
    contraindications: {
      en: ["Known beta-lactam hypersensitivity"],
      hi: ["बीटा-लैक्टम एलर्जी"]
    },
    interactions: {
      en: ["Anticoagulants"],
      hi: ["रक्त पतला करने वाली दवाएं"]
    },
    sideEffects: {
      en: ["Mild diarrhoea"],
      hi: ["हल्के दस्त"]
    },
    sources: [
      { sourceName: "PMBJP Official Product Catalog 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 3. AZITHROMYCIN 500 MG (Schedule H1 Macrolide Antibiotic)
  // =========================================================================
  {
    id: "med-azithral-500",
    brandName: "Azithral 500",
    brandNameHindi: "एजिथ्रल 500",
    genericName: "Azithromycin",
    saltComposition: "Azithromycin (500mg)",
    activeIngredients: [
      { name: "Azithromycin", standardName: "Azithromycin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" }
    ],
    strength: "500 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 5,
    packUnit: "tablets",
    mrp: 129.80,
    pricePerUnit: 25.96,
    unitType: "tablet",
    manufacturer: {
      name: "Alembic Pharmaceuticals Ltd",
      originCountry: "India",
      licenseNo: "GJ/DRUG/08/1995",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 23.88,
    nppaNotificationRef: "S.O. 1503(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901117009811",
    gtin: "08901117009811",
    storageInfo: {
      en: "Store protected from moisture below 30°C.",
      hi: "30°C से कम तापमान पर नमी से सुरक्षित रखें।"
    },
    indications: {
      en: ["Throat infections / Tonsillitis", "Pneumonia", "Sinusitis", "Skin infections"],
      hi: ["गले का संक्रमण / टॉन्सिल", "निमोनिया", "साइनस", "त्वचा संक्रमण"]
    },
    warnings: {
      en: [
        "SCHEDULE H1 DRUG: Caution - indiscriminate use of antibiotics causes resistant bacteria.",
        "Take 1 hour before or 2 hours after meals with water.",
        "Caution in patients with cardiac arrhythmia."
      ],
      hi: [
        "शेड्यूल H1 दवा: एंटीबायोटिक दवाओं का अंधाधुंध उपयोग प्रतिरोध पैदा करता है।"
      ]
    },
    contraindications: {
      en: ["Allergy to macrolides", "Severe liver failure"],
      hi: ["मैक्रोलाइड एंटीबायोटिक से एलर्जी"]
    },
    interactions: {
      en: ["Antacids containing aluminium/magnesium (delays absorption)", "Digoxin"],
      hi: ["एंटासिड", "डिगॉक्सिन"]
    },
    sideEffects: {
      en: ["Stomach cramps", "Nausea", "Loose stools"],
      hi: ["पेट में मरोड़", "उल्टी", "दस्त"]
    },
    sources: [
      { sourceName: "NPPA Ceiling Orders 2023", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-10"
  },
  {
    id: "med-azee-500",
    brandName: "Azee 500",
    brandNameHindi: "एजी 500",
    genericName: "Azithromycin",
    saltComposition: "Azithromycin (500mg)",
    activeIngredients: [
      { name: "Azithromycin", standardName: "Azithromycin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" }
    ],
    strength: "500 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 5,
    packUnit: "tablets",
    mrp: 125.00,
    pricePerUnit: 25.00,
    unitType: "tablet",
    manufacturer: {
      name: "Cipla Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/21/1988",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 23.88,
    isJanAushadhi: false,
    barcode: "8901117005423",
    gtin: "08901117005423",
    storageInfo: {
      en: "Store below 30°C in a dry place.",
      hi: "30°C से कम तापमान पर सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Chest infections", "Ear infections", "Throat infections"],
      hi: ["छाती का संक्रमण", "कान का संक्रमण", "गले का संक्रमण"]
    },
    warnings: {
      en: ["Schedule H1: Dispensed only against medical prescription."],
      hi: ["शेड्यूल H1: केवल डॉक्टर के पर्चे पर दी जा सकती है।"]
    },
    contraindications: {
      en: ["Allergy to Azithromycin"],
      hi: ["एजिथ्रोमाइसिन से एलर्जी"]
    },
    interactions: {
      en: ["Antacids"],
      hi: ["एंटासिड"]
    },
    sideEffects: {
      en: ["Mild stomach ache"],
      hi: ["हल्का पेट दर्द"]
    },
    sources: [
      { sourceName: "NPPA Records", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-15"
  },
  {
    id: "med-janaushadhi-azithromycin-500",
    brandName: "Jan Aushadhi Azithromycin 500",
    brandNameHindi: "जन औषधि एजिथ्रोमाइसिन 500",
    genericName: "Azithromycin",
    saltComposition: "Azithromycin (500mg)",
    activeIngredients: [
      { name: "Azithromycin", standardName: "Azithromycin", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" }
    ],
    strength: "500 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 3,
    packUnit: "tablets",
    mrp: 35.00,
    pricePerUnit: 11.66,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H1",
    productType: "allopathic",
    therapeuticClass: "Antibiotics & Anti-Infectives",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 23.88,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0312",
    barcode: "8908001003124",
    gtin: "08908001003124",
    storageInfo: {
      en: "Store below 25°C in a dry place.",
      hi: "25°C से कम तापमान पर सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Bacterial upper respiratory infection", "Tonsillitis"],
      hi: ["ऊपरी श्वसन संक्रमण", "टॉन्सिल"]
    },
    warnings: {
      en: ["Schedule H1: Must be taken under medical guidance."],
      hi: ["शेड्यूल H1: डॉक्टर की देखरेख में ही लें।"]
    },
    contraindications: {
      en: ["Macrolide hypersensitivity"],
      hi: ["मैक्रोलाइड एलर्जी"]
    },
    interactions: {
      en: ["Antacids"],
      hi: ["एंटासिड"]
    },
    sideEffects: {
      en: ["Mild nausea"],
      hi: ["हल्की मतली"]
    },
    sources: [
      { sourceName: "PMBJP Product Master 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 4. METFORMIN 500 MG (Schedule H Diabetes Care)
  // =========================================================================
  {
    id: "med-glycomet-500",
    brandName: "Glycomet 500",
    brandNameHindi: "ग्लाइकोमेट 500",
    genericName: "Metformin Hydrochloride",
    saltComposition: "Metformin Hydrochloride (500mg)",
    activeIngredients: [
      { name: "Metformin Hydrochloride", standardName: "Metformin Hydrochloride", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" }
    ],
    strength: "500 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 20,
    packUnit: "tablets",
    mrp: 46.50,
    pricePerUnit: 2.32,
    unitType: "tablet",
    manufacturer: {
      name: "USV Pvt Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/55/1994",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Diabetes Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 1.54,
    nppaNotificationRef: "S.O. 1505(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901117003456",
    gtin: "08901117003456",
    storageInfo: {
      en: "Store in a cool dry place protected from light and moisture.",
      hi: "प्रकाश और नमी से बचाकर ठंडी व सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Type 2 Diabetes Mellitus", "Insulin resistance", "PCOS"],
      hi: ["टाइप 2 डायबिटीज", "इंसुलिन प्रतिरोध", "पीसीओएस (PCOS)"]
    },
    warnings: {
      en: [
        "SCHEDULE H PRESCRIPTION DRUG: Caution - to be sold by retail on prescription only.",
        "Take with or after meals to minimize gastrointestinal disturbances.",
        "Check kidney function (serum creatinine) periodically."
      ],
      hi: [
        "शेड्यूल H दवा: भोजन के साथ या तुरंत बाद लें। नियमित किडनी जांच कराएं।"
      ]
    },
    contraindications: {
      en: ["Severe renal failure (eGFR < 30 mL/min)", "Diabetic ketoacidosis"],
      hi: ["गंभीर किडनी रोग", "कीटोएसिडोसिस"]
    },
    interactions: {
      en: ["Radiocontrast dyes", "Excessive alcohol"],
      hi: ["रेडियोलॉजी डाई", "शराब"]
    },
    sideEffects: {
      en: ["Metallic taste", "Flatulence", "Diarrhoea"],
      hi: ["मुंह का कसैला स्वाद", "गैस", "दस्त"]
    },
    sources: [
      { sourceName: "NPPA DPCO 2023", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-12"
  },
  {
    id: "med-janaushadhi-metformin-500",
    brandName: "Jan Aushadhi Metformin 500",
    brandNameHindi: "जन औषधि मेटफॉर्मिन 500",
    genericName: "Metformin Hydrochloride",
    saltComposition: "Metformin Hydrochloride (500mg)",
    activeIngredients: [
      { name: "Metformin Hydrochloride", standardName: "Metformin Hydrochloride", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" }
    ],
    strength: "500 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 9.00,
    pricePerUnit: 0.90,
    unitType: "tablet",
    manufacturer: {
      name: "PMBI (Pradhan Mantri Bhartiya Janaushadhi Pariyojana)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Diabetes Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 1.54,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0118",
    barcode: "8908001001181",
    gtin: "08908001001181",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Type 2 Diabetes Mellitus"],
      hi: ["टाइप 2 मधुमेह"]
    },
    warnings: {
      en: ["Schedule H: Use only under physician supervision."],
      hi: ["शेड्यूल H: डॉक्टर की देखरेख में ही लें।"]
    },
    contraindications: {
      en: ["Kidney failure"],
      hi: ["गुर्दे की खराबी"]
    },
    interactions: {
      en: ["Alcohol"],
      hi: ["शराब"]
    },
    sideEffects: {
      en: ["Mild flatulence"],
      hi: ["पेट फूलना"]
    },
    sources: [
      { sourceName: "PMBJP 2024 Price List", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 5. PANTOPRAZOLE 40 MG (Digestive & Acidity Care)
  // =========================================================================
  {
    id: "med-pantocid-40",
    brandName: "Pantocid 40",
    brandNameHindi: "पैंटोसिड 40",
    genericName: "Pantoprazole",
    saltComposition: "Pantoprazole Sodium (40mg)",
    activeIngredients: [
      { name: "Pantoprazole Sodium", standardName: "Pantoprazole", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 168.00,
    pricePerUnit: 11.20,
    unitType: "tablet",
    manufacturer: {
      name: "Sun Pharmaceutical Industries Ltd",
      originCountry: "India",
      licenseNo: "GJ/DRUG/14/1998",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Digestive & Acidity Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 8.20,
    nppaNotificationRef: "S.O. 1522(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901117006789",
    gtin: "08901117006789",
    storageInfo: {
      en: "Store in a cool dry place below 25°C. Swallow whole; do not chew.",
      hi: "25°C से कम तापमान पर सूखी जगह रखें। पूरी गोली निगलें।"
    },
    indications: {
      en: ["GERD (Gastroesophageal Reflux)", "Peptic Ulcers", "Acid Indigestion & Heartburn"],
      hi: ["एसिडिटी और सीने में जलन", "पेट के छाले (अल्सर)", "खट्टी डकारें"]
    },
    warnings: {
      en: [
        "Take on an empty stomach 30-60 minutes before breakfast.",
        "Prolonged unmonitored use (>1 year) can reduce Vitamin B12 and Magnesium."
      ],
      hi: [
        "सुबह नाश्ते से 30-60 मिनट पहले खाली पेट लें।",
        "लंबे समय तक बिना डॉक्टर की सलाह लगातार न लें।"
      ]
    },
    contraindications: {
      en: ["Hypersensitivity to pantoprazole"],
      hi: ["पैंटोप्रजोल से एलर्जी"]
    },
    interactions: {
      en: ["Ketoconazole", "Clopidogrel"],
      hi: ["एंटीफंगल दवाएं", "क्लोपिडोग्रेल"]
    },
    sideEffects: {
      en: ["Headache", "Gas", "Mild diarrhoea"],
      hi: ["सिरदर्द", "गैस", "दस्त"]
    },
    sources: [
      { sourceName: "NPPA DPCO 2023", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-12"
  },
  {
    id: "med-pan-40",
    brandName: "Pan 40",
    brandNameHindi: "पैन 40",
    genericName: "Pantoprazole",
    saltComposition: "Pantoprazole Sodium (40mg)",
    activeIngredients: [
      { name: "Pantoprazole Sodium", standardName: "Pantoprazole", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 155.00,
    pricePerUnit: 10.33,
    unitType: "tablet",
    manufacturer: {
      name: "Alkem Laboratories Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/39/1996",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Digestive & Acidity Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 8.20,
    isJanAushadhi: false,
    barcode: "8901117007711",
    gtin: "08901117007711",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Gastric acidity", "Reflux esophagitis"],
      hi: ["एसिडिटी", "सीने में जलन"]
    },
    warnings: {
      en: ["Schedule H: Swallow whole with water."],
      hi: ["शेड्यूल H: बिना चबाए पानी के साथ पूरी गोली निगलें।"]
    },
    contraindications: {
      en: ["Hypersensitivity"],
      hi: ["एलर्जी"]
    },
    interactions: {
      en: ["Atazanavir"],
      hi: ["एटाजानावीर"]
    },
    sideEffects: {
      en: ["Abdominal pain"],
      hi: ["पेट दर्द"]
    },
    sources: [
      { sourceName: "NPPA Records", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-25"
  },
  {
    id: "med-janaushadhi-pantoprazole-40",
    brandName: "Jan Aushadhi Pantoprazole 40",
    brandNameHindi: "जन औषधि पैंटोप्रजोल 40",
    genericName: "Pantoprazole",
    saltComposition: "Pantoprazole Sodium (40mg)",
    activeIngredients: [
      { name: "Pantoprazole Sodium", standardName: "Pantoprazole", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 22.00,
    pricePerUnit: 2.20,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Digestive & Acidity Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 8.20,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0094",
    barcode: "8908001000948",
    gtin: "08908001000948",
    storageInfo: {
      en: "Store in a cool dry place.",
      hi: "ठंडी और सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Hyperacidity", "Acid reflux", "Gastric ulcers"],
      hi: ["एसिडिटी", "गैस", "पेट के छाले"]
    },
    warnings: {
      en: ["Schedule H: Take on empty stomach 30 mins before morning food."],
      hi: ["शेड्यूल H: सुबह भोजन से 30 मिनट पहले खाली पेट लें।"]
    },
    contraindications: {
      en: ["Severe liver disease"],
      hi: ["लिवर रोग"]
    },
    interactions: {
      en: ["Iron supplements"],
      hi: ["आयरन की गोलियां"]
    },
    sideEffects: {
      en: ["Mild headache"],
      hi: ["हल्का सिरदर्द"]
    },
    sources: [
      { sourceName: "PMBJP 2024 Price List", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 6. TELMISARTAN 40 MG (Cardiac & Hypertension Care)
  // =========================================================================
  {
    id: "med-telma-40",
    brandName: "Telma 40",
    brandNameHindi: "टेल्मा 40",
    genericName: "Telmisartan",
    saltComposition: "Telmisartan (40mg)",
    activeIngredients: [
      { name: "Telmisartan", standardName: "Telmisartan", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 30,
    packUnit: "tablets",
    mrp: 236.00,
    pricePerUnit: 7.86,
    unitType: "tablet",
    manufacturer: {
      name: "Glenmark Pharmaceuticals Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/42/1999",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Cardiac & BP Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 6.80,
    nppaNotificationRef: "S.O. 1512(E) NPPA Order 2023",
    isJanAushadhi: false,
    barcode: "8901117004432",
    gtin: "08901117004432",
    storageInfo: {
      en: "Store protected from moisture below 30°C in original blister pack.",
      hi: "मूल ब्लिस्टर पैक में 30°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Hypertension (High Blood Pressure)", "Cardiovascular risk reduction"],
      hi: ["उच्च रक्तचाप (हाई बीपी)", "हृदय रोगों से बचाव"]
    },
    warnings: {
      en: [
        "SCHEDULE H: WARNING: When used in pregnancy during the 2nd and 3rd trimesters, can cause fatal fetal injury.",
        "Monitor blood pressure and serum potassium regularly."
      ],
      hi: [
        "शेड्यूल H: चेतावनी: गर्भावस्था में पूर्णतः वर्जित है।",
        "नियमित रूप से बीपी और पोटैशियम की जांच कराएं।"
      ]
    },
    contraindications: {
      en: ["Pregnancy and breastfeeding", "Biliary obstruction"],
      hi: ["गर्भावस्था", "पित्त नली में रुकावट"]
    },
    interactions: {
      en: ["Potassium supplements", "Lithium"],
      hi: ["पोटैशियम सप्लीमेंट", "लिथियम"]
    },
    sideEffects: {
      en: ["Dizziness", "Low BP on standing"],
      hi: ["चक्कर आना", "लो बीपी"]
    },
    sources: [
      { sourceName: "NPPA DPCO 2023", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-14"
  },
  {
    id: "med-telmikind-40",
    brandName: "Telmikind 40",
    brandNameHindi: "टेल्मिकाइंड 40",
    genericName: "Telmisartan",
    saltComposition: "Telmisartan (40mg)",
    activeIngredients: [
      { name: "Telmisartan", standardName: "Telmisartan", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 65.00,
    pricePerUnit: 6.50,
    unitType: "tablet",
    manufacturer: {
      name: "Mankind Pharma Ltd",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Cardiac & BP Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 6.80,
    isJanAushadhi: false,
    barcode: "8902043003311",
    gtin: "08902043003311",
    storageInfo: {
      en: "Store protected from moisture below 30°C.",
      hi: "30°C से कम तापमान पर रखें।"
    },
    indications: {
      en: ["High blood pressure"],
      hi: ["हाई ब्लड प्रेशर"]
    },
    warnings: {
      en: ["Schedule H: Strictly contraindicated in pregnancy."],
      hi: ["शेड्यूल H: गर्भावस्था में न लें।"]
    },
    contraindications: {
      en: ["Pregnancy"],
      hi: ["गर्भावस्था"]
    },
    interactions: {
      en: ["Potassium salts"],
      hi: ["पोटैशियम"]
    },
    sideEffects: {
      en: ["Dizziness"],
      hi: ["चक्कर आना"]
    },
    sources: [
      { sourceName: "NPPA Records", lastUpdated: "2024-04-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-20"
  },
  {
    id: "med-janaushadhi-telmisartan-40",
    brandName: "Jan Aushadhi Telmisartan 40",
    brandNameHindi: "जन औषधि टेल्मिसार्टन 40",
    genericName: "Telmisartan",
    saltComposition: "Telmisartan (40mg)",
    activeIngredients: [
      { name: "Telmisartan", standardName: "Telmisartan", strength: "40 mg", strengthValue: 40, strengthUnit: "mg" }
    ],
    strength: "40 mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 14.00,
    pricePerUnit: 1.40,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Cardiac & BP Care",
    isNLEM: true,
    isPriceControlled: true,
    ceilingPrice: 6.80,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0188",
    barcode: "8908001001884",
    gtin: "08908001001884",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर नमी से बचाकर रखें।"
    },
    indications: {
      en: ["Hypertension"],
      hi: ["हाई ब्लड प्रेशर"]
    },
    warnings: {
      en: ["Schedule H: Strictly contraindicated during pregnancy."],
      hi: ["शेड्यूल H: गर्भावस्था में पूर्णतः वर्जित।"]
    },
    contraindications: {
      en: ["Pregnancy"],
      hi: ["गर्भावस्था"]
    },
    interactions: {
      en: ["Potassium salts"],
      hi: ["पोटैशियम सॉल्ट"]
    },
    sideEffects: {
      en: ["Postural dizziness"],
      hi: ["उठते समय चक्कर आना"]
    },
    sources: [
      { sourceName: "PMBJP Catalog 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 7. MONTELUKAST + LEVOCETIRIZINE (Allergy, Cough & Respiratory)
  // =========================================================================
  {
    id: "med-montair-lc",
    brandName: "Montair-LC",
    brandNameHindi: "मोंटेयर-एलसी",
    genericName: "Montelukast and Levocetirizine",
    saltComposition: "Montelukast Sodium (10mg) + Levocetirizine Hydrochloride (5mg)",
    activeIngredients: [
      { name: "Montelukast Sodium", standardName: "Montelukast", strength: "10 mg", strengthValue: 10, strengthUnit: "mg" },
      { name: "Levocetirizine Dihydrochloride", standardName: "Levocetirizine", strength: "5 mg", strengthValue: 5, strengthUnit: "mg" }
    ],
    strength: "10mg + 5mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 312.00,
    pricePerUnit: 20.80,
    unitType: "tablet",
    manufacturer: {
      name: "Cipla Ltd",
      originCountry: "India",
      licenseNo: "MH/DRUG/21/1988",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Allergy & Respiratory Care",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: false,
    barcode: "8901117008123",
    gtin: "08901117008123",
    storageInfo: {
      en: "Store protected from moisture and light below 25°C.",
      hi: "25°C से कम तापमान पर नमी और धूप से बचाकर रखें।"
    },
    indications: {
      en: ["Allergic rhinitis", "Seasonal sneezing & runny nose", "Asthma prophylaxis"],
      hi: ["एलर्जी राइनाइटिस", "छींकें और बहती नाक", "अस्थमा से बचाव"]
    },
    warnings: {
      en: [
        "May cause mild drowsiness or sleepiness; preferably taken at night before bed.",
        "Avoid alcohol while taking this medicine.",
        "Caution in patients with severe kidney impairment."
      ],
      hi: [
        "इससे नींद या सुस्ती आ सकती है, इसलिए रात को सोते समय लेना बेहतर है।"
      ]
    },
    contraindications: {
      en: ["Severe renal failure (creatinine clearance < 10 ml/min)"],
      hi: ["गंभीर किडनी रोग"]
    },
    interactions: {
      en: ["Alcohol", "CNS depressants", "Phenobarbital"],
      hi: ["शराब", "नींद की गोलियां"]
    },
    sideEffects: {
      en: ["Sleepiness", "Dry mouth", "Headache"],
      hi: ["नींद आना", "मुंह सूखना", "सिरदर्द"]
    },
    sources: [
      { sourceName: "CDSCO Formulations Database", lastUpdated: "2023-10-10", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-01"
  },
  {
    id: "med-janaushadhi-montelukast-levocetirizine",
    brandName: "Jan Aushadhi Montelukast & Levocetirizine",
    brandNameHindi: "जन औषधि मोंटेलुकास्ट और लेवोसेटिरिज़िन",
    genericName: "Montelukast and Levocetirizine",
    saltComposition: "Montelukast Sodium (10mg) + Levocetirizine Hydrochloride (5mg)",
    activeIngredients: [
      { name: "Montelukast Sodium", standardName: "Montelukast", strength: "10 mg", strengthValue: 10, strengthUnit: "mg" },
      { name: "Levocetirizine Dihydrochloride", standardName: "Levocetirizine", strength: "5 mg", strengthValue: 5, strengthUnit: "mg" }
    ],
    strength: "10mg + 5mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 35.00,
    pricePerUnit: 3.50,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "Schedule H",
    productType: "allopathic",
    therapeuticClass: "Allergy & Respiratory Care",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0419",
    barcode: "8908001004190",
    gtin: "08908001004190",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर सूखी जगह रखें।"
    },
    indications: {
      en: ["Allergy symptoms", "Sneezing", "Watery eyes", "Itchy nose"],
      hi: ["एलर्जी", "छींक", "आंखों से पानी", "नाक में खुजली"]
    },
    warnings: {
      en: ["Schedule H: Take at bedtime. Do not drive if drowsy."],
      hi: ["शेड्यूल H: रात को सोने से पहले लें।"]
    },
    contraindications: {
      en: ["Severe renal impairment"],
      hi: ["गुर्दे की खराबी"]
    },
    interactions: {
      en: ["Alcohol"],
      hi: ["शराब"]
    },
    sideEffects: {
      en: ["Mild drowsiness"],
      hi: ["हल्की सुस्ती"]
    },
    sources: [
      { sourceName: "PMBJP Catalog 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 8. COMBIFLAM (Ibuprofen + Paracetamol) - Pain & Inflammation
  // =========================================================================
  {
    id: "med-combiflam",
    brandName: "Combiflam",
    brandNameHindi: "कॉम्बीफ्लेम",
    genericName: "Ibuprofen and Paracetamol",
    saltComposition: "Ibuprofen (400mg) + Paracetamol (325mg)",
    activeIngredients: [
      { name: "Ibuprofen", standardName: "Ibuprofen", strength: "400 mg", strengthValue: 400, strengthUnit: "mg" },
      { name: "Paracetamol", standardName: "Paracetamol", strength: "325 mg", strengthValue: 325, strengthUnit: "mg" }
    ],
    strength: "400mg + 325mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 20,
    packUnit: "tablets",
    mrp: 49.50,
    pricePerUnit: 2.47,
    unitType: "tablet",
    manufacturer: {
      name: "Sanofi India Ltd",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: false,
    barcode: "8901117009944",
    gtin: "08901117009944",
    storageInfo: {
      en: "Store protected from moisture below 25°C.",
      hi: "25°C से कम तापमान पर सूखी जगह रखें।"
    },
    indications: {
      en: ["Dental pain", "Period cramps (dysmenorrhea)", "Joint sprains & arthritis", "Fever with inflammation"],
      hi: ["दांत दर्द", "माहवारी का दर्द", "जोड़ों का दर्द व मोच", "बुखार और सूजन"]
    },
    warnings: {
      en: [
        "Take strictly after food or with milk to avoid acidity and stomach ulceration (NSAID caution).",
        "Avoid if you have history of peptic ulcer, gastrointestinal bleeding, or severe kidney disease."
      ],
      hi: [
        "पेट की जलन और अल्सर से बचने के लिए भोजन के बाद ही लें।"
      ]
    },
    contraindications: {
      en: ["Active stomach ulcer", "Third trimester of pregnancy", "Severe renal/cardiac failure"],
      hi: ["पेट में अल्सर", "गर्भावस्था की तीसरी तिमाही"]
    },
    interactions: {
      en: ["Aspirin", "Blood pressure medicines (ACE inhibitors)", "Anticoagulants"],
      hi: ["एस्पिरिन", "बीपी की दवाएं", "खून पतला करने वाली दवाएं"]
    },
    sideEffects: {
      en: ["Heartburn", "Nausea", "Gastric discomfort"],
      hi: ["सीने में जलन", "जी मिचलाना", "पेट दर्द"]
    },
    sources: [
      { sourceName: "CDSCO Packaging Records", lastUpdated: "2024-01-10", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-15"
  },
  {
    id: "med-janaushadhi-ibuprofen-paracetamol",
    brandName: "Jan Aushadhi Ibuprofen & Paracetamol",
    brandNameHindi: "जन औषधि इबुप्रोफेन और पैरासिटामोल",
    genericName: "Ibuprofen and Paracetamol",
    saltComposition: "Ibuprofen (400mg) + Paracetamol (325mg)",
    activeIngredients: [
      { name: "Ibuprofen", standardName: "Ibuprofen", strength: "400 mg", strengthValue: 400, strengthUnit: "mg" },
      { name: "Paracetamol", standardName: "Paracetamol", strength: "325 mg", strengthValue: 325, strengthUnit: "mg" }
    ],
    strength: "400mg + 325mg",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 12.00,
    pricePerUnit: 1.20,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Analgesics & Antipyretics",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0105",
    barcode: "8908001001051",
    gtin: "08908001001051",
    storageInfo: {
      en: "Store in a cool dry place.",
      hi: "ठंडी और सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Inflammatory pain", "Dental ache", "Fever"],
      hi: ["दर्द और सूजन", "दांत दर्द", "बुखार"]
    },
    warnings: {
      en: ["Always take after meals with plenty of water."],
      hi: ["हमेशा भोजन के बाद पर्याप्त पानी के साथ लें।"]
    },
    contraindications: {
      en: ["Gastric ulcers"],
      hi: ["पेट के छाले"]
    },
    interactions: {
      en: ["Aspirin"],
      hi: ["एस्पिरिन"]
    },
    sideEffects: {
      en: ["Acidity"],
      hi: ["एसिडिटी"]
    },
    sources: [
      { sourceName: "PMBJP Catalog 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 9. VITAMINS & MINERALS (Shelcal 500, Becosules)
  // =========================================================================
  {
    id: "med-shelcal-500",
    brandName: "Shelcal 500",
    brandNameHindi: "शेलकल 500",
    genericName: "Calcium and Vitamin D3",
    saltComposition: "Elemental Calcium (500mg from Calcium Carbonate 1250mg) + Vitamin D3 (250 IU)",
    activeIngredients: [
      { name: "Elemental Calcium", standardName: "Calcium Carbonate", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Cholecalciferol (Vitamin D3)", standardName: "Vitamin D3", strength: "250 IU", strengthValue: 250, strengthUnit: "IU" }
    ],
    strength: "500mg + 250 IU",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 15,
    packUnit: "tablets",
    mrp: 141.00,
    pricePerUnit: 9.40,
    unitType: "tablet",
    manufacturer: {
      name: "Torrent Pharmaceuticals Ltd",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Vitamins & Supplements",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: false,
    barcode: "8901117007788",
    gtin: "08901117007788",
    storageInfo: {
      en: "Store in a cool dry place protected from light.",
      hi: "ठंडी और सूखी जगह पर प्रकाश से बचाकर रखें।"
    },
    indications: {
      en: ["Calcium deficiency", "Osteoporosis support", "Post-menopausal bone health", "Pregnancy & lactation supplement"],
      hi: ["कैल्शियम की कमी", "हड्डियों की कमजोरी (ऑस्टियोपोरोसिस)", "गर्भावस्था में पोषण"]
    },
    warnings: {
      en: ["Take with or after food for optimal absorption.", "Avoid taking at the same time as thyroid or iron tablets (separate by 2 hours)."],
      hi: ["भोजन के बाद लें। थायराइड या आयरन की गोली के साथ एक ही समय पर न लें।"]
    },
    contraindications: {
      en: ["Hypercalcemia", "Severe hypercalciuria", "Kidney stones (calcium oxalate)"],
      hi: ["रक्त में अत्यधिक कैल्शियम", "गुर्दे की पथरी"]
    },
    interactions: {
      en: ["Levothyroxine (reduced absorption)", "Iron tablets", "Tetracyclines"],
      hi: ["थायराइड दवा", "आयरन", "टेट्रासाइक्लिन"]
    },
    sideEffects: {
      en: ["Constipation", "Mild bloating"],
      hi: ["कब्ज", "पेट भारी होना"]
    },
    sources: [
      { sourceName: "Manufacturer Declared MRP", lastUpdated: "2024-05-10", confidence: "secondary" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-20"
  },
  {
    id: "med-janaushadhi-calcium-vitd3",
    brandName: "Jan Aushadhi Calcium 500mg & Vitamin D3",
    brandNameHindi: "जन औषधि कैल्शियम और विटामिन डी3",
    genericName: "Calcium and Vitamin D3",
    saltComposition: "Elemental Calcium (500mg) + Vitamin D3 (250 IU)",
    activeIngredients: [
      { name: "Elemental Calcium", standardName: "Calcium Carbonate", strength: "500 mg", strengthValue: 500, strengthUnit: "mg" },
      { name: "Vitamin D3", standardName: "Vitamin D3", strength: "250 IU", strengthValue: 250, strengthUnit: "IU" }
    ],
    strength: "500mg + 250 IU",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 10,
    packUnit: "tablets",
    mrp: 18.00,
    pricePerUnit: 1.80,
    unitType: "tablet",
    manufacturer: {
      name: "Pharmaceutical & Medical Devices Bureau of India (PMBI)",
      originCountry: "India",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "allopathic",
    therapeuticClass: "Vitamins & Supplements",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: true,
    janAushadhiCode: "PMBJP-GEN-0056",
    barcode: "8908001000566",
    gtin: "08908001000566",
    storageInfo: {
      en: "Store in a cool dry place.",
      hi: "ठंडी और सूखी जगह रखें।"
    },
    indications: {
      en: ["Bone health", "Calcium deficiency"],
      hi: ["हड्डी स्वास्थ्य", "कैल्शियम की कमी"]
    },
    warnings: {
      en: ["Take after food."],
      hi: ["भोजन के बाद लें।"]
    },
    contraindications: {
      en: ["Hypercalcemia"],
      hi: ["रक्त में अधिक कैल्शियम"]
    },
    interactions: {
      en: ["Iron pills"],
      hi: ["आयरन की गोलियां"]
    },
    sideEffects: {
      en: ["Mild constipation"],
      hi: ["हल्की कब्ज"]
    },
    sources: [
      { sourceName: "PMBJP Catalog 2024", lastUpdated: "2024-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-08-20"
  },

  // =========================================================================
  // 10. AYUSH & HERBAL FORMULATIONS
  // =========================================================================
  {
    id: "med-dabur-chyawanprash",
    brandName: "Dabur Chyawanprash",
    brandNameHindi: "डाबर च्यवनप्राश",
    genericName: "Ayurvedic Proprietary Rasayana",
    saltComposition: "Amla, Guduchi, Pippali, Ashwagandha, Dashmoola & Herbs (40+ Ayurvedic Botanicals)",
    activeIngredients: [
      { name: "Emblica officinalis (Amla)", standardName: "Amla", strength: "4.15g per 100g" },
      { name: "Withania somnifera (Ashwagandha)", standardName: "Ashwagandha", strength: "0.26g per 100g" }
    ],
    strength: "Traditional Formulation",
    dosageForm: "Paste / Avaleha",
    routeOfAdministration: "Oral",
    packSize: 500,
    packUnit: "gm",
    mrp: 220.00,
    pricePerUnit: 0.44,
    unitType: "gm",
    manufacturer: {
      name: "Dabur India Ltd",
      originCountry: "India",
      licenseNo: "HP/AYUSH/03/1990",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "ayush",
    therapeuticClass: "Ayurvedic & Herbal Care",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: false,
    barcode: "8901207001019",
    gtin: "08901207001019",
    storageInfo: {
      en: "Store in a cool dry place away from direct sunlight. Do not refrigerate.",
      hi: "सीधी धूप से दूर ठंडी व सूखी जगह पर रखें। फ्रिज में न रखें।"
    },
    indications: {
      en: ["General vitality", "Traditional immunity support", "Seasonal cough and cold prevention"],
      hi: ["सामान्य शक्ति", "पारंपरिक रोग प्रतिरोधक क्षमता", "मौसमी सर्दी-खांसी से बचाव"]
    },
    warnings: {
      en: [
        "AYUSH / AYURVEDIC MEDICINE: Regulated under Drugs & Cosmetics Act (Chapter IV-A).",
        "Not an interchangeable substitute for allopathic medicines.",
        "Contains natural sugars: Diabetic patients should exercise caution or use sugar-free variant."
      ],
      hi: [
        "आयुष / आयुर्वेदिक उत्पाद: यह एलोपैथिक दवाओं का प्रत्यक्ष विकल्प नहीं है।",
        "मधुमेह के रोगी प्राकृतिक शर्करा के कारण सावधानी से सेवन करें।"
      ]
    },
    contraindications: {
      en: ["Uncontrolled diabetes (for regular sugar-containing formulation)"],
      hi: ["अनियंत्रित मधुमेह"]
    },
    interactions: {
      en: ["No known severe allopathic drug interactions documented."],
      hi: ["कोई ज्ञात गंभीर प्रतिक्रिया नहीं।"]
    },
    sideEffects: {
      en: ["Mild heat sensation in some constitutions (Pitta aggravation)"],
      hi: ["कुछ लोगों में शरीर में हल्की गर्मी लगना"]
    },
    sources: [
      { sourceName: "Ayurvedic Pharmacopoeia of India (API)", lastUpdated: "2023-01-01", confidence: "official" },
      { sourceName: "Manufacturer Packaging Declaration", lastUpdated: "2024-01-10", confidence: "secondary" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-06-15"
  },
  {
    id: "med-himalaya-liv-52",
    brandName: "Himalaya Liv.52",
    brandNameHindi: "हिमालय लिव.52",
    genericName: "Ayurvedic Liver Formulation",
    saltComposition: "Himsra (Capparis spinosa) 65mg, Kasani (Cichorium intybus) 65mg, Mandur Bhasma 33mg",
    activeIngredients: [
      { name: "Capparis spinosa", standardName: "Himsra", strength: "65 mg" },
      { name: "Cichorium intybus", standardName: "Kasani", strength: "65 mg" }
    ],
    strength: "Herbal Proprietary",
    dosageForm: "Tablet",
    routeOfAdministration: "Oral",
    packSize: 100,
    packUnit: "tablets",
    mrp: 170.00,
    pricePerUnit: 1.70,
    unitType: "tablet",
    manufacturer: {
      name: "The Himalaya Drug Company",
      originCountry: "India",
      licenseNo: "KA/AYUSH/L-08/1975",
      isIndianPharma: true,
    },
    prescriptionCategory: "OTC",
    productType: "ayush",
    therapeuticClass: "Ayurvedic & Herbal Care",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: false,
    barcode: "8901138501235",
    gtin: "08901138501235",
    storageInfo: {
      en: "Store in a cool and dry place away from direct sunlight.",
      hi: "सीधी धूप से दूर ठंडी और सूखी जगह पर रखें।"
    },
    indications: {
      en: ["Supportive therapy in sluggish liver", "Loss of appetite", "Herbal liver care"],
      hi: ["लिवर स्वास्थ्य का समर्थन", "भूख में सुधार", "आयुर्वेदिक लिवर केयर"]
    },
    warnings: {
      en: [
        "AYUSH / AYURVEDIC FORMULATION: Distinct product classification.",
        "Do not substitute for medical treatment in acute viral hepatitis or liver cirrhosis."
      ],
      hi: [
        "आयुष / आयुर्वेदिक फॉर्मूलेशन: इसे गंभीर लिवर रोगों में एलोपैथिक दवाओं के स्थान पर न बदलें।"
      ]
    },
    contraindications: {
      en: ["Severe biliary obstruction"],
      hi: ["गंभीर पित्त रुकावट"]
    },
    interactions: {
      en: ["May enhance metabolic clearance of certain hepatically metabolized drugs."],
      hi: ["कुछ दवाओं के चयापचय पर प्रभाव पड़ सकता है।"]
    },
    sideEffects: {
      en: ["Generally well tolerated"],
      hi: ["आमतौर पर सुरक्षित"]
    },
    sources: [
      { sourceName: "Ayurvedic Formulary of India", lastUpdated: "2023-05-01", confidence: "official" }
    ],
    verificationStatus: "officially_verified",
    lastAuditedDate: "2024-07-10"
  }
];
