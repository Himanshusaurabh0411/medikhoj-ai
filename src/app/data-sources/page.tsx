"use client";

import React, { useState } from "react";
import { DataImporter, ImportRunResult } from "@/lib/importers/dataImporter";
import { NPPA_CEILING_RECORDS } from "@/data/nppaPriceCeilings";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCheck,
  Play,
  RotateCcw,
  ShieldCheck,
  Tag
} from "lucide-react";

export default function DataSourcesPage() {
  const { language } = useLanguage();
  const [selectedSource, setSelectedSource] = useState<"nppa" | "kaggle">("nppa");
  const [isDryRun, setIsDryRun] = useState(true);
  const [importResult, setImportResult] = useState<ImportRunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleExecuteImport = () => {
    setIsRunning(true);
    setTimeout(() => {
      const records = selectedSource === "nppa"
        ? DataImporter.getSampleNppaBatch()
        : DataImporter.getSampleKaggleBatch();

      const result = DataImporter.runImport(
        selectedSource.toUpperCase(),
        records,
        { dryRun: isDryRun }
      );
      setImportResult(result);
      setIsRunning(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold">
          <Database className="w-3.5 h-3.5 text-indigo-600" />
          <span>Indian Pharmaceutical Data Pipeline & Provenance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Authoritative Data Sources & Importers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          MediKhoj AI enforces strict data provenance. Secondary datasets (e.g. Kaggle) are never confused with official regulatory approval or Gazette price control ceilings.
        </p>
      </div>

      {/* Authoritative Primary Repositories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Statutory Pricing
            </span>
            <span className="text-[10px] text-slate-400">MoCF, GOI</span>
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            NPPA & DPCO 2013/2023
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            National Pharmaceutical Pricing Authority Gazette orders defining unit price ceilings for essential medicines under price control.
          </p>
          <a
            href="https://www.nppaindia.nic.in"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-teal-700 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            <span>Visit NPPA Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Public Generics
            </span>
            <span className="text-[10px] text-slate-400">DoP / PMBI</span>
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            PMBJP Jan Aushadhi
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pradhan Mantri Bhartiya Janaushadhi Pariyojana official product master catalogs, generic formulation codes, and government MRPs.
          </p>
          <a
            href="http://janaushadhi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-teal-700 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            <span>Visit PMBJP Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Clinical Essential List
            </span>
            <span className="text-[10px] text-slate-400">MoHFW</span>
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            NLEM 2022
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            National List of Essential Medicines 2022 published by the Ministry of Health & Family Welfare, categorizing vital therapeutic formulations.
          </p>
          <a
            href="https://main.mohfw.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-teal-700 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            <span>View NLEM Gazette</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Interactive Data Importer Console */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pipeline Importer & Dry-Run Console
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Execute schema validation, simulate diffs, and detect conflicting prices without overwriting verified records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={isDryRun}
                onChange={(e) => setIsDryRun(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300"
              />
              <span>Dry Run Mode (Safe Preview)</span>
            </label>

            <button
              onClick={handleExecuteImport}
              disabled={isRunning}
              className="bg-slate-900 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isRunning ? "Analyzing..." : "Run Pipeline"}</span>
            </button>
          </div>
        </div>

        {/* Source Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedSource("nppa")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedSource === "nppa"
                ? "border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm text-slate-900">NPPA Gazette Ceiling Batch</strong>
              <Tag className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Validates formulations against official DPCO ceiling orders with gazette references.
            </p>
          </button>

          <button
            onClick={() => setSelectedSource("kaggle")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedSource === "kaggle"
                ? "border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm text-slate-900">Kaggle A-Z Indian Brand Batch</strong>
              <Database className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Tests schema validation, missing values, and conflicting prices against primary records.
            </p>
          </button>
        </div>

        {/* Import Report Display */}
        {importResult && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-teal-600" />
                <span>Import Analysis Report ({importResult.report.sourceName})</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {importResult.report.timestamp}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Analyzed Records</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">
                  {importResult.report.recordsAnalyzed}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-100">
                <span className="text-teal-700 block font-medium">Validation Pass Rate</span>
                <span className="text-xl font-bold text-teal-900 mt-0.5 block">
                  {importResult.report.validationPassRate}%
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-amber-700 block font-medium">Price Conflicts</span>
                <span className="text-xl font-bold text-amber-900 mt-0.5 block">
                  {importResult.conflictingPrices.length}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100">
                <span className="text-indigo-700 block font-medium">Execution Mode</span>
                <span className="text-sm font-bold text-indigo-900 mt-0.5 block">
                  {importResult.isDryRun ? "DRY RUN (Preview)" : "COMMITTED"}
                </span>
              </div>
            </div>

            {/* Conflicting Prices Notice if detected */}
            {importResult.conflictingPrices.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Conflicting Price Observations Detected (Not Overwritten)</span>
                </div>
                <div className="space-y-1.5 text-xs text-amber-950">
                  {importResult.conflictingPrices.map((cp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/80 border border-amber-200/80 flex items-center justify-between">
                      <div>
                        <strong>{cp.brandName}:</strong> Existing MRP ₹{cp.existingPrice} ({cp.existingSource}) vs Incoming MRP ₹{cp.incomingPrice} ({cp.incomingSource})
                      </div>
                      <span className="font-bold text-amber-800">
                        Δ {cp.priceDeltaPercent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Official NPPA Reference Catalog Table */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Indexed NPPA Gazette Ceiling Formulations
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified official ceiling prices under Drug Price Control Order (DPCO) 2013 and amendments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-2">Formulation</th>
                <th className="py-3 px-2">Strength</th>
                <th className="py-3 px-2">Official Ceiling / Unit</th>
                <th className="py-3 px-2">Gazette Notification</th>
                <th className="py-3 px-2">NLEM 2022</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {NPPA_CEILING_RECORDS.map((rec, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-900">{rec.formulation}</td>
                  <td className="py-3 px-2">{rec.strength}</td>
                  <td className="py-3 px-2 font-extrabold text-teal-800">₹{rec.ceilingPricePerUnit.toFixed(2)}</td>
                  <td className="py-3 px-2 font-mono text-slate-500">{rec.gazetteRef}</td>
                  <td className="py-3 px-2">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Included
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
