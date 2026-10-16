"use client";

import React from "react";
import { PrescriptionCategory, ProductType } from "@/types/medicine";
import { AlertCircle, AlertOctagon, CheckCircle2, Leaf, ShieldAlert } from "lucide-react";

interface ScheduleBadgeProps {
  category: PrescriptionCategory;
  productType?: ProductType;
  showDetails?: boolean;
}

export function ScheduleBadge({ category, productType, showDetails = false }: ScheduleBadgeProps) {
  if (productType === "ayush") {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
        <span>AYUSH / Ayurvedic</span>
      </div>
    );
  }

  switch (category) {
    case "Schedule H1":
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-300">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-700" />
          <span>Schedule H1 (Rx Mandatory)</span>
          {showDetails && (
            <span className="hidden sm:inline text-[11px] font-normal text-rose-700">
              - Retail sale only on registered prescription
            </span>
          )}
        </div>
      );

    case "Schedule H":
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>Schedule H (Doctor Rx Only)</span>
        </div>
      );

    case "Schedule X":
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-sm">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Schedule X (Strictly Controlled)</span>
        </div>
      );

    case "OTC":
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Over The Counter (OTC)</span>
        </div>
      );

    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-normal bg-slate-100 text-slate-600 border border-slate-200">
          <span>Prescription status not verified</span>
        </div>
      );
  }
}
