"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { searchMedicines, SortOption, SearchResults } from "@/lib/searchEngine";
import { PrescriptionCategory, ProductType } from "@/types/medicine";
import { MedicineCard } from "@/components/common/MedicineCard";
import {
  ArrowUpDown,
  CheckCircle,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { language, t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [dosageForm, setDosageForm] = useState<string>("ALL");
  const [prescriptionCategory, setPrescriptionCategory] = useState<PrescriptionCategory | "ALL">("ALL");
  const [productType, setProductType] = useState<ProductType | "ALL">("ALL");
  const [isJanAushadhiOnly, setIsJanAushadhiOnly] = useState(false);
  const [isPriceControlledOnly, setIsPriceControlledOnly] = useState(false);
  const [manufacturer, setManufacturer] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("price_low_high");
  const [page, setPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const [results, setResults] = useState<SearchResults>(() =>
    searchMedicines(
      {
        query: initialQuery,
        dosageForm: undefined,
        prescriptionCategory: undefined,
        productType: undefined,
        isJanAushadhiOnly: false,
        isPriceControlledOnly: false,
        manufacturer: undefined,
      },
      "price_low_high",
      1,
      12
    )
  );

  // Synchronize when query or filters change
  useEffect(() => {
    const res = searchMedicines(
      {
        query,
        dosageForm: dosageForm === "ALL" ? undefined : dosageForm,
        prescriptionCategory: prescriptionCategory === "ALL" ? undefined : prescriptionCategory,
        productType: productType === "ALL" ? undefined : productType,
        isJanAushadhiOnly,
        isPriceControlledOnly,
        manufacturer: manufacturer === "ALL" ? undefined : manufacturer,
      },
      sortBy,
      page,
      12
    );
    setResults(res);
  }, [query, dosageForm, prescriptionCategory, productType, isJanAushadhiOnly, isPriceControlledOnly, manufacturer, sortBy, page]);

  const handleResetFilters = () => {
    setQuery("");
    setDosageForm("ALL");
    setPrescriptionCategory("ALL");
    setProductType("ALL");
    setIsJanAushadhiOnly(false);
    setIsPriceControlledOnly(false);
    setManufacturer("ALL");
    setSortBy("price_low_high");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === "hi" ? "दवा खोज इंजन" : "Advanced Indian Medicine Search"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "hi"
              ? "ब्रांड नाम, सक्रिय साल्ट घटक, स्ट्रेंथ, डोज़ फॉर्म या बारकोड से खोजें।"
              : "Search by brand name, salt composition, strength, dosage form, or barcode."}
          </p>
        </div>

        {/* Input bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Stats & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-900">{results.totalCount}</span>
            <span>medicines found</span>
            {results.exactMatchesCount > 0 && (
              <span className="inline-flex items-center gap-1 text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                <CheckCircle className="w-3 h-3" />
                {results.exactMatchesCount} Exact Matches
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="text-slate-500 font-medium">
                {t.common.sortBy}:
              </label>
              <select
                id="sort-select"
                aria-label={t.common.sortBy}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-teal-500"
              >
                <option value="price_low_high">{t.common.priceLowToHigh}</option>
                <option value="price_high_low">{t.common.priceHighToLow}</option>
                <option value="brand_asc">{t.common.brandNameAsc}</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.common.filter}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Filters Sidebar */}
        <aside
          className={`md:block bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6 ${
            showFiltersMobile ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>{t.common.filter}</span>
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Toggles: Jan Aushadhi & Price Controlled */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={isJanAushadhiOnly}
                onChange={(e) => {
                  setIsJanAushadhiOnly(e.target.checked);
                  setPage(1);
                }}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>Affordable Generics Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={isPriceControlledOnly}
                onChange={(e) => {
                  setIsPriceControlledOnly(e.target.checked);
                  setPage(1);
                }}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>NPPA Price-Controlled Only</span>
            </label>
          </div>

          {/* Dosage Form Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Dosage Form
            </label>
            <select
              value={dosageForm}
              onChange={(e) => {
                setDosageForm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Forms</option>
              {results.availableDosageForms.map((df) => (
                <option key={df} value={df}>{df}</option>
              ))}
            </select>
          </div>

          {/* Prescription Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Prescription Schedule
            </label>
            <select
              value={prescriptionCategory}
              onChange={(e) => {
                setPrescriptionCategory(e.target.value as any);
                setPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Categories</option>
              <option value="OTC">Over The Counter (OTC)</option>
              <option value="Schedule H">Schedule H (Rx)</option>
              <option value="Schedule H1">Schedule H1 (Controlled Rx)</option>
              <option value="Schedule X">Schedule X</option>
            </select>
          </div>

          {/* Product Type Filter (Allopathic vs AYUSH) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Product System
            </label>
            <select
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value as any);
                setPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Systems</option>
              <option value="allopathic">Allopathic Medicines</option>
              <option value="ayush">AYUSH / Ayurvedic</option>
            </select>
          </div>

          {/* Manufacturer Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Manufacturer
            </label>
            <select
              value={manufacturer}
              onChange={(e) => {
                setManufacturer(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Manufacturers</option>
              {results.availableManufacturers.map((mfg) => (
                <option key={mfg} value={mfg}>{mfg}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Results Area */}
        <main className="md:col-span-3 space-y-6">
          {results.items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No matching medicines found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching by salt name (e.g. <em>Paracetamol</em>, <em>Amoxicillin</em>) or reset filters to explore all verified Indian medicines.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {results.items.map((item) => (
                  <MedicineCard
                    key={item.medicine.id}
                    medicine={item.medicine}
                  />
                ))}
              </div>

              {/* Pagination */}
              {results.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-medium text-slate-500 px-2">
                    Page {results.page} of {results.totalPages}
                  </span>
                  <button
                    disabled={page >= results.totalPages}
                    onClick={() => setPage((p) => Math.min(results.totalPages, p + 1))}
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading medicine search engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}
