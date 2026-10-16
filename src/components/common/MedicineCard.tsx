"use client";

import React from "react";
import Link from "next/link";
import { Medicine } from "@/types/medicine";
import { ScheduleBadge } from "./ScheduleBadge";
import { useLanguage } from "@/context/LanguageContext";
import { useCabinet } from "@/context/CabinetContext";
import { Bookmark, BookmarkCheck, ChevronRight, Scale, ShieldCheck, Tag } from "lucide-react";

interface MedicineCardProps {
  medicine: Medicine;
  highlightGeneric?: boolean;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
  const { language, t } = useLanguage();
  const { addToCabinet, removeFromCabinet, isSaved } = useCabinet();
  const saved = isSaved(medicine.id);

  const displayName = language === "hi" && medicine.brandNameHindi
    ? medicine.brandNameHindi
    : medicine.brandName;

  const isScheduleRedLine = medicine.prescriptionCategory === "Schedule H" || medicine.prescriptionCategory === "Schedule H1";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Authentic Indian Pharmaceutical Red Line (Lal Lakir) strip indicator for Schedule H / H1 */}
      {isScheduleRedLine && (
        <div className="h-1.5 w-full bg-red-600" title="Statutory Schedule Prescription Drug" />
      )}

      {/* Generic Alternative Badge */}
      {medicine.isJanAushadhi && (
        <div className="bg-apothecary-800 px-3.5 py-1 text-white text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-apothecary-200" />
            Low-Cost Generic Alternative
          </span>
          {medicine.janAushadhiCode && (
            <span className="font-mono text-[10px] bg-apothecary-900/80 px-1.5 py-0.5 rounded text-chalk-200">
              Code: {medicine.janAushadhiCode}
            </span>
          )}
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Top Header: Brand Name, Strength, & Schedule */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              <Link href={`/medicines/${medicine.id}`}>
                {displayName}
              </Link>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {medicine.dosageForm} • {medicine.strength}
            </p>
          </div>
          <ScheduleBadge category={medicine.prescriptionCategory} productType={medicine.productType} />
        </div>

        {/* Salt Composition (Authentic Clinical Box) */}
        <div className="mb-3.5 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
            {t.medicine.activeComposition}
          </span>
          <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
            {medicine.saltComposition}
          </p>
        </div>

        {/* Manufacturer & Regulatory Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px]">
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
            {medicine.manufacturer.name}
          </span>
          {medicine.isPriceControlled && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
              <Tag className="w-3 h-3 text-amber-600" />
              NPPA Capped (₹{medicine.ceilingPrice?.toFixed(2)}/u)
            </span>
          )}
          {medicine.isNLEM && (
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md font-semibold">
              NLEM
            </span>
          )}
        </div>

        {/* Pricing & Actions Row */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900">
                ₹{medicine.pricePerUnit.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / {medicine.unitType}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              MRP: ₹{medicine.mrp.toFixed(2)} (Pack of {medicine.packSize} {medicine.packUnit})
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (saved) {
                  removeFromCabinet(medicine.id);
                } else {
                  addToCabinet(medicine);
                }
              }}
              className={`p-2 rounded-xl border transition-colors ${
                saved
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              title={saved ? t.common.savedInCabinet : t.common.addToCabinet}
              aria-label={saved ? t.common.savedInCabinet : t.common.addToCabinet}
            >
              {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <Link
              href={`/compare?ref=${medicine.id}`}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50 transition-colors"
              title={t.substitution.compareSideBySide}
            >
              <Scale className="w-4 h-4" />
            </Link>

            <Link
              href={`/medicines/${medicine.id}`}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-900 text-white hover:bg-teal-700 transition-colors"
              title={t.common.viewDetails}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
