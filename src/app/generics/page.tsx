"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";
import { findSubstitutions, calculateSavings } from "@/lib/substitutionEngine";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Percent,
  PiggyBank,
  Pill,
  Scale,
  Search,
  ShieldCheck,
  Tag
} from "lucide-react";

export default function GenericsPage() {
  const { language, t } = useLanguage();
  const [searchFilter, setSearchFilter] = useState("");

  // Select key benchmark medicines that have active substitutes
  const benchmarkIds = [
    "med-dolo-650",
    "med-augmentin-625",
    "med-azithral-500",
    "med-glycomet-500",
    "med-pantocid-40",
    "med-telma-40",
    "med-combiflam",
    "med-shelcal-500",
  ];

  const comparisons = benchmarkIds
    .map(id => {
      const benchmark = INDIAN_MEDICINES.find(m => m.id === id);
      if (!benchmark) return null;
      const subs = findSubstitutions(benchmark);
      const cheapest = subs.exactEquivalents[0];
      return {
        benchmark,
        substitute: cheapest?.medicine,
        savingsPercentage: cheapest?.savingsPercentage || 0,
        priceDifferencePerUnit: cheapest?.priceDifferencePerUnit || 0,
        exactCount: subs.exactEquivalents.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item && item.substitute));

  const filteredComparisons = comparisons.filter(item => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      item.benchmark.brandName.toLowerCase().includes(query) ||
      item.benchmark.saltComposition.toLowerCase().includes(query) ||
      item.substitute.brandName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Banner */}
      <div className="bg-obsidian-950 text-white rounded-3xl p-8 sm:p-10 border border-obsidian-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 text-saffron-400 text-xs font-semibold border border-obsidian-800">
            <ShieldCheck className="w-4 h-4 text-saffron-500" />
            <span>Independent Indian Medicine Substitute Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {language === "hi"
              ? "सत्यापित किफायती दवा विकल्प एवं जेनेरिक बचत"
              : "Affordable Medicine Substitutes & Generic Alternatives"}
          </h1>

          <p className="text-xs sm:text-sm text-chalk-300 leading-relaxed">
            Many popular branded medicines in India cost 40% to 70% more than other licensed brands with the exact same active pharmaceutical ingredients, strengths, and purity. MediKhoj is an independent search engine that helps you identify verified bio-equivalent alternatives so you can consult your doctor or pharmacist.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-chalk-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-apothecary-500"></span>
              Strict Molecular Salt & Strength Match
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-saffron-500"></span>
              Normalized Price per Tablet / Unit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cobalt-500"></span>
              Independent & Unbiased
            </span>
          </div>
        </div>
      </div>

      {/* Independence Disclaimer */}
      <div className="p-4 rounded-2xl bg-chalk-100 border border-chalk-300 flex items-start gap-3 text-xs text-obsidian-800/80">
        <AlertTriangle className="w-5 h-5 text-saffron-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Neutral Informational Notice:</strong> MediKhoj is an independent comparison platform. We do not sell medicines, nor do we endorse or operate any specific pharmacy chain or manufacturer. We simply empower consumers with transparent pricing and identical active salt information. Always consult your prescribing doctor or pharmacist before switching medications.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-obsidian-950 tracking-tight">
            Common Indian Brand vs. Affordable Substitute Pairs
          </h2>
          <p className="text-xs text-obsidian-800/70 mt-0.5">
            Showing benchmark formulations with identical active salts and their most affordable verified alternatives.
          </p>
        </div>

        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by brand or salt (e.g. Dolo, Augmentin)..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-chalk-300 text-obsidian-900 text-xs rounded-xl font-medium focus:outline-none focus:border-saffron-600 shadow-sm"
          />
        </div>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComparisons.map(({ benchmark, substitute, savingsPercentage, priceDifferencePerUnit, exactCount }) => (
          <div
            key={benchmark.id}
            className="bg-white rounded-3xl border border-chalk-300 shadow-elevated p-6 flex flex-col justify-between space-y-6 hover:border-saffron-400 transition-all"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-obsidian-700 uppercase tracking-wider bg-chalk-100 px-2 py-0.5 rounded border border-chalk-300">
                  {exactCount} Verified Bio-Equivalents Available
                </span>
                <h3 className="text-lg font-black text-obsidian-950 mt-2">
                  {benchmark.brandName}
                </h3>
                <p className="text-xs text-obsidian-800/70 font-semibold">
                  {benchmark.dosageForm} • {benchmark.strength}
                </p>
                <p className="text-xs text-obsidian-900 mt-1 font-mono font-medium">
                  {benchmark.saltComposition}
                </p>
              </div>

              {savingsPercentage > 0 && (
                <div className="bg-apothecary-50 text-apothecary-800 border border-apothecary-200 rounded-2xl p-2.5 text-center shrink-0">
                  <span className="block text-2xl font-black text-apothecary-700">
                    {savingsPercentage}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Savings
                  </span>
                </div>
              )}
            </div>

            {/* Side-by-side pricing breakdown */}
            <div className="grid grid-cols-2 gap-3 bg-chalk-50 rounded-2xl p-4 border border-chalk-200 text-xs">
              {/* Benchmark Branded Medicine */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Reference Brand ({benchmark.brandName})
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-bold text-slate-700">
                    ₹{benchmark.pricePerUnit.toFixed(2)}
                  </span>
                  <span className="text-slate-500 font-medium">/ {benchmark.unitType}</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Pack of {benchmark.packSize}: ₹{benchmark.mrp.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {benchmark.manufacturer.name}
                </span>
              </div>

              {/* Affordable Substitute Medicine */}
              <div className="border-l border-chalk-300 pl-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-apothecary-700 block">
                  Affordable Substitute ({substitute.brandName})
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-apothecary-700">
                    ₹{substitute.pricePerUnit.toFixed(2)}
                  </span>
                  <span className="text-slate-500 font-medium">/ {substitute.unitType}</span>
                </div>
                <span className="text-[11px] text-apothecary-800 block mt-0.5 font-bold">
                  Pack of {substitute.packSize}: ₹{substitute.mrp.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-600 block font-medium">
                  {substitute.manufacturer.name}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-chalk-200 text-xs">
              <span className="text-[10px] text-apothecary-700 font-mono font-bold">
                Save ₹{priceDifferencePerUnit.toFixed(2)} per {benchmark.unitType}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/compare?ref=${benchmark.id}&target=${substitute.id}`}
                  className="px-3 py-1.5 rounded-xl border border-chalk-300 text-obsidian-800 font-bold hover:bg-chalk-100 text-xs"
                >
                  Compare
                </Link>
                <Link
                  href={`/medicines/${benchmark.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-obsidian-900 hover:bg-apothecary-800 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  View All Alternatives
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
