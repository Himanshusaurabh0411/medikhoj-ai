"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, AlertTriangle, ShieldCheck, PhoneCall, ExternalLink } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800 pb-20 lg:pb-12">
      {/* Disclaimer Alert Box */}
      <div className="bg-slate-950 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">
              {t.disclaimer.heading}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.disclaimer.body}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                MediKhoj <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === "hi"
                ? "भारत का विश्वसनीय दवा मूल्य तुलना और सुरक्षा प्लेटफॉर्म। जन औषधि और एनपीपीए मूल्य सीमा के साथ।"
                : "India's premier open medicine intelligence platform. Powered by authentic NPPA ceiling records, PMBJP generic lists, and CDSCO approvals."}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict Bio-Equivalence Validation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Platform Features
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/search" className="hover:text-teal-300">Search Indian Medicines</Link></li>
              <li><Link href="/compare" className="hover:text-teal-300">Compare Unit Prices</Link></li>
              <li><Link href="/generics" className="hover:text-teal-300">Affordable Medicine Substitutes</Link></li>
              <li><Link href="/scan" className="hover:text-teal-300">GS1 Barcode & Strip OCR</Link></li>
              <li><Link href="/symptom-guide" className="hover:text-teal-300">Symptom Guide & Red Flags</Link></li>
              <li><Link href="/cabinet" className="hover:text-teal-300">Personal Medicine Cabinet</Link></li>
            </ul>
          </div>

          {/* Regulatory & Emergency */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Emergency & Regulatory
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Emergency: 112 (All India)</span>
              </li>
              <li>
                <span className="block text-slate-300">AIIMS New Delhi NPIC:</span>
                <span className="text-teal-400 font-mono">1800 116 117</span>
              </li>
              <li><Link href="/safety" className="hover:text-teal-300">State Poison Control Directory</Link></li>
              <li><Link href="/data-sources" className="hover:text-teal-300">NPPA Gazette & DPCO Ceilings</Link></li>
              <li><Link href="/about" className="hover:text-teal-300">Medical Safety & Data Integrity</Link></li>
            </ul>
          </div>

          {/* External Authoritative Sources */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Authoritative Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.nppaindia.nic.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-teal-300">
                  <span>NPPA (Govt of India)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="http://janaushadhi.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-teal-300">
                  <span>PMBJP Jan Aushadhi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://cdsco.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-teal-300">
                  <span>CDSCO Drug Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://main.mohfw.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-teal-300">
                  <span>MoHFW NLEM 2022</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} MediKhoj AI. Built for India's Healthcare Transparency.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-slate-300">Privacy & Data Ethics</Link>
            <Link href="/about" className="hover:text-slate-300">Terms of Use</Link>
            <Link href="/data-sources" className="hover:text-slate-300">Audit & Provenance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
