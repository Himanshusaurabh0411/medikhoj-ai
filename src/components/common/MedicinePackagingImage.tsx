"use client";

import React, { useState } from "react";
import { Medicine } from "@/types/medicine";
import { Maximize2, ShieldCheck, Sparkles, X, Layers } from "lucide-react";

interface Props {
  medicine: Medicine;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  allowZoom?: boolean;
  priority?: boolean;
}

export function MedicinePackagingImage({
  medicine,
  className = "",
  size = "md",
  allowZoom = true
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = medicine.imageUrl || `/medicines/${medicine.id}.svg`;
  const isScheduleRedLine = medicine.prescriptionCategory === "Schedule H" || medicine.prescriptionCategory === "Schedule H1";

  const sizeClasses = {
    sm: "h-24 sm:h-28",
    md: "h-36 sm:h-44",
    lg: "h-52 sm:h-64",
    xl: "h-64 sm:h-80"
  }[size];

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-obsidian-950/5 border border-chalk-300 flex items-center justify-center transition-all ${sizeClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Real Packaging SVG Image */}
        <img
          src={imageSrc}
          alt={`Packaging photograph of ${medicine.brandName} (${medicine.saltComposition})`}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Packaging Type / Schedule Red Line Indicator */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10 pointer-events-none">
          {medicine.isJanAushadhi ? (
            <span className="bg-apothecary-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-apothecary-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-apothecary-300" />
              Generic Substitute
            </span>
          ) : (
            <span className="bg-obsidian-900/80 backdrop-blur-sm text-chalk-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-obsidian-700">
              Ref Brand
            </span>
          )}

          {isScheduleRedLine && (
            <span className="bg-surgical-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              Lal Lakir
            </span>
          )}
        </div>

        {/* Zoom Inspection Trigger */}
        {allowZoom && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="absolute bottom-2 right-2 bg-obsidian-900/80 hover:bg-obsidian-950 text-white p-1.5 rounded-lg shadow-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Inspect packaging & batch foil imprint up close"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* High-Resolution Packaging Inspection Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full border border-chalk-300 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-chalk-200 flex items-center justify-between bg-chalk-50">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                  {medicine.isJanAushadhi ? "Generic Substitute Packaging" : "Reference Brand Packaging"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-obsidian-950 mt-1">
                  {medicine.brandName}
                  {medicine.brandNameHindi && (
                    <span className="ml-2 font-normal text-sm text-slate-500 font-sans">
                      ({medicine.brandNameHindi})
                    </span>
                  )}
                </h3>
                <p className="text-xs text-obsidian-800/70 font-mono">
                  {medicine.saltComposition} • {medicine.strength} ({medicine.dosageForm})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-obsidian-900 hover:bg-chalk-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Packaging Visual */}
            <div className="relative aspect-[16/10] bg-obsidian-950 flex items-center justify-center p-2">
              <img
                src={imageSrc}
                alt={`High-resolution packaging visual for ${medicine.brandName}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Detailed packaging metadata */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-chalk-50 text-xs border-t border-chalk-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Manufacturer</span>
                <span className="font-bold text-obsidian-900 block truncate">{medicine.manufacturer.name}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Packaging Pack</span>
                <span className="font-bold text-obsidian-900 block">Pack of {medicine.packSize} {medicine.packUnit}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Retail MRP</span>
                <span className="font-black text-obsidian-950 block">₹{medicine.mrp.toFixed(2)} (₹{medicine.pricePerUnit.toFixed(2)}/{medicine.unitType})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">GTIN / Barcode</span>
                <span className="font-mono font-bold text-obsidian-800 block truncate">{medicine.gtin || medicine.barcode || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
