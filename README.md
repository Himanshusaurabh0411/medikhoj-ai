# MediKhoj (मेडीखोज)
### India's Independent Medicine Intelligence & Affordable Substitute Platform
**Tagline:** *Know Your Medicine. Compare Smarter. Stay Safer.*

---

## 1. Project Overview & Architectural Vision
**MediKhoj** is a production-grade, India-first healthcare technology platform engineered to bring absolute transparency to Indian medicines. It unifies:

1. **Intelligent Medicine Search Engine:** Multi-factor search across brand names, salt compositions, strengths, dosage forms, manufacturers, and barcodes with English & Hindi transliteration support (e.g. `पैरासिटामोल` → `Paracetamol`).
2. **Strict Bio-Equivalence & Substitute Engine:** Matches affordable alternatives sharing 100% active salts, exact milligram strength, dosage form, and route of administration across all licensed Indian manufacturers.
3. **Normalized Unit Price Comparison:** Compares unit prices per tablet, capsule, ml, or gram rather than misleading pack sizes.
4. **Official NPPA & DPCO Price Ceiling Verification:** Cross-checks declared retail MRPs against statutory maximum price ceilings gazetted under the Drug Price Control Orders (DPCO / NLEM 2022).
5. **Real-Time Dual-Layer Barcode Scanner:**
   - **Hardware Native BarcodeDetector API:** Decodes 2D GS1 DataMatrix (mandatory on top 300 Indian pharmaceutical brands) and 1D EAN-13 barcodes with zero latency.
   - **Precision Canvas Scanline Engine:** Fallback scanline algorithm that samples horizontal cross-sections of the frame, binarizes pixel run-lengths, and verifies EAN-13 checksums.
   - **Packaging Inspection:** Extracts batch numbers, manufacturing dates, and YYMMDD expiry dates with automatic expired / expiring-soon shelf-life alerts.
6. **Optical Strip & Packaging OCR:** Client-side character extraction from blister foil packaging photographs.
7. **Cautious, Age-Aware Symptom Triage Assistant:** Non-diagnostic, evidence-based triage screening for urgent red flags, enforcing strict pediatric doctor-first constraints, and routing emergencies directly to National Emergency **112**.
8. **Emergency & Poison Control Directory:** Immediate access to National Emergency 112 and verified Indian Poison Information Centers, including the National Poisons Information Centre (AIIMS New Delhi: `1800 116 117`).
9. **Bilingual English & Hindi System:** Switchable localized user interface for all workflows, labels, and safety disclaimers.
10. **Device-Local Medicine Cabinet:** Track personal medicines and shelf-life expiry without transmitting sensitive health data to external servers.

---

