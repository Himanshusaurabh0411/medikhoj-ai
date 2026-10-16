import fs from "fs";
import path from "path";

// Read medicines from indianMedicines.ts
const indianMedContent = fs.readFileSync(path.resolve(process.cwd(), "src/data/indianMedicines.ts"), "utf8");
// Parse JSON from INDIAN_MEDICINES = [...]
const jsonMatch = indianMedContent.match(/export const INDIAN_MEDICINES: Medicine\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error("Could not parse INDIAN_MEDICINES");
  process.exit(1);
}

const medicines = JSON.parse(jsonMatch[1]);
console.log(`Found ${medicines.length} medicines in database.`);

const publicDir = path.resolve(process.cwd(), "public/medicines");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function generateBlisterSVG(med) {
  const isAyush = med.productType === "AYUSH";
  const isGeneric = med.isJanAushadhi;
  const isScheduleH = med.prescriptionCategory === "Schedule H" || med.prescriptionCategory === "Schedule H1";
  const isCapsule = med.dosageForm === "Capsule";
  const isJarOrBottle = med.dosageForm === "Gel" || med.packSize >= 50;

  const brandUpper = med.brandName.toUpperCase();
  const hindi = med.brandNameHindi || "";
  const genericDesc = med.genericName;
  const salt = med.saltComposition;
  const mfg = med.manufacturer.name;
  const mrpStr = `₹${med.mrp.toFixed(2)}`;
  const packStr = `${med.packSize} ${med.packUnit}`;
  const gtin = med.gtin || "08901234567890";
  const batchCode = `MED24${Math.abs(med.id.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 900 + 100)}`;
  const expiry = "12/2027";

  let accentColor = isGeneric ? "#0F766E" : isAyush ? "#B45309" : "#0D3B66";
  if (med.brandName.includes("Voveran") || med.brandName.includes("Combiflam") || med.brandName.includes("Zerodol")) {
    accentColor = "#BE123C"; // Red / Analgesic
  } else if (med.brandName.includes("Pan") || med.brandName.includes("Pantocid") || med.brandName.includes("Omez")) {
    accentColor = "#7E22CE"; // Purple / PPI
  } else if (med.brandName.includes("Telma") || med.brandName.includes("Amlopres") || med.brandName.includes("Cardace")) {
    accentColor = "#C2410C"; // Orange / Cardio
  } else if (med.brandName.includes("Glycomet") || med.brandName.includes("Galvus") || med.brandName.includes("Forxiga")) {
    accentColor = "#1D4ED8"; // Blue / Diabetes
  }

  if (isJarOrBottle) {
    // Render jar / bottle
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#F8F6F2; border-radius:18px;">
  <defs>
    <linearGradient id="jar-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#312E81" />
      <stop offset="30%" stop-color="#4338CA" />
      <stop offset="50%" stop-color="#6366F1" />
      <stop offset="70%" stop-color="#4338CA" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D1D5DB" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#9CA3AF" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#090E17" flood-opacity="0.25" />
    </filter>
  </defs>

  <ellipse cx="300" cy="340" rx="140" ry="20" fill="#090E17" opacity="0.18" />

  <g filter="url(#shadow)">
    <rect x="200" y="90" width="200" height="230" rx="30" fill="${isAyush ? '#78350F' : 'url(#jar-body)'}" />
    <rect x="230" y="45" width="140" height="50" rx="12" fill="url(#cap-grad)" />

    <rect x="205" y="115" width="190" height="175" rx="10" fill="#FFFDF9" stroke="#E2DCD5" stroke-width="1.5" />
    <rect x="205" y="115" width="190" height="32" rx="10" fill="${accentColor}" />
    <text x="300" y="136" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" letter-spacing="1">
      ${isGeneric ? "PMBJP GENERIC" : isAyush ? "AYURVEDIC RASAYANA" : "PHARMACEUTICAL IP"}
    </text>

    <text x="300" y="170" text-anchor="middle" font-family="system-ui, sans-serif" font-size="17" font-weight="900" fill="#090E17">
      ${brandUpper}
    </text>
    <text x="300" y="188" text-anchor="middle" font-family="'Noto Sans Devanagari', system-ui" font-size="11" font-weight="700" fill="${accentColor}">
      ${hindi}
    </text>

    <text x="300" y="212" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#475569">
      ${salt.length > 40 ? salt.substring(0, 38) + "..." : salt}
    </text>
    <text x="300" y="228" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#0F172A">
      ${packStr} • ${mrpStr}
    </text>

    <text x="300" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748B">
      ${mfg.length > 28 ? mfg.substring(0, 26) + "..." : mfg}
    </text>
  </g>
</svg>`;
  }

  // Blister Foil SVG
  const pillFill = isCapsule ? "url(#capsule-grad)" : "#FFFFFF";
  const pillRx = isCapsule ? "18" : "16";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" style="background:#0F172A; border-radius:18px;">
  <defs>
    <linearGradient id="blister-alu" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="25%" stop-color="#CBD5E1" />
      <stop offset="50%" stop-color="#F1F5F9" />
      <stop offset="75%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>

    <linearGradient id="pocket-rim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#64748B" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="capsule-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="50%" stop-color="${accentColor}" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>

    <filter id="pocket-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.35" />
    </filter>

    <filter id="blister-shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="300" cy="350" rx="270" ry="18" fill="#000000" opacity="0.4" />

  <!-- Main Aluminum Blister Card -->
  <g filter="url(#blister-shadow)">
    <rect x="25" y="25" width="550" height="310" rx="16" fill="url(#blister-alu)" stroke="#94A3B8" stroke-width="1.5" />

    <!-- Top Metallic Header / Brand Banner -->
    <rect x="25" y="25" width="550" height="58" rx="16" fill="${accentColor}" />
    <!-- Flatten bottom corners of header -->
    <rect x="25" y="55" width="550" height="28" fill="${accentColor}" />

    <!-- Brand Header Text -->
    <text x="45" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
      ${brandUpper}
    </text>
    <text x="45" y="74" font-family="'Noto Sans Devanagari', system-ui" font-size="12" font-weight="700" fill="#E2E8F0">
      ${hindi}
    </text>

    <!-- Pack size badge -->
    <rect x="440" y="40" width="120" height="26" rx="6" fill="#000000" opacity="0.3" />
    <text x="500" y="57" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">
      ${packStr}
    </text>

    ${isScheduleH ? `
    <!-- Mandatory Schedule H / H1 Lal Lakir (Red Warning Stripe) -->
    <rect x="190" y="83" width="8" height="252" fill="#DC2626" />
    <text x="195" y="200" transform="rotate(-90 195 200)" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#DC2626" letter-spacing="2">
      SCHEDULE H PRESCRIPTION DRUG - CAUTION
    </text>
    ` : ''}

    <!-- 6 Pill Blister Relief Pockets -->
    <!-- Col 1 -->
    <g filter="url(#pocket-shadow)">
      <rect x="50" y="105" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
      <rect x="50" y="170" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
      <rect x="50" y="235" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
    </g>

    <!-- Col 2 -->
    <g filter="url(#pocket-shadow)">
      <rect x="120" y="105" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
      <rect x="120" y="170" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
      <rect x="120" y="235" width="55" height="42" rx="${pillRx}" fill="${pillFill}" stroke="url(#pocket-rim)" stroke-width="2.5" />
    </g>

    <!-- Printed Information & Regulatory Data -->
    <g transform="translate(220, 105)">
      <!-- Salt Composition -->
      <text x="0" y="15" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0F172A">
        ${genericDesc}
      </text>
      <text x="0" y="32" font-family="system-ui, sans-serif" font-size="10.5" font-weight="600" fill="#334155">
        Each ${med.dosageForm.toLowerCase()} contains:
      </text>
      <text x="0" y="48" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1E293B">
        ${salt.length > 50 ? salt.substring(0, 48) + "..." : salt}
      </text>

      <!-- Dosage & Storage -->
      <text x="0" y="75" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#475569">
        Dosage: As directed by the Physician.
      </text>
      <text x="0" y="90" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#475569">
        Store below 25°C. Protect from moisture & light.
      </text>
      <text x="0" y="105" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#475569">
        Keep all medicines out of reach of children.
      </text>

      <!-- Manufacturer line -->
      <line x1="0" y1="120" x2="330" y2="120" stroke="#94A3B8" stroke-width="1" stroke-dasharray="2 2" />
      <text x="0" y="136" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#0F172A">
        Mfg. by: ${mfg}
      </text>

      <!-- Batch & Expiry Imprint Box -->
      <rect x="0" y="150" width="330" height="65" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
      <text x="15" y="172" font-family="monospace" font-size="10" font-weight="700" fill="#1E293B">
        B.No. ${batchCode}  •  MFD. 01/2025
      </text>
      <text x="15" y="190" font-family="monospace" font-size="10" font-weight="700" fill="#DC2626">
        EXP. ${expiry}  •  M.R.P. ${mrpStr} (INCL. ALL TAXES)
      </text>
      <text x="15" y="206" font-family="monospace" font-size="9" font-weight="600" fill="#64748B">
        GTIN: ${gtin}  •  ${med.prescriptionCategory}
      </text>
    </g>
  </g>
</svg>`;
}

let generatedCount = 0;
for (const med of medicines) {
  const filePath = path.join(publicDir, `${med.id}.svg`);
  // Generate high quality SVG
  const svg = generateBlisterSVG(med);
  fs.writeFileSync(filePath, svg, "utf8");
  generatedCount++;
}

console.log(`Successfully generated ${generatedCount} packaging SVGs in public/medicines/`);
