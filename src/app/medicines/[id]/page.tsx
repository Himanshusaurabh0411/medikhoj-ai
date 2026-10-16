"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getMedicineById } from "@/lib/searchEngine";
import { findSubstitutions } from "@/lib/substitutionEngine";
import { useLanguage } from "@/context/LanguageContext";
import { useCabinet } from "@/context/CabinetContext";
import { ScheduleBadge } from "@/components/common/ScheduleBadge";
import { InteractiveBlisterStrip } from "@/components/unique/InteractiveBlisterStrip";
import { PriceCeilingGauge } from "@/components/unique/PriceCeilingGauge";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ExternalLink,
  Flame,
  Info,
  Package,
  Pill,
  Scale,
  ShieldCheck,
  Sparkles,
  Tag,
  Thermometer,
  Zap
} from "lucide-react";

export default function MedicineDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const medicine = getMedicineById(id);

  const { language, t } = useLanguage();
  const { addToCabinet, removeFromCabinet, isSaved } = useCabinet();
  const [activeTab, setActiveTab] = useState<"overview" | "warnings" | "interactions" | "storage" | "sources">("overview");

  if (!medicine) {
    notFound();
  }

  const saved = isSaved(medicine.id);
  const substitutions = findSubstitutions(medicine);

  const displayName = language === "hi" && medicine.brandNameHindi
    ? medicine.brandNameHindi
    : medicine.brandName;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-obsidian-800/70 hover:text-obsidian-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Medicine Index</span>
        </Link>
      </div>

      {/* Main Medicine Card Header */}
      <div className="bg-white rounded-3xl border border-chalk-300 p-6 sm:p-8 shadow-elevated">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-chalk-200">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <ScheduleBadge category={medicine.prescriptionCategory} productType={medicine.productType} showDetails />
              {medicine.isPriceControlled && (
                <span className="inline-flex items-center gap-1 bg-saffron-50 text-saffron-800 border border-saffron-200 text-xs px-2.5 py-0.5 rounded-md font-bold">
                  <Tag className="w-3.5 h-3.5 text-saffron-600" />
                  NPPA Ceiling: ₹{medicine.ceilingPrice?.toFixed(2)} / unit
                </span>
              )}
              {medicine.isJanAushadhi && (
                <span className="inline-flex items-center gap-1 bg-apothecary-50 text-apothecary-800 border border-apothecary-200 text-xs px-2.5 py-0.5 rounded-md font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-apothecary-600" />
                  PMBJP Generic
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-obsidian-950 tracking-tight">
                {displayName}
              </h1>
              <p className="text-sm text-obsidian-800/70 mt-1 font-semibold">
                {medicine.dosageForm} • {medicine.strength} • Route: {medicine.routeOfAdministration}
              </p>
            </div>

            <div className="bg-chalk-100 border border-chalk-300 rounded-xl p-3 inline-block">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-obsidian-800/60 block mb-0.5">
                Active Salt Composition (Pharmacopoeia IP)
              </span>
              <span className="text-sm font-bold text-obsidian-900">
                {medicine.saltComposition}
              </span>
            </div>
          </div>

          {/* Pricing Column */}
          <div className="bg-chalk-50 border border-chalk-300 rounded-2xl p-5 flex flex-col justify-between min-w-[260px] space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-obsidian-800/60 block">
                Normalized Unit Price
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-obsidian-950">
                  ₹{medicine.pricePerUnit.toFixed(2)}
                </span>
                <span className="text-xs text-obsidian-800/70 font-bold">
                  / {medicine.unitType}
                </span>
              </div>
              <p className="text-xs text-obsidian-800/70 mt-1 font-medium">
                Pack MRP: ₹{medicine.mrp.toFixed(2)} ({medicine.packSize} {medicine.packUnit})
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-chalk-200">
              <button
                onClick={() => {
                  if (saved) {
                    removeFromCabinet(medicine.id);
                  } else {
                    addToCabinet(medicine);
                  }
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  saved
                    ? "bg-apothecary-100 border border-apothecary-300 text-apothecary-900"
                    : "bg-white border border-chalk-300 text-obsidian-800 hover:bg-chalk-100"
                }`}
              >
                {saved ? <BookmarkCheck className="w-4 h-4 text-apothecary-700" /> : <Bookmark className="w-4 h-4" />}
                <span>{saved ? t.common.savedInCabinet : t.common.addToCabinet}</span>
              </button>

              <Link
                href={`/compare?ref=${medicine.id}`}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-obsidian-900 hover:bg-apothecary-800 text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Scale className="w-4 h-4" />
                <span>{t.substitution.compareSideBySide}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Unique Feature #1: Physical Blister Strip Simulator */}
        <div className="mt-8">
          <InteractiveBlisterStrip medicine={medicine} />
        </div>

        {/* Unique Feature #2: NPPA DPCO Price Ceiling Meter */}
        <div className="mt-6">
          <PriceCeilingGauge medicine={medicine} />
        </div>

        {/* Schedule H / H1 Statutory Warning */}
        {(medicine.prescriptionCategory === "Schedule H" || medicine.prescriptionCategory === "Schedule H1") && (
          <div className="mt-6 p-4 rounded-2xl bg-surgical-50 border border-surgical-500/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-surgical-600 shrink-0 mt-0.5" />
            <div className="text-xs text-surgical-700 leading-relaxed">
              <strong>Statutory Prescription Drug Warning ({medicine.prescriptionCategory}):</strong>
              <p className="mt-0.5 text-surgical-700">
                WARNING: To be sold by retail on the prescription of a Registered Medical Practitioner only. Indiscriminate self-administration carries risk of toxicity or antibiotic resistance.
              </p>
            </div>
          </div>
        )}

        {/* Tab navigation */}
        <div className="mt-8 border-b border-chalk-200 flex overflow-x-auto gap-6 text-xs font-bold">
          {[
            { key: "overview", label: "Approved Indications" },
            { key: "warnings", label: "Clinical Warnings & Contraindications" },
            { key: "interactions", label: "Drug Interactions" },
            { key: "storage", label: "Storage Guidelines" },
            { key: "sources", label: "Regulatory Provenance" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-obsidian-900 text-obsidian-950 font-black"
                  : "border-transparent text-obsidian-800/60 hover:text-obsidian-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === "overview" && (
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-bold text-obsidian-900 text-sm mb-2 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-apothecary-700" />
                  <span>Approved Clinical Indications & Uses</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(language === "hi" ? medicine.indications.hi : medicine.indications.en).map((ind, i) => (
                    <li key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-chalk-100 border border-chalk-200 text-obsidian-900 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-apothecary-600 shrink-0" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-obsidian-900 text-sm mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-apothecary-700" />
                  <span>Manufacturer & Origin</span>
                </h3>
                <div className="p-4 rounded-xl bg-chalk-100 border border-chalk-200 text-xs space-y-1 text-obsidian-900">
                  <p><strong>Manufacturer:</strong> {medicine.manufacturer.name}</p>
                  <p><strong>Origin Country:</strong> {medicine.manufacturer.originCountry}</p>
                  {medicine.manufacturer.licenseNo && (
                    <p><strong>Manufacturing License No:</strong> <span className="font-mono">{medicine.manufacturer.licenseNo}</span></p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "warnings" && (
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-bold text-saffron-800 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Clinical Warnings & Precautions</span>
                </h3>
                <ul className="space-y-2 text-xs">
                  {(language === "hi" ? medicine.warnings.hi : medicine.warnings.en).map((warn, i) => (
                    <li key={i} className="p-3 rounded-xl bg-saffron-50 border border-saffron-200 text-saffron-900 font-medium">
                      • {warn}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-surgical-700 text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Absolute Contraindications (When NOT to take)</span>
                </h3>
                <ul className="space-y-2 text-xs">
                  {(language === "hi" ? medicine.contraindications.hi : medicine.contraindications.en).map((c, i) => (
                    <li key={i} className="p-3 rounded-xl bg-surgical-50 border border-surgical-200 text-surgical-700 font-medium">
                      • {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "interactions" && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-obsidian-900 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-saffron-600" />
                <span>Known Drug Interactions</span>
              </h3>
              <ul className="space-y-2">
                {(language === "hi" ? medicine.interactions.hi : medicine.interactions.en).map((inter, i) => (
                  <li key={i} className="p-3 rounded-xl bg-chalk-100 border border-chalk-200 text-obsidian-900 font-medium">
                    • {inter}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "storage" && (
            <div className="space-y-4 text-xs text-obsidian-900">
              <div className="p-4 rounded-xl bg-chalk-100 border border-chalk-200 space-y-2">
                <h4 className="font-bold text-obsidian-950 flex items-center gap-1.5 text-sm">
                  <Thermometer className="w-4 h-4 text-apothecary-700" />
                  <span>Storage Guidelines</span>
                </h4>
                <p className="leading-relaxed">
                  {language === "hi" ? medicine.storageInfo.hi : medicine.storageInfo.en}
                </p>
              </div>
            </div>
          )}

          {activeTab === "sources" && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-obsidian-900 text-sm">Regulatory Sources & Audit Provenance</h4>
              <div className="space-y-2">
                {medicine.sources.map((src, i) => (
                  <div key={i} className="p-3 rounded-xl bg-chalk-100 border border-chalk-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-obsidian-900 block">{src.sourceName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">Audited: {src.lastUpdated}</span>
                    </div>
                    <span className="bg-apothecary-100 text-apothecary-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      {src.confidence}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Affordable Bio-Equivalent Substitution Highlight */}
      {substitutions.janAushadhiHighlight && (
        <div className="bg-gradient-to-r from-apothecary-900 to-obsidian-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apothecary-800 text-apothecary-200 text-xs font-bold font-mono">
              <span>Verified Bio-Equivalent Substitute</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {substitutions.janAushadhiHighlight.medicine.brandName}
            </h3>
            <p className="text-xs text-chalk-200 max-w-xl">
              Identical active salt: <em>{substitutions.janAushadhiHighlight.medicine.saltComposition}</em>. Save up to {substitutions.janAushadhiHighlight.savingsPercentage}% per {substitutions.janAushadhiHighlight.medicine.unitType}.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-3xl font-black text-saffron-400">
              ₹{substitutions.janAushadhiHighlight.medicine.pricePerUnit.toFixed(2)}
              <span className="text-xs font-normal text-chalk-200"> / {substitutions.janAushadhiHighlight.medicine.unitType}</span>
            </div>
            <p className="text-xs text-chalk-200 mt-1 font-bold">
              Save ~{substitutions.janAushadhiHighlight.savingsPercentage}% vs {medicine.brandName}
            </p>
            <Link
              href={`/medicines/${substitutions.janAushadhiHighlight.medicine.id}`}
              className="mt-3 inline-block bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
            >
              View Substitute Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
