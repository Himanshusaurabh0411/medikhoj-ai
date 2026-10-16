"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Database,
  ExternalLink,
  HeartHandshake,
  Lock,
  PhoneCall,
  Scale,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          <span>About MediKhoj AI</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === "hi"
            ? "मेडीखोज एआई: भारतीय चिकित्सा सूचना मंच"
            : "MediKhoj AI: India's Advanced Medicine Intelligence Platform"}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Critical Medical Disclaimer (Mandatory) */}
      <section className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
          <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0" />
          <span>{t.disclaimer.heading}</span>
        </div>
        <div className="text-xs sm:text-sm text-rose-950 leading-relaxed space-y-3">
          <p>
            {t.disclaimer.body}
          </p>
          <p>
            <strong>Prescription Medications:</strong> Schedule H, Schedule H1, and Schedule X medicines under the Drugs and Cosmetics Rules (1945) must be sold by retail strictly on the prescription of a Registered Medical Practitioner. Never stop, start, or alter prescription medications based solely on automated equivalence calculations.
          </p>
          <p>
            <strong>Medical Emergencies:</strong> In the event of an acute medical crisis, allergic reaction, sudden chest pain, poisoning, or suspected overdose, immediately call India&apos;s National Emergency Number <strong>112</strong> or contact the National Poisons Information Centre (AIIMS New Delhi) at <strong>1800 116 117</strong>.
          </p>
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Core Principles & Architectural Rigor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Strict Bio-Equivalence Only</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We never recommend switching medicines merely because they share one ingredient or have similar names. Exact equivalence requires identical active salts, matching milligram strengths, identical dosage forms, and routes of administration.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Independent Platform & Neutral Intelligence</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              MediKhoj is an independent medicine intelligence engine. We do not sell medicines, nor are we an owner, partner, or commercial kiosk of Jan Aushadhi (PMBJP) or any specific pharmaceutical company. Our sole purpose is suggesting transparent, verified bio-equivalent substitutes across all manufacturers.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Normalized Unit Price Comparison</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Comparing pack prices creates false impressions when pack sizes differ (e.g. 10 tablets vs 15 tablets). We normalize every product down to price-per-tablet, price-per-capsule, or price-per-ml.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Device-Local Privacy</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Your medicine cabinet, saved dosages, and expiry reminders stay stored locally on your device browser. We do not profile users or track personal medicine consumption habits.
            </p>
          </div>
        </div>
      </section>

      {/* Official Government References */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm text-xs">
        <h3 className="font-bold text-slate-900 text-sm">
          Regulatory Authorities & Citations
        </h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span>NPPA (National Pharmaceutical Pricing Authority)</span>
            <a href="https://www.nppaindia.nic.in" target="_blank" rel="noreferrer" className="text-teal-700 font-semibold hover:underline flex items-center gap-1">
              <span>nppaindia.nic.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span>PMBI / PMBJP (Pradhan Mantri Bhartiya Janaushadhi Pariyojana)</span>
            <a href="http://janaushadhi.gov.in" target="_blank" rel="noreferrer" className="text-teal-700 font-semibold hover:underline flex items-center gap-1">
              <span>janaushadhi.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span>CDSCO (Central Drugs Standard Control Organisation)</span>
            <a href="https://cdsco.gov.in" target="_blank" rel="noreferrer" className="text-teal-700 font-semibold hover:underline flex items-center gap-1">
              <span>cdsco.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span>NPIC AIIMS New Delhi (National Poisons Information Centre)</span>
            <a href="https://www.aiims.edu" target="_blank" rel="noreferrer" className="text-teal-700 font-semibold hover:underline flex items-center gap-1">
              <span>aiims.edu/npic</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
