"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCabinet } from "@/context/CabinetContext";
import {
  Activity,
  Bookmark,
  Languages,
  Menu,
  PhoneCall,
  Layers,
  Search,
  Scale,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  X,
  Database
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const { savedItems } = useCabinet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/medicines", label: language === "hi" ? "दवा गैलरी" : "Medicine Visuals", icon: Layers },
    { href: "/search", label: language === "hi" ? "दवा खोजें" : "Search Medicines", icon: Search },
    { href: "/compare", label: language === "hi" ? "कीमत तुलना" : "Compare Prices", icon: Scale },
    { href: "/generics", label: language === "hi" ? "किफायती विकल्प" : "Affordable Substitutes", icon: ShieldCheck },
    { href: "/scan", label: language === "hi" ? "स्कैन व एक्सपायरी" : "Scan & Expiry", icon: ScanLine },
    { href: "/symptom-guide", label: language === "hi" ? "लक्षण गाइड" : "Symptom Guide", icon: Stethoscope },
    { href: "/data-sources", label: language === "hi" ? "NPPA मूल्य सीमा" : "DPCO Price Caps", icon: Database },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Clinical Strip */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="hidden sm:inline font-bold text-white">MediKhoj:</span>
            <span className="text-[11px] sm:text-xs">
              {language === "hi"
                ? "राष्ट्रीय दवा मूल्य एवं जेनेरिक विकल्प सूचना पोर्टल"
                : "National Medicine Intelligence & Generic Price Comparison Portal"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link
              href="/safety"
              className="flex items-center gap-1.5 text-rose-300 hover:text-white font-semibold transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              <span>Emergency: <strong>112</strong></span>
            </Link>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              AIIMS Poison Helpline: <strong>1800 116 117</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-800 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                MediKhoj <span className="text-teal-700 text-sm font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">IN</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-semibold -mt-0.5">
                {language === "hi" ? "मेडीखोज भारत" : "National Medicine Portal"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-slate-100 text-teal-900 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-teal-700" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle & Cabinet */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              title="Switch between English and Hindi"
            >
              <Languages className="w-3.5 h-3.5 text-teal-700" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Saved Cabinet */}
            <Link
              href="/cabinet"
              className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
              title="My Medicine Cabinet"
            >
              <Bookmark className="w-5 h-5" />
              {savedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {savedItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-teal-50 text-teal-900"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 text-teal-700" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-700"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Emergency 112 & Poison Control</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:underline"
            >
              About & Statutory Medical Disclaimer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
