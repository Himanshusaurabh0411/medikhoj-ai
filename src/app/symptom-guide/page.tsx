"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SYMPTOM_DATABASE } from "@/data/symptomDatabase";
import { evaluateSymptomQuery } from "@/lib/symptomEngine";
import { AgeBand, SymptomTriageResult } from "@/types/medicine";
import { useLanguage } from "@/context/LanguageContext";
import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Baby,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Info,
  PhoneCall,
  RotateCcw,
  ShieldAlert,
  UserCheck
} from "lucide-react";

export default function SymptomGuidePage() {
  const { language, t } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [ageBand, setAgeBand] = useState<AgeBand>("adult");
  const [selectedSymptomKey, setSelectedSymptomKey] = useState<string>("fever");
  const [durationDays, setDurationDays] = useState<number>(1);
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([]);
  const [isPregnantOrLactating, setIsPregnantOrLactating] = useState<boolean>(false);
  const [triageResult, setTriageResult] = useState<SymptomTriageResult | null>(null);

  const currentSymptomDef = SYMPTOM_DATABASE.find(s => s.key === selectedSymptomKey);

  const handleStartTriage = () => {
    const res = evaluateSymptomQuery({
      ageBand,
      symptomKey: selectedSymptomKey,
      durationDays,
      hasRedFlags: selectedRedFlags,
      isPregnantOrLactating,
    });
    setTriageResult(res);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRedFlags([]);
    setDurationDays(1);
    setIsPregnantOrLactating(false);
    setTriageResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold">
          <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          <span>Evidence-Based Clinical Triage Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.symptom.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {t.symptom.subtitle}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between text-xs font-semibold px-2">
        <span className={step >= 1 ? "text-teal-700 font-bold" : "text-slate-400"}>
          1. Age Group
        </span>
        <span className="text-slate-300">→</span>
        <span className={step >= 2 ? "text-teal-700 font-bold" : "text-slate-400"}>
          2. Symptom & Duration
        </span>
        <span className="text-slate-300">→</span>
        <span className={step >= 3 ? "text-teal-700 font-bold" : "text-slate-400"}>
          3. Red Flag Screening
        </span>
        <span className="text-slate-300">→</span>
        <span className={step === 4 ? "text-teal-700 font-bold" : "text-slate-400"}>
          4. Guidance Report
        </span>
      </div>

      {/* STEP 1: Age Selection */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.symptom.selectAge}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Medical safety guidelines vary drastically depending on patient age. Infants and children have strict non-OTC safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: "infant",
                label: t.symptom.infant,
                sub: "Requires immediate pediatric care. No OTC self-medication.",
                badge: "Doctor First",
                icon: Baby,
              },
              {
                id: "child",
                label: t.symptom.child,
                sub: "Weight-adjusted guidance only. Strict contraindications on adult syrups.",
                badge: "Pediatric Safelist",
                icon: UserCheck,
              },
              {
                id: "adult",
                label: t.symptom.adult,
                sub: "Standard evidence-based OTC relief for mild, short-duration complaints.",
                badge: "Standard",
                icon: UserCheck,
              },
              {
                id: "elderly",
                label: t.symptom.elderly,
                sub: "Caution regarding kidney function, polypharmacy, and silent cardiac presentations.",
                badge: "Geriatric Alert",
                icon: HeartPulse,
              },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = ageBand === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setAgeBand(option.id as AgeBand)}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? "border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-teal-700" : "text-slate-400"}`} />
                      <span className="font-bold text-sm text-slate-900">{option.label}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded">
                      {option.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{option.sub}</p>
                </button>
              );
            })}
          </div>

          {ageBand === "infant" && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <strong>Pediatric Alert:</strong> {t.symptom.pediatricWarning}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep(2)}
              className="bg-slate-900 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Continue to Symptom Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Symptom & Duration */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.symptom.selectSymptom}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select the primary health concern you wish to evaluate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SYMPTOM_DATABASE.map((symp) => {
              const isSelected = selectedSymptomKey === symp.key;
              return (
                <button
                  key={symp.key}
                  onClick={() => setSelectedSymptomKey(symp.key)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold text-sm text-slate-900 block">
                    {language === "hi" ? symp.nameHi : symp.nameEn}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {language === "hi" ? symp.descriptionHi : symp.descriptionEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Duration */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.symptom.duration}: <span className="text-teal-700 text-sm font-extrabold">{durationDays} day(s)</span>
            </label>
            <input
              type="range"
              min="1"
              max="14"
              value={durationDays}
              onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1 day</span>
              <span>3 days (Standard threshold)</span>
              <span>7+ days</span>
              <span>14 days</span>
            </div>
          </div>

          {/* Pregnancy Checkbox for adult */}
          {ageBand === "adult" && (
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
              <input
                type="checkbox"
                checked={isPregnantOrLactating}
                onChange={(e) => setIsPregnantOrLactating(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>Currently Pregnant or Breastfeeding (Triggers enhanced contraindication safeguards)</span>
            </label>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold px-4 py-2"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-slate-900 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Screen for Urgent Red Flags</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Red Flag Screening */}
      {step === 3 && currentSymptomDef && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>{t.symptom.redFlagsQuestion}</span>
          </div>

          <p className="text-xs text-slate-500">
            Emergency warning signs require immediate clinical care rather than general self-care advice. Select any symptoms that apply:
          </p>

          <div className="space-y-3">
            {currentSymptomDef.redFlags.map((flag) => {
              const isChecked = selectedRedFlags.includes(flag.id);
              return (
                <label
                  key={flag.id}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    isChecked
                      ? "border-rose-400 bg-rose-50 text-rose-950 font-medium"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRedFlags([...selectedRedFlags, flag.id]);
                      } else {
                        setSelectedRedFlags(selectedRedFlags.filter(id => id !== flag.id));
                      }
                    }}
                    className="mt-0.5 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                  />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold block">
                      {language === "hi" ? flag.textHi : flag.textEn}
                    </span>
                    {flag.isCritical && (
                      <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block mt-0.5">
                        [CRITICAL RED FLAG - REQUIRES EMERGENCY TRANSPORT]
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold px-4 py-2"
            >
              Back
            </button>
            <button
              onClick={handleStartTriage}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Generate Triage Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Results */}
      {step === 4 && triageResult && (
        <div className="space-y-6">
          {/* Main Severity Card */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
              triageResult.severity === "emergency"
                ? "bg-rose-50 border-rose-300 text-rose-950"
                : triageResult.severity === "consult_doctor"
                ? "bg-amber-50 border-amber-300 text-amber-950"
                : "bg-teal-50 border-teal-200 text-teal-950"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
              {triageResult.severity === "emergency" ? (
                <>
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-700">Immediate Emergency Care</span>
                </>
              ) : triageResult.severity === "consult_doctor" ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-800">Medical Doctor Consultation Required</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span className="text-teal-800">General Self-Care & Supportive Measures</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
              {language === "hi" ? triageResult.headlineHi : triageResult.headlineEn}
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed mb-4 font-medium opacity-90">
              {language === "hi" ? triageResult.primaryActionHi : triageResult.primaryActionEn}
            </p>

            {triageResult.severity === "emergency" && (
              <div className="pt-2">
                <a
                  href="tel:112"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl text-xs inline-flex items-center gap-2 shadow-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call India's Emergency Number: 112</span>
                </a>
              </div>
            )}
          </div>

          {/* Triggered Red Flags if any */}
          {triageResult.redFlagsTriggered.length > 0 && (
            <div className="bg-white rounded-3xl border border-rose-200 p-6 space-y-3">
              <h3 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Identified Warning Signs:</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-rose-800">
                {triageResult.redFlagsTriggered.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* General Self Care Advice */}
          {triageResult.generalAdvice.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900">
                {t.symptom.selfCareTitle}
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {triageResult.generalAdvice.map((adv, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{language === "hi" ? adv.hi : adv.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safe OTC Options if allowed */}
          {triageResult.safeOtcOptions.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900">
                {t.symptom.safeOtcTitle}
              </h3>
              <div className="space-y-3">
                {triageResult.safeOtcOptions.map((opt, i) => (
                  <div key={i} className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-900">{opt.saltName}</span>
                      <span className="text-slate-500">{opt.dosageForm}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      <strong>Cautions:</strong> {opt.cautions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Tests */}
          {triageResult.recommendedTesting && triageResult.recommendedTesting.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900">
                {t.symptom.testingTitle}
              </h3>
              <p className="text-xs text-slate-500">
                Your doctor may consider ordering the following clinical evaluations based on duration and symptoms:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {triageResult.recommendedTesting.map((test, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-lg font-medium">
                    {test}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reset button */}
          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={handleReset}
              className="text-xs text-teal-600 hover:text-teal-800 font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Symptom Evaluation</span>
            </button>
            <Link
              href="/search"
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Search Related Medicines
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
