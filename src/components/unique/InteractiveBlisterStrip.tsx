"use client";

import React, { useState } from "react";
import { Medicine } from "@/types/medicine";
import { Pill, Sparkles, RefreshCw, ShieldAlert, CheckCircle2, Info } from "lucide-react";

interface InteractiveBlisterStripProps {
  medicine: Medicine;
}

export function InteractiveBlisterStrip({ medicine }: InteractiveBlisterStripProps) {
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [activePocketIndex, setActivePocketIndex] = useState<number | null>(null);

  // Render a realistic 10 or 15 pocket blister layout
  const pocketCount = Math.min(medicine.packSize || 10, 15);
  const pockets = Array.from({ length: pocketCount }, (_, i) => i + 1);

  const isScheduleRed = medicine.prescriptionCategory === "Schedule H" || medicine.prescriptionCategory === "Schedule H1";

  return (
    <div className="bg-gradient-to-b from-chalk-100 to-chalk-200 p-6 sm:p-8 rounded-3xl border border-chalk-300 shadow-elevated space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian-900 text-chalk-100 text-[10px] font-mono uppercase tracking-wider font-semibold">
            <span>Physical Blister Strip Inspector (3D View)</span>
          </div>
          <h3 className="text-base font-black text-obsidian-900 tracking-tight mt-1">
            {medicine.brandName} Packaging Architecture
          </h3>
          <p className="text-xs text-obsidian-800/70">
            Interactive physical simulation of the actual Indian pharmacy blister foil. Tap pockets to inspect tablet payload.
          </p>
        </div>

        {/* Flip toggle */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-chalk-300 shadow-sm shrink-0">
          <button
            onClick={() => setViewSide("front")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewSide === "front"
                ? "bg-obsidian-900 text-white shadow-sm"
                : "text-obsidian-800/70 hover:text-obsidian-900"
            }`}
          >
            Foil Print (Front)
          </button>
          <button
            onClick={() => setViewSide("back")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewSide === "back"
                ? "bg-obsidian-900 text-white shadow-sm"
                : "text-obsidian-800/70 hover:text-obsidian-900"
            }`}
          >
            Blister Pockets (Back)
          </button>
        </div>
      </div>

      {/* The Physical Strip Canvas */}
      <div className="relative max-w-xl mx-auto">
        <div
          className={`relative rounded-2xl transition-all duration-300 overflow-hidden border-2 select-none ${
            viewSide === "front"
              ? "bg-gradient-to-br from-slate-200 via-slate-100 to-zinc-300 border-slate-300 shadow-xl"
              : "bg-gradient-to-b from-amber-50/80 via-white to-amber-50/60 border-amber-200/80 shadow-inner"
          } p-6 sm:p-7 min-h-[220px] flex flex-col justify-between`}
        >
          {/* Subtle aluminum brushed metallic texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          {/* Statutory Red Line (Lal Lakir) Mandated on Indian strips */}
          {isScheduleRed && viewSide === "front" && (
            <div className="absolute top-0 bottom-0 right-12 w-2.5 bg-surgical-600 shadow-sm flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[7px] text-white font-black uppercase tracking-widest -rotate-90 whitespace-nowrap">
                SCHEDULE {medicine.prescriptionCategory.toUpperCase()} PRESCRIPTION DRUG
              </span>
            </div>
          )}

          {/* Jan Aushadhi Government Tricolor Stripe */}
          {medicine.isJanAushadhi && viewSide === "front" && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron-600 via-white to-apothecary-600" />
          )}

          {/* FRONT VIEW: Print text, manufacturer, batch imprint, composition */}
          {viewSide === "front" ? (
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-wider font-extrabold text-obsidian-800 uppercase">
                    {medicine.manufacturer.name.toUpperCase()} • INDIA
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-obsidian-950 tracking-tight mt-0.5">
                    {medicine.brandName.toUpperCase()}
                  </h4>
                  <div className="text-xs font-bold text-obsidian-900 mt-0.5">
                    {medicine.dosageForm.toUpperCase()} ({medicine.strength})
                  </div>
                </div>

                <div className="text-right font-mono text-[9px] text-obsidian-800 bg-white/70 px-2.5 py-1 rounded-md border border-slate-300/80">
                  <div>B.No.: <span className="font-bold">DL24B01</span></div>
                  <div>M.D.: <span className="font-bold">01/2024</span></div>
                  <div>EXP.: <span className="font-bold text-surgical-600">12/2026</span></div>
                </div>
              </div>

              {/* Composition print */}
              <div className="text-[11px] text-obsidian-900 bg-white/60 p-2.5 rounded-lg border border-slate-300/60 font-mono leading-relaxed max-w-sm">
                <span className="font-bold block text-[10px] uppercase text-obsidian-800">Composition:</span>
                Each uncoated tablet contains: <br />
                <span className="font-bold">{medicine.saltComposition}</span>
              </div>

              {/* Dosage instruction & schedule box */}
              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-300/60 text-obsidian-800">
                <span>Dosage: As directed by the Physician.</span>
                <span className="font-mono font-bold">MRP ₹{medicine.mrp.toFixed(2)} / {medicine.packSize} TABS</span>
              </div>
            </div>
          ) : (
            /* BACK VIEW: Blister Pockets and Pills */
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-xs text-obsidian-800 font-bold border-b border-amber-200/80 pb-2">
                <span>Blister Pocket Cavities ({pocketCount} Units)</span>
                <span className="text-[11px] font-mono text-saffron-700">Tap a pocket to inspect</span>
              </div>

              {/* Grid of tablet pockets */}
              <div className="grid grid-cols-5 gap-3 py-2">
                {pockets.map((num) => {
                  const isSelected = activePocketIndex === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setActivePocketIndex(isSelected ? null : num)}
                      className={`relative aspect-square rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-saffron-100 ring-2 ring-saffron-600 scale-105 shadow-md"
                          : "bg-gradient-to-br from-white to-slate-100 border border-slate-200 shadow-sm hover:border-saffron-400"
                      }`}
                    >
                      {/* Pill 3D shape */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[9px] font-bold ${
                          isSelected
                            ? "bg-saffron-600 text-white shadow-inner"
                            : "bg-white text-slate-500 border border-slate-300 shadow-sm"
                        }`}
                      >
                        {num}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-obsidian-800/80 text-center font-medium">
                Pill pocket seal: Aluminium-PVC thermoformed cavity with moisture-vapor barrier.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pocket Detail Inspector (when a pocket is tapped) */}
      {activePocketIndex !== null && (
        <div className="bg-white rounded-2xl border border-saffron-300 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded">
                Unit #{activePocketIndex} Analyzed
              </span>
              <span className="text-xs font-bold text-obsidian-900">
                {medicine.strength} {medicine.dosageForm}
              </span>
            </div>
            <p className="text-xs text-obsidian-800">
              Active Salt: <strong>{medicine.saltComposition}</strong> (Pharmacopoeia IP Grade).
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-base font-black text-obsidian-900">
              ₹{medicine.pricePerUnit.toFixed(2)}
              <span className="text-[11px] font-normal text-slate-500"> / unit</span>
            </div>
            <span className="text-[10px] text-apothecary-700 font-bold block">
              Bioavailability: Optimal Oral Absorption
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
