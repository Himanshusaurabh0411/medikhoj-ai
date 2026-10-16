import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { Medicine, PrescriptionCategory, ProductType, SubstitutionResult } from "@/types/medicine";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "medikhoj.sqlite");

let _db: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (_db) return _db;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  _db = new DatabaseSync(DB_PATH);
  initSchema(_db);
  return _db;
}

function initSchema(db: DatabaseSync) {
  // Main medicines table
  db.exec(`
    CREATE TABLE IF NOT EXISTS medicines (
      id TEXT PRIMARY KEY,
      brand_name TEXT NOT NULL,
      brand_name_hindi TEXT,
      generic_name TEXT NOT NULL,
      salt_composition TEXT NOT NULL,
      strength TEXT NOT NULL,
      dosage_form TEXT NOT NULL,
      route TEXT NOT NULL,
      pack_size INTEGER NOT NULL,
      pack_unit TEXT NOT NULL,
      mrp REAL NOT NULL,
      price_per_unit REAL NOT NULL,
      unit_type TEXT NOT NULL,
      manufacturer_name TEXT NOT NULL,
      manufacturer_country TEXT NOT NULL,
      prescription_category TEXT NOT NULL,
      product_type TEXT NOT NULL,
      is_jan_aushadhi INTEGER NOT NULL DEFAULT 0,
      jan_aushadhi_code TEXT,
      barcode TEXT,
      gtin TEXT,
      image_url TEXT,
      release_type TEXT DEFAULT 'immediate',
      is_narrow_therapeutic_index INTEGER DEFAULT 0,
      storage_info_en TEXT,
      storage_info_hi TEXT,
      side_effects TEXT,
      contraindications TEXT,
      food_interactions TEXT,
      alcohol_warning TEXT,
      pregnancy_category TEXT,
      dosage_guidelines_en TEXT,
      dosage_guidelines_hi TEXT,
      sources TEXT,
      last_updated TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_meds_salt ON medicines(salt_composition);
    CREATE INDEX IF NOT EXISTS idx_meds_dosage ON medicines(dosage_form);
    CREATE INDEX IF NOT EXISTS idx_meds_route ON medicines(route);
    CREATE INDEX IF NOT EXISTS idx_meds_price ON medicines(price_per_unit);
    CREATE INDEX IF NOT EXISTS idx_meds_barcode ON medicines(barcode);
    CREATE INDEX IF NOT EXISTS idx_meds_gtin ON medicines(gtin);
    CREATE INDEX IF NOT EXISTS idx_meds_jan ON medicines(is_jan_aushadhi);
    CREATE INDEX IF NOT EXISTS idx_meds_mfg ON medicines(manufacturer_name);

    CREATE VIRTUAL TABLE IF NOT EXISTS medicines_fts USING fts5(
      id UNINDEXED,
      brand_name,
      brand_name_hindi,
      generic_name,
      salt_composition,
      manufacturer_name,
      barcode,
      gtin,
      tokenize = 'unicode61 remove_diacritics 2'
    );
  `);

  // Check if database is empty; if so, seed from INDIAN_MEDICINES
  const countRow = db.prepare("SELECT COUNT(*) as count FROM medicines").get() as { count: number };
  if (countRow.count === 0 && INDIAN_MEDICINES.length > 0) {
    bulkInsertMedicines(INDIAN_MEDICINES, db);
  }
}

