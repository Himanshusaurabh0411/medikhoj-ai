"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";
import { Medicine, ProductType } from "@/types/medicine";
import { MedicinePackagingImage } from "@/components/common/MedicinePackagingImage";
import { ScheduleBadge } from "@/components/common/ScheduleBadge";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Tag,
  ArrowRight,
  Pill,
  Sparkles,
  Layers,
  CheckCircle2,
  Filter
} from "lucide-react";

export default function MedicinesDirectoryPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All Formulations", count: INDIAN_MEDICINES.length },
    { id: "Analgesic", label: "Fever & Pain Relief", query: "Analgesic" },
    { id: "Antibiotic", label: "Antibiotics (Rx)", query: "Antibiotic" },
    { id: "Gastroenterology", label: "Acidity, GERD & PPI", query: "Gastro" },
    { id: "Cardiovascular", label: "Heart & Hypertension", query: "Cardio" },
    { id: "Anti-Diabetic", label: "Diabetes & Glycemic", query: "Diabetic" },
    { id: "Respiratory", label: "Respiratory & Asthma", query: "Respiratory" },
    { id: "Nutritional", label: "Vitamins & Calcium", query: "Nutritional" },
    { id: "AYUSH", label: "AYUSH & Herbal", query: "AYUSH" },
    { id: "GENERIC", label: "PMBJP Generics Only", query: "Generic" }
  ];

  const filteredMedicines = useMemo(() => {
    return INDIAN_MEDICINES.filter((med) => {
      // 1. Category Filter
      if (selectedCategory === "GENERIC" && !med.isJanAushadhi) {
        return false;
      }
      if (selectedCategory === "AYUSH" && med.productType.toLowerCase() !== "ayush") {
        return false;
      }
      if (
        selectedCategory !== "ALL" &&
        selectedCategory !== "GENERIC" &&
        selectedCategory !== "AYUSH" &&
        !med.therapeuticClass.toLowerCase().includes(selectedCategory.toLowerCase())
      ) {
        return false;
      }

      // 2. Product Type Filter (Allopathic vs AYUSH)
      if (selectedType === "allopathic" && med.productType.toLowerCase() !== "allopathic") return false;
      if (selectedType === "ayush" && med.productType.toLowerCase() !== "ayush") return false;

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const brand = med.brandName.toLowerCase();
        const hindi = (med.brandNameHindi || "").toLowerCase();
        const salt = med.saltComposition.toLowerCase();
        const generic = med.genericName.toLowerCase();
        const mfg = med.manufacturer.name.toLowerCase();

        return (
          brand.includes(q) ||
          hindi.includes(q) ||
          salt.includes(q) ||
          generic.includes(q) ||
          mfg.includes(q)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-chalk-300 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apothecary-50 text-apothecary-800 text-xs font-semibold border border-apothecary-200">
          <Layers className="w-3.5 h-3.5 text-apothecary-700" />
          <span>Complete Visual Pharmaceutical Catalog (100% Verified)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-obsidian-950 tracking-tight">
          All Indian Medicines & Authentic Packaging Visuals
        </h1>

        <p className="text-xs sm:text-sm text-obsidian-800/70 max-w-3xl leading-relaxed">
          Browse all cataloged Indian pharmaceutical medicines, aerosol inhalers, Ayurvedic bottles, and government Jan Aushadhi generic equivalents. Every single medicine features authentic blister strip geometry, foil texture, and dosage specifications.
        </p>

        {/* Live Filter & Search Controls */}
        <div className="pt-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name, salt composition, strength, or manufacturer..."
              className="w-full pl-11 pr-4 py-3 bg-chalk-50 border border-chalk-300 rounded-2xl text-xs sm:text-sm text-obsidian-900 focus:outline-none focus:border-saffron-600 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-obsidian-900 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-chalk-50 border border-chalk-300 rounded-2xl px-4 py-3 text-xs font-bold text-obsidian-900 focus:outline-none"
            >
              <option value="ALL">All Types (Allopathic + AYUSH)</option>
              <option value="allopathic">Allopathic Only</option>
              <option value="ayush">AYUSH / Herbal Only</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-obsidian-950 text-white shadow-sm"
                    : "bg-chalk-100 hover:bg-chalk-200 text-obsidian-800 border border-chalk-200"
                }`}
              >
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white text-slate-600"}`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>
          Showing <strong>{filteredMedicines.length}</strong> of <strong>{INDIAN_MEDICINES.length}</strong> cataloged Indian medicines with packaging visuals
        </span>
        <span className="text-[11px] font-mono">
          Click any card or zoom icon to inspect packaging details & foil batch imprint
        </span>
      </div>

      {/* Complete Visual Packaging Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => {
            const isScheduleRedLine =
              medicine.prescriptionCategory === "Schedule H" ||
              medicine.prescriptionCategory === "Schedule H1";

            return (
              <div
                key={medicine.id}
                className="group bg-white rounded-3xl border border-chalk-300 overflow-hidden shadow-sm hover:shadow-xl hover:border-saffron-400 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Red Line indicator */}
                {isScheduleRedLine && (
                  <div className="h-1.5 w-full bg-red-600" title="Schedule H / H1 Red Line Prescription Drug" />
                )}

                <div className="p-4 space-y-3.5 flex-1 flex flex-col">
                  {/* High-Fidelity Medicine Packaging Visual */}
                  <MedicinePackagingImage
                    medicine={medicine}
                    size="sm"
                    className="w-full"
                    allowZoom={true}
                  />

                  {/* Header info */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-black text-base text-obsidian-950 group-hover:text-saffron-700 transition-colors line-clamp-1">
                        <Link href={`/medicines/${medicine.id}`}>
                          {medicine.brandName}
                        </Link>
                      </h3>
                      <ScheduleBadge category={medicine.prescriptionCategory} productType={medicine.productType} />
                    </div>

                    {medicine.brandNameHindi && (
                      <span className="text-xs text-slate-500 font-sans block -mt-0.5 mb-1">
                        {medicine.brandNameHindi}
                      </span>
                    )}

                    <span className="text-[11px] text-obsidian-800/70 font-medium block">
                      {medicine.dosageForm} • {medicine.strength}
                    </span>
                  </div>

                  {/* Salt Composition */}
                  <div className="bg-chalk-50 rounded-xl p-2.5 border border-chalk-200">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                      Active Salt Composition
                    </span>
                    <p className="text-[11px] font-mono font-medium text-obsidian-900 line-clamp-2 leading-snug">
                      {medicine.saltComposition}
                    </p>
                  </div>

                  {/* Manufacturer & Generic Badge */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="bg-chalk-100 text-obsidian-800 px-2 py-0.5 rounded font-medium truncate max-w-[170px]">
                      {medicine.manufacturer.name}
                    </span>
                    {medicine.isJanAushadhi && (
                      <span className="bg-apothecary-800 text-white font-bold px-1.5 py-0.5 rounded">
                        Generic
                      </span>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto pt-3 border-t border-chalk-200 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-obsidian-950">
                        ₹{medicine.mrp.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal ml-1">
                        (₹{medicine.pricePerUnit.toFixed(2)}/{medicine.unitType})
                      </span>
                    </div>

                    <Link
                      href={`/medicines/${medicine.id}`}
                      className="text-xs font-bold text-saffron-700 hover:text-saffron-800 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-chalk-300 p-12 text-center space-y-3">
          <Pill className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-obsidian-900">
            No medicines match the selected filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching with a different keyword or click below to reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedType("ALL");
            }}
            className="bg-obsidian-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