## 2. Directory Structure
```
MEDkhoj/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Landing page with live autocomplete & health categories
│   │   ├── search/page.tsx              # Advanced search engine with multi-faceted filters
│   │   ├── medicines/[id]/page.tsx      # Comprehensive clinical medicine monographs & 3D blister view
│   │   ├── compare/page.tsx             # Side-by-side medicine comparison workspace
│   │   ├── generics/page.tsx            # Affordable substitutes & generic savings breakdown
│   │   ├── scan/page.tsx                # Real-time camera scanner, snapshot scan, & photo OCR
│   │   ├── symptom-guide/page.tsx       # Age-aware triage with red-flag emergency screening
│   │   ├── safety/page.tsx              # Emergency 112 & AIIMS poison control directory
│   │   ├── cabinet/page.tsx             # User medicine cabinet with expiry monitoring
│   │   ├── data-sources/page.tsx        # Pipeline importer console & DPCO catalog
│   │   ├── about/page.tsx               # Platform neutrality & statutory medical disclaimer
│   │   ├── api/                         # RESTful API endpoints
│   │   │   ├── medicines/route.ts
│   │   │   ├── medicines/[id]/route.ts
│   │   │   ├── medicines/[id]/substitutions/route.ts
│   │   │   ├── barcode/parse/route.ts
│   │   │   ├── symptoms/triage/route.ts
│   │   │   └── importers/run/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── MedicineCard.tsx         # Unified clinical card with unit prices & red line indicators
│   │   │   └── ScheduleBadge.tsx        # Schedule H / H1 / X / AYUSH statutory warnings
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Responsive navbar with emergency hotline
│   │   │   ├── BottomNav.tsx            # Mobile handheld bottom navigation bar
│   │   │   └── Footer.tsx               # Authoritative regulatory citations & statutory disclaimer
│   │   └── unique/
│   │       ├── InteractiveBlisterStrip.tsx # 3D interactive foil and blister inspection tool
│   │       └── PriceCeilingGauge.tsx    # Visual DPCO ceiling price meter
│   ├── config/
│   │   └── branding.ts                  # Brand tokens and theme definition
│   ├── context/
│   │   ├── LanguageContext.tsx          # English / Hindi state and translations
│   │   └── CabinetContext.tsx           # LocalStorage-backed user medicine cabinet
│   ├── data/
│   │   ├── indianMedicines.ts           # Curated authentic Indian medicine formulations
│   │   ├── nppaPriceCeilings.ts         # Official NPPA Gazette DPCO orders (NLEM 2022)
│   │   ├── poisonControlDirectory.ts    # AIIMS NPIC & state poison center registry
│   │   └── symptomDatabase.ts           # Age-banded symptom triage rules
│   ├── i18n/
│   │   └── translations.ts              # Full English & Hindi dictionaries
│   ├── lib/
│   │   ├── searchEngine.ts              # Fuzzy, transliteration, and ranked search
│   │   ├── substitutionEngine.ts        # Strict bio-equivalence & savings calculations
│   │   ├── scannerEngine.ts             # Dual-layer BarcodeDetector & canvas scanline reader
│   │   ├── barcodeParser.ts             # GS1 Application Identifier (AI) parser
│   │   ├── symptomEngine.ts             # Clinical triage and pediatric safety logic
│   │   └── importers/
│   │       └── dataImporter.ts          # Schema validation, dry run, and conflict check
│   └── types/
│       └── medicine.ts                  # Strongly typed models and interfaces
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 3. Core Technical Specifications

### A. Strict Equivalence Matching
Two medicines are classified as equivalent substitutes **only** if:
1. `productType` matches (AYUSH and Allopathic are strictly non-interchangeable).
2. `dosageForm` matches (e.g., Tablet to Tablet, Capsule to Capsule).
3. `routeOfAdministration` matches (e.g., Oral to Oral).
4. `strength` and individual active pharmaceutical ingredient quantities match exactly.

### B. Normalized Price per Unit
$$\text{Unit Price} = \frac{\text{Maximum Retail Price (MRP)}}{\text{Pack Size}}$$
$$\text{Savings Percentage} = \left(\frac{\text{Reference Unit Price} - \text{Substitute Unit Price}}{\text{Reference Unit Price}}\right) \times 100$$
All comparisons are normalized per tablet, capsule, ml, or gram rather than pack basis.

### C. GS1 Application Identifier (AI) Parsing
- **AI (01):** 14-digit GTIN validated against Luhn mod-10 check algorithm.
- **AI (10):** Batch or lot number.
- **AI (17):** Expiry Date encoded in `YYMMDD` format. Correctly resolves year thresholds (00-50 to 2000-2050), handles day `00` as the final day of the month, and flags expired products or products expiring within 30 days.

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/medikhoj.git
cd medikhoj

# Install dependencies
npm install

# Run the local development server
npm run dev

# Or build and run for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Medical & Statutory Disclaimer
MediKhoj is an independent, non-commercial medicine intelligence engine. We do not sell medicines, nor are we an owner, affiliate, or commercial partner of any pharmaceutical manufacturer or chemist chain. 

Schedule H, H1, and X drugs under the Drugs and Cosmetics Rules (1945) must be sold by retail strictly on the prescription of a Registered Medical Practitioner. Always consult a licensed healthcare professional before switching medications. In any medical emergency, dial **112**.