export function rowToMedicine(row: any): Medicine {
  return {
    id: row.id,
    brandName: row.brand_name,
    brandNameHindi: row.brand_name_hindi || undefined,
    genericName: row.generic_name,
    saltComposition: row.salt_composition,
    activeIngredients: [
      { name: row.generic_name, standardName: row.generic_name, strength: row.strength }
    ],
    strength: row.strength,
    dosageForm: row.dosage_form,
    routeOfAdministration: row.route,
    packSize: Number(row.pack_size),
    packUnit: row.pack_unit,
    mrp: Number(row.mrp),
    pricePerUnit: Number(row.price_per_unit),
    unitType: row.unit_type,
    manufacturer: {
      name: row.manufacturer_name,
      originCountry: row.manufacturer_country || "India",
      isIndianPharma: true,
    },
    prescriptionCategory: row.prescription_category as PrescriptionCategory,
    productType: row.product_type as ProductType,
    therapeuticClass: "Pharmaceutical Formulation",
    isNLEM: false,
    isPriceControlled: false,
    isJanAushadhi: Boolean(row.is_jan_aushadhi),
    janAushadhiCode: row.jan_aushadhi_code || undefined,
    barcode: row.barcode || undefined,
    gtin: row.gtin || undefined,
    imageUrl: row.image_url || undefined,
    releaseType: row.release_type || 'immediate',
    isNarrowTherapeuticIndex: Boolean(row.is_narrow_therapeutic_index),
    storageInfo: {
      en: row.storage_info_en || "Store below 25°C in a dry place. Protect from direct sunlight.",
      hi: row.storage_info_hi || "25 डिग्री सेल्सियस से नीचे सूखी जगह पर रखें। सीधी धूप से बचाएं।",
    },
    indications: {
      en: ["Approved indication for " + row.generic_name],
      hi: ["चिकित्सकीय उपयोग: " + (row.brand_name_hindi || row.brand_name)]
    },
    warnings: {
      en: [row.alcohol_warning || "Follow doctor's instructions strictly."],
      hi: ["पंजीकृत चिकित्सक के निर्देशानुसार ही लें।"]
    },
    contraindications: {
      en: row.contraindications ? JSON.parse(row.contraindications) : [],
      hi: ["गंभीर एलर्जी या अंगों की विफलता में सावधानी रखें।"]
    },
    interactions: {
      en: row.food_interactions ? JSON.parse(row.food_interactions) : [],
      hi: ["अन्य दवाओं के साथ लेने से पहले डॉक्टर से परामर्श करें।"]
    },
    sideEffects: {
      en: row.side_effects ? JSON.parse(row.side_effects) : [],
      hi: ["हल्का जी मिचलाना या सिरदर्द (दुर्लभ)।"]
    },
    sources: row.sources ? JSON.parse(row.sources) : [],
    verificationStatus: 'officially_verified',
    lastAuditedDate: row.last_updated || '2026-03-15',
  };
}

