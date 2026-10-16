"use client";

import React from "react";
import { POISON_CONTROL_DIRECTORY } from "@/data/poisonControlDirectory";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ExternalLink,
  MapPin,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

export default function SafetyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Emergency Strip Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold">
              <AlertOctagon className="w-4 h-4 text-rose-300" />
              <span>National Medical Emergency</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t.emergency.nationalEmergency}: 112
            </h1>
            <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
              For acute medical distress, sudden collapse, respiratory arrest, anaphylaxis, or unconsciousness, dial 112 immediately. Free service available 24/7 across all telecom operators in India without sign-in.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <a
              href="tel:112"
              className="bg-white text-rose-900 hover:bg-rose-100 font-extrabold px-8 py-4 rounded-2xl text-base flex items-center justify-center gap-3 shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-rose-700" />
              <span>DIAL 112 NOW</span>
            </a>
          </div>
        </div>

        {/* Critical Overdose Do-Not-Harm Protocol */}
        <div className="pt-6 border-t border-rose-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-rose-100">
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/50 space-y-1">
            <strong className="text-white block font-bold text-sm">
              ⚠ DO NOT Induce Vomiting
            </strong>
            <p className="leading-relaxed text-rose-200">
              Never induce vomiting or force fluids unless explicitly instructed by a poison control toxicologist. For acids, alkalis, or petroleum distillates, vomiting causes fatal esophageal burns and pulmonary aspiration.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/50 space-y-1">
            <strong className="text-white block font-bold text-sm">
              ✓ Save Medicine Packaging & Foil
            </strong>
            <p className="leading-relaxed text-rose-200">
              Keep the exact medicine strip, blister pack, syrup bottle, and receipt ready. Knowing the precise active salt name and strength allows toxicologists to administer the exact antidote.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Indian Poison Control Directory */}
      <section id="poison-control" className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Reviewed & Verified Clinical Directory</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.emergency.regionalCenters}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official 24/7 poison information hotlines operated by premier medical colleges and research institutes across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POISON_CONTROL_DIRECTORY.map((pic, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {pic.city}, {pic.state}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Verified: {pic.verificationDate}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mt-2">
                  {pic.centerName}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {pic.institution}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                {pic.tollFree && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Toll-Free Helpline:</span>
                    <a
                      href={`tel:${pic.tollFree.replace(/\s+/g, "")}`}
                      className="text-teal-700 font-mono font-bold hover:underline"
                    >
                      {pic.tollFree}
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Emergency Phone:</span>
                  <span className="text-slate-900 font-mono font-bold">
                    {pic.emergencyPhone}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] pt-1 border-t border-slate-200/60">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{pic.timing}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Source: {pic.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Medicine Safety Pitfalls */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          Core Indian Medicine Safety Rules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              1. Avoid Duplicate Active Salts
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Many combination cold tablets already contain 500mg or 650mg paracetamol. Taking Dolo 650 concurrently can easily exceed the fatal 4,000mg/day liver toxicity limit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              2. Complete Full Antibiotic Course
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Never stop Schedule H1 antibiotics (like Augmentin or Azithral) after 2 days merely because you feel better. Surviving bacteria mutate and develop antimicrobial resistance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              3. Check Expiry & Tamper Seals
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Inspect expiry dates on foil strips. Expired tetracyclines and eye drops undergo chemical breakdown that causes severe renal and ocular toxicity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
