"use client";

import React from "react";
import { Medicine } from "@/types/medicine";
import { AlertTriangle, CheckCircle2, ShieldCheck, Tag } from "lucide-react";

interface PriceCeilingGaugeProps {
  medicine: Medicine;
}

export function PriceCeilingGauge({ medicine }: PriceCeilingGaugeProps) {
  const ceiling = medicine.ceilingPrice || 0;
  const unitPrice = medicine.pricePerUnit || 0;

  if (!medicine.isPriceControlled || !ceiling) {
    return (
      <div className="p-4 rounded-2xl bg-chalk-100 border border-chalk-200 text-xs text-obsidian-800/80 space-y-1">
        <div className="flex items-center gap-2 font-bold text-obsidian-900">
          <Tag className="w-4 h-4 text-slate-500" />
          <span>Non-Scheduled Formulation</span>
        </div>
        <p className="text-[11px] text-obsidian-800/70">
          This formulation is currently not under direct National List of Essential Medicines (NLEM) price ceiling cap. Price is determined by manufacturer market MRP.
        </p>
      </div>
    );
  }

  // Calculate percentage of ceiling used
  const percentOfCeiling = Math.round((unitPrice / ceiling) * 100);
  const isAtOrAbove = unitPrice >= ceiling;

  return (
    <div className="bg-white rounded-3xl border border-chalk-300 p-5 space-y-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-saffron-800 bg-saffron-100 px-2 py-0.5 rounded">
            NPPA DPCO Regulatory Price Meter
          </span>
          <h4 className="font-bold text-sm text-obsidian-900 mt-1">
            Government Price Ceiling Compliance
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-obsidian-900 bg-chalk-100 px-2.5 py-1 rounded-lg border border-chalk-200">
          Gazette Cap: ₹{ceiling.toFixed(2)} / unit
        </span>
      </div>

      {/* Visual Linear Gauge Meter */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-obsidian-800">
          <span>₹0.00 (Base)</span>
          <span className="font-bold text-saffron-700">Ceiling Cap: ₹{ceiling.toFixed(2)}</span>
          <span>Max Allowed</span>
        </div>

        {/* Progress Track */}
        <div className="relative h-4 w-full bg-chalk-200 rounded-full overflow-hidden p-0.5 border border-chalk-300">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isAtOrAbove ? "bg-surgical-600" : "bg-gradient-to-r from-apothecary-500 to-saffron-500"
            }`}
            style={{ width: `${Math.min(percentOfCeiling, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 pt-0.5 font-medium">
          <span>Generic Substitute Zone (₹0.50 - ₹1.50)</span>
          <span>Brand MRP: ₹{unitPrice.toFixed(2)} / unit ({percentOfCeiling}% of cap)</span>
        </div>
      </div>

      {/* Explanatory notes */}
      <div className="text-xs text-obsidian-800/80 bg-chalk-50 p-3 rounded-xl border border-chalk-200 leading-relaxed">
        <strong>Regulatory Cross-Check:</strong> Under Drug Price Control Order (DPCO), manufacturers are legally prohibited from exceeding ₹{ceiling.toFixed(2)} per unit plus applicable local GST.
      </div>
    </div>
  );
}