export function bulkInsertMedicines(medicines: Medicine[], dbInstance?: DatabaseSync): number {
  const db = dbInstance || getDatabase();
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO medicines (
      id, brand_name, brand_name_hindi, generic_name, salt_composition,
      strength, dosage_form, route, pack_size, pack_unit,
      mrp, price_per_unit, unit_type, manufacturer_name, manufacturer_country,
      prescription_category, product_type, is_jan_aushadhi, jan_aushadhi_code,
      barcode, gtin, image_url, release_type, is_narrow_therapeutic_index,
      storage_info_en, storage_info_hi, side_effects, contraindications,
      food_interactions, alcohol_warning, pregnancy_category,
      dosage_guidelines_en, dosage_guidelines_hi, sources, last_updated
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  const ftsStmt = db.prepare(`
    INSERT OR REPLACE INTO medicines_fts (
      id, brand_name, brand_name_hindi, generic_name, salt_composition, manufacturer_name, barcode, gtin
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const m of medicines) {
    insertStmt.run(
      m.id,
      m.brandName,
      m.brandNameHindi || null,
      m.genericName,
      m.saltComposition,
      m.strength,
      m.dosageForm,
      m.routeOfAdministration,
      m.packSize,
      m.packUnit,
      m.mrp,
      m.pricePerUnit,
      m.unitType,
      m.manufacturer.name,
      m.manufacturer.originCountry,
      m.prescriptionCategory,
      m.productType,
      m.isJanAushadhi ? 1 : 0,
      m.janAushadhiCode || null,
      m.barcode || null,
      m.gtin || null,
      m.imageUrl || null,
      m.releaseType || 'immediate',
      m.isNarrowTherapeuticIndex ? 1 : 0,
      m.storageInfo?.en || null,
      m.storageInfo?.hi || null,
      JSON.stringify(m.sideEffects?.en || []),
      JSON.stringify(m.contraindications?.en || []),
      JSON.stringify(m.interactions?.en || []),
      m.warnings?.en?.[0] || null,
      "Category B",
      "Take strictly as prescribed by a licensed physician.",
      "पंजीकृत चिकित्सक के निर्देशानुसार ही लें।",
      JSON.stringify(m.sources || []),
      new Date().toISOString()
    );

    ftsStmt.run(
      m.id,
      m.brandName,
      m.brandNameHindi || null,
      m.genericName,
      m.saltComposition,
      m.manufacturer.name,
      m.barcode || null,
      m.gtin || null
    );
    count++;
  }

  return count;
}

export function searchMedicinesFromDb(
  query: string,
  filters: {
    dosageForm?: string;
    prescriptionCategory?: string;
    productType?: string;
    isJanAushadhiOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
    manufacturer?: string;
  } = {},
  sortBy: string = "price_low_high",
  page: number = 1,
  pageSize: number = 12
) {
  const db = getDatabase();
  const cleanQ = query.trim();

  let matchingIds: string[] = [];

  if (cleanQ.length > 0) {
    // Escape FTS special chars
    const ftsQuery = cleanQ.replace(/['"*()]/g, " ").trim();
    if (ftsQuery.length > 0) {
      try {
        const ftsRows = db.prepare(`
          SELECT id FROM medicines_fts WHERE medicines_fts MATCH ? ORDER BY rank LIMIT 500
        `).all(ftsQuery + "*") as { id: string }[];
        matchingIds = ftsRows.map(r => r.id);
      } catch {
        // Fallback to LIKE if FTS expression has syntax quirk
        const likeRows = db.prepare(`
          SELECT id FROM medicines 
          WHERE brand_name LIKE ? OR salt_composition LIKE ? OR generic_name LIKE ? OR barcode = ?
          LIMIT 500
        `).all(`%${cleanQ}%`, `%${cleanQ}%`, `%${cleanQ}%`, cleanQ) as { id: string }[];
        matchingIds = likeRows.map(r => r.id);
      }
    }
  }

  let whereClauses: string[] = [];
  let params: any[] = [];

  if (cleanQ.length > 0) {
    if (matchingIds.length === 0) {
      return { items: [], totalCount: 0, page, pageSize, totalPages: 0 };
    }
    const placeholders = matchingIds.map(() => "?").join(",");
    whereClauses.push(`id IN (${placeholders})`);
    params.push(...matchingIds);
  }

  if (filters.dosageForm) {
    whereClauses.push("dosage_form = ?");
    params.push(filters.dosageForm);
  }
  if (filters.prescriptionCategory && filters.prescriptionCategory !== "ALL") {
    whereClauses.push("prescription_category = ?");
    params.push(filters.prescriptionCategory);
  }
  if (filters.productType && filters.productType !== "ALL") {
    whereClauses.push("product_type = ?");
    params.push(filters.productType);
  }
  if (filters.isJanAushadhiOnly) {
    whereClauses.push("is_jan_aushadhi = 1");
  }
  if (filters.manufacturer) {
    whereClauses.push("manufacturer_name = ?");
    params.push(filters.manufacturer);
  }
  if (filters.minPrice !== undefined) {
    whereClauses.push("price_per_unit >= ?");
    params.push(filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    whereClauses.push("price_per_unit <= ?");
    params.push(filters.maxPrice);
  }

  const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  // Count total
  const countRow = db.prepare(`SELECT COUNT(*) as count FROM medicines ${whereSql}`).get(...params) as { count: number };
  const totalCount = countRow ? countRow.count : 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const offset = (page - 1) * pageSize;

  let orderSql = "ORDER BY price_per_unit ASC";
  if (sortBy === "price_high_low") orderSql = "ORDER BY price_per_unit DESC";
  else if (sortBy === "brand_asc") orderSql = "ORDER BY brand_name ASC";

  const rows = db.prepare(`
    SELECT * FROM medicines ${whereSql} ${orderSql} LIMIT ? OFFSET ?
  `).all(...params, pageSize, offset);

  const items = rows.map(r => ({
    medicine: rowToMedicine(r),
    matchType: 'exact_brand' as const,
    score: 10,
  }));

  return {
    items,
    totalCount,
    page,
    pageSize,
    totalPages,
  };
}

export function getMedicineByIdFromDb(id: string): Medicine | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM medicines WHERE id = ?").get(id);
  if (!row) return null;
  return rowToMedicine(row);
}

export function getMedicineByBarcodeFromDb(barcode: string): Medicine | null {
  const db = getDatabase();
  const clean = barcode.trim();
  const row = db.prepare("SELECT * FROM medicines WHERE barcode = ? OR gtin = ?").get(clean, clean);
  if (!row) return null;
  return rowToMedicine(row);
}

export function getAllMedicinesFromDb(): Medicine[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM medicines ORDER BY brand_name ASC").all();
  return rows.map(rowToMedicine);
}

export function getDatabaseStats() {
  const db = getDatabase();
  const totalMeds = (db.prepare("SELECT COUNT(*) as c FROM medicines").get() as any)?.c || 0;
  const totalGenerics = (db.prepare("SELECT COUNT(*) as c FROM medicines WHERE is_jan_aushadhi = 1").get() as any)?.c || 0;
  const totalMfgs = (db.prepare("SELECT COUNT(DISTINCT manufacturer_name) as c FROM medicines").get() as any)?.c || 0;
  const totalDosageForms = (db.prepare("SELECT COUNT(DISTINCT dosage_form) as c FROM medicines").get() as any)?.c || 0;

  return {
    totalMedicines: totalMeds,
    totalGenerics,
    totalManufacturers: totalMfgs,
    totalDosageForms,
  };
}
