"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";
import { Medicine } from "@/types/medicine";
import { areMedicinesStrictlyEquivalent, calculateSavings } from "@/lib/substitutionEngine";
import { ScheduleBadge } from "@/components/common/ScheduleBadge";
import { MedicinePackagingImage } from "@/components/common/MedicinePackagingImage";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Plus,
  Scale,
  ShieldCheck,
  Tag,
  X
} from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref");
  const targetId = searchParams.get("target");

  const { language, t } = useLanguage();

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const list: string[] = [];
    if (refId) list.push(refId);
    if (targetId && !list.includes(targetId)) list.push(targetId);
    if (list.length === 0) {
      list.push("med-dolo-650", "med-janaushadhi-paracetamol-650");
    }
    return list;
  });

  const [searchPicker, setSearchPicker] = useState("");

  const selectedMedicines = selectedIds
    .map(id => INDIAN_MEDICINES.find(m => m.id === id))
    .filter(Boolean) as Medicine[];

  const handleAddMedicine = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
    setSearchPicker("");
  };

  const handleRemoveMedicine = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const referenceMed = selectedMedicines[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            <span>Strict Equivalence Analysis Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === "hi" ? "दवा मूल्य और साल्ट तुलना" : "Side-by-Side Medicine Comparison"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Compare active ingredients, unit prices (per tablet/capsule), manufacturer, and NPPA price control ceilings for up to 4 medicines simultaneously.
          </p>
        </div>

        {/* Add medicine picker */}
        {selectedMedicines.length < 4 && (
          <div className="relative min-w-[260px]">
            <select
              aria-label="Add medicine to compare"
              value=""
              onChange={(e) => {
                if (e.target.value) handleAddMedicine(e.target.value);
              }}
              className="w-full bg-slate-900 text-white text-xs font-semibold rounded-xl px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            >
              <option value="">+ Add Medicine to Compare</option>
              {INDIAN_MEDICINES.filter(m => !selectedIds.includes(m.id)).map(m => (
                <option key={m.id} value={m.id}>
                  {m.brandName} ({m.dosageForm} - ₹{m.pricePerUnit.toFixed(2)}/u)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      {selectedMedicines.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          No medicines selected for comparison. Please add at least one medicine.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">
                  Attributes
                </th>
                {selectedMedicines.map((med, idx) => (
                  <th key={med.id} className="p-4 sm:p-5 text-sm font-bold text-slate-900 relative">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                        {idx === 0 ? "Reference Product" : `Alternative #${idx}`}
                      </span>
                      {selectedMedicines.length > 1 && (
                        <button
                          onClick={() => handleRemoveMedicine(med.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-surgical-600 hover:bg-slate-100 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Packaging Thumbnail */}
                    <MedicinePackagingImage medicine={med} size="sm" className="mb-2" />

                    <Link href={`/medicines/${med.id}`} className="hover:text-saffron-700 text-base font-black block transition-colors">
                      {med.brandName}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Unit Price (Normalized) */}
              <tr className="bg-teal-50/40">
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Price per Unit (Normalized)
                </td>
                {selectedMedicines.map((med, idx) => {
                  const isRef = idx === 0;
                  const savings = !isRef && referenceMed ? calculateSavings(referenceMed.pricePerUnit, med.pricePerUnit) : null;
                  return (
                    <td key={med.id} className="p-4 sm:p-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">
                          ₹{med.pricePerUnit.toFixed(2)}
                        </span>
                        <span className="text-slate-500 font-semibold">
                          / {med.unitType}
                        </span>
                      </div>
                      {savings && savings.isCheaper && (
                        <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          Save {savings.savingsPercentage}% (₹{savings.priceDifference} / {med.unitType})
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Strict Equivalence Verification */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Bio-Equivalence Status
                </td>
                {selectedMedicines.map((med, idx) => {
                  if (idx === 0) {
                    return (
                      <td key={med.id} className="p-4 sm:p-5 text-slate-500 font-medium">
                        Reference Baseline
                      </td>
                    );
                  }
                  const isEquivalent = referenceMed ? areMedicinesStrictlyEquivalent(referenceMed, med) : false;
                  return (
                    <td key={med.id} className="p-4 sm:p-5">
                      {isEquivalent ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Strict Equivalent Candidate
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Formulation / Molecule Mismatch
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Active Salt Composition */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Active Salt Composition
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5 font-medium text-slate-800">
                    {med.saltComposition}
                  </td>
                ))}
              </tr>

              {/* Dosage Form & Strength */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Form & Strength
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5 text-slate-700">
                    {med.dosageForm} ({med.strength})
                  </td>
                ))}
              </tr>

              {/* Pack Size & MRP */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Pack Size & MRP
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5 text-slate-700">
                    ₹{med.mrp.toFixed(2)} ({med.packSize} {med.packUnit})
                  </td>
                ))}
              </tr>

              {/* Prescription Category */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Prescription Category
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5">
                    <ScheduleBadge category={med.prescriptionCategory} productType={med.productType} />
                  </td>
                ))}
              </tr>

              {/* Generic Formulation Classification */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Affordable Generic Formulation
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5">
                    {med.isJanAushadhi ? (
                      <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Yes ({med.janAushadhiCode})
                      </span>
                    ) : (
                      <span className="text-slate-400">No (Branded Formulation)</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* NPPA Ceiling Price Control */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  NPPA Ceiling Status
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5">
                    {med.isPriceControlled ? (
                      <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Capped: ₹{med.ceilingPrice?.toFixed(2)}/u ({med.nppaNotificationRef?.split(" ")[0]})
                      </span>
                    ) : (
                      <span className="text-slate-400">Not under direct DPCO ceiling</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Manufacturer */}
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-700">
                  Manufacturer
                </td>
                {selectedMedicines.map((med) => (
                  <td key={med.id} className="p-4 sm:p-5 text-slate-600 font-medium">
                    {med.manufacturer.name} ({med.manufacturer.originCountry})
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading comparison workspace...</div>}>
      <CompareContent />
    </Suspense>
  );
}
