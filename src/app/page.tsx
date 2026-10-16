"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { MedicineCard } from "@/components/common/MedicineCard";
import { INDIAN_MEDICINES } from "@/data/indianMedicines";
import { searchMedicines } from "@/lib/searchEngine";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  HeartPulse,
  MapPin,
  Percent,
  Pill,
  Scale,
  ScanLine,
  Search,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Tag
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Live autocomplete results
  const liveSearchResults = searchQuery.trim()
    ? searchMedicines({ query: searchQuery }, "price_low_high", 1, 5).items
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  const popularSalts = [
    { label: "Paracetamol 650", query: "Paracetamol" },
    { label: "Amoxicillin + Clav 625", query: "Amoxicillin" },
    { label: "Pantoprazole 40", query: "Pantoprazole" },
    { label: "Metformin 500", query: "Metformin" },
    { label: "Telmisartan 40", query: "Telmisartan" },
    { label: "Azithromycin 500", query: "Azithromycin" },
    { label: "Montair-LC", query: "Montair" },
  ];

  const therapeuticCategories = [
    { title: "Fever & Pain Relief", query: "Paracetamol", icon: Pill, count: "5+ verified options" },
    { title: "Antibiotics (Schedule H1)", query: "Amoxicillin", icon: AlertOctagon, count: "Strict Rx only" },
    { title: "Diabetes Care", query: "Metformin", icon: Activity, count: "DPCO capped" },
    { title: "Cardiac & Blood Pressure", query: "Telmisartan", icon: HeartPulse, count: "Schedule H" },
    { title: "Acidity & Digestion", query: "Pantoprazole", icon: CheckCircle2, count: "PPI generics" },
    { title: "Allergy & Respiratory", query: "Montelukast", icon: Stethoscope, count: "Anti-allergy" },
    { title: "Vitamins & Calcium", query: "Calcium", icon: ShieldCheck, count: "Daily supplements" },
    { title: "AYUSH & Herbal", query: "Chyawanprash", icon: Tag, count: "Ayurvedic products" },
  ];

  const featuredMedicines = INDIAN_MEDICINES.slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* Top Authoritative Hero */}
      <section className="bg-obsidian-950 text-white border-b border-obsidian-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          {/* Official Portal Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 text-saffron-400 text-xs font-semibold border border-obsidian-800">
            <ShieldCheck className="w-4 h-4 text-saffron-500" />
            <span>
              {language === "hi"
                ? "भारतीय चिकित्सा मूल्य एवं जेनेरिक विकल्प सूचना पोर्टल"
                : "National Medicine Intelligence & Generic Price Comparison Portal"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {language === "hi" ? (
              <>अपनी दवा को जानें। <span className="text-saffron-400">सटीक तुलना</span> करें।</>
            ) : (
              <>Search Indian Medicines. <br className="hidden sm:inline" /><span className="text-saffron-400">Compare Generics</span> & Verify Price Caps.</>
            )}
          </h1>

          <p className="text-sm sm:text-base text-chalk-300 max-w-2xl mx-auto leading-relaxed">
            {language === "hi"
              ? "सत्यापित सक्रिय साल्ट खोजें, किफायती विकल्प व जेनेरिक विकल्प प्राप्त करें, प्रति टैबलेट मूल्य की तुलना करें और आधिकारिक NPPA अधिकतम मूल्य सीमा का सत्यापन करें।"
              : "Compare exact active salts, discover verified affordable substitute medicines, check per-tablet prices, and verify NPPA ceiling caps."}
          </p>

          {/* Search Box with Real Live Autocomplete */}
          <div ref={searchContainerRef} className="max-w-2xl mx-auto relative text-left mt-8">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border-2 border-chalk-300 focus-within:border-saffron-600 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder={language === "hi" ? "ब्रांड नाम, साल्ट (जैसे पैरासिटामोल), या बारकोड खोजें..." : "Search by brand (e.g. Dolo 650), salt composition, or barcode..."}
                  className="w-full px-3 py-3 text-obsidian-950 placeholder:text-slate-400 text-sm font-medium focus:outline-none rounded-xl"
                />
                <button
                  type="submit"
                  className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t.searchButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Floating Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-chalk-300 z-50 overflow-hidden divide-y divide-chalk-100">
                {liveSearchResults.length > 0 ? (
                  <div className="p-2 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 block">
                      Matching Verified Medicines
                    </span>
                    {liveSearchResults.map((res) => (
                      <Link
                        key={res.medicine.id}
                        href={`/medicines/${res.medicine.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-chalk-100 transition-colors"
                      >
                        <div>
                          <span className="font-bold text-xs text-obsidian-950 block">
                            {res.medicine.brandName}
                          </span>
                          <span className="text-[11px] text-obsidian-800/70">
                            {res.medicine.saltComposition} • {res.medicine.dosageForm}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-obsidian-950 block">
                            ₹{res.medicine.pricePerUnit.toFixed(2)} / {res.medicine.unitType}
                          </span>
                          {res.medicine.isJanAushadhi && (
                            <span className="text-[10px] font-bold text-apothecary-800 bg-apothecary-100 px-1.5 py-0.5 rounded">
                              Generic Substitute
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No immediate brand matches found. Press enter to search the full database.
                  </div>
                ) : (
                  <div className="p-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2 block mb-2">
                      Popular Indian Medicine Salts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSalts.map((salt) => (
                        <button
                          key={salt.query}
                          onClick={() => {
                            setSearchQuery(salt.query);
                            router.push(`/search?q=${encodeURIComponent(salt.query)}`);
                            setIsSearchFocused(false);
                          }}
                          className="bg-chalk-100 hover:bg-saffron-50 hover:text-saffron-800 text-obsidian-800 text-xs px-2.5 py-1.5 rounded-lg border border-chalk-300 transition-colors font-medium"
                        >
                          {salt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
            <Link
              href="/generics"
              className="bg-obsidian-900/90 hover:bg-obsidian-900 p-4 rounded-2xl border border-obsidian-800 transition-all flex flex-col justify-between"
            >
              <Percent className="w-5 h-5 text-saffron-400 mb-2" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-white block">
                  Affordable Substitutes
                </span>
                <span className="text-[11px] text-chalk-300">
                  Save 50% to 80% on bio-equivalents
                </span>
              </div>
            </Link>

            <Link
              href="/scan"
              className="bg-obsidian-900/90 hover:bg-obsidian-900 p-4 rounded-2xl border border-obsidian-800 transition-all flex flex-col justify-between"
            >
              <ScanLine className="w-5 h-5 text-teal-400 mb-2" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-white block">
                  GS1 Barcode & Strip OCR
                </span>
                <span className="text-[11px] text-chalk-300">
                  Check GTIN & Expiry date
                </span>
              </div>
            </Link>

            <Link
              href="/compare"
              className="bg-obsidian-900/90 hover:bg-obsidian-900 p-4 rounded-2xl border border-obsidian-800 transition-all flex flex-col justify-between"
            >
              <Scale className="w-5 h-5 text-amber-400 mb-2" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-white block">
                  Price per Unit Comparison
                </span>
                <span className="text-[11px] text-chalk-300">
                  Normalized tablet/capsule rate
                </span>
              </div>
            </Link>

            <Link
              href="/symptom-guide"
              className="bg-obsidian-900/90 hover:bg-obsidian-900 p-4 rounded-2xl border border-obsidian-800 transition-all flex flex-col justify-between"
            >
              <Stethoscope className="w-5 h-5 text-rose-400 mb-2" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-white block">
                  Symptom Triage Guide
                </span>
                <span className="text-[11px] text-chalk-300">
                  Age-aware & red flag screening
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* Official Red Line Campaign Statutory Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-chalk-300 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-1.5 self-stretch bg-surgical-600 rounded-full shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-surgical-700 bg-surgical-50 px-2 py-0.5 rounded border border-surgical-500/30">
                  Ministry of Health Statutory Notice
                </span>
                <span className="text-xs font-bold text-obsidian-950">
                  Medicines with a Vertical Red Line (Lal Lakir)
                </span>
              </div>
              <p className="text-xs text-obsidian-800/80 mt-1 leading-relaxed">
                Packaging strips with a vertical red line (Schedule H and H1 antibiotics & controlled drugs) must never be taken without a prescription. Indiscriminate antibiotic use leads to severe antimicrobial resistance.
              </p>
            </div>
          </div>
          <Link
            href="/safety"
            className="text-xs font-bold text-saffron-700 hover:text-saffron-800 whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>Learn Safety Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Therapeutic Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-obsidian-950 tracking-tight">
            Browse Medicines by Health Concern
          </h2>
          <p className="text-xs text-obsidian-800/70 mt-0.5">
            Explore verified brand-name medicines and their equivalent affordable substitutes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {therapeuticCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  setSearchQuery(cat.query);
                  router.push(`/search?q=${encodeURIComponent(cat.query)}`);
                }}
                className="bg-white hover:bg-chalk-50 p-4 rounded-2xl border border-chalk-300 text-left transition-all hover:border-saffron-300 hover:shadow-sm flex flex-col justify-between group"
              >
                <div className="p-2 rounded-xl bg-chalk-100 text-obsidian-800 group-hover:bg-saffron-100 group-hover:text-saffron-800 w-fit transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-xs sm:text-sm text-obsidian-950 group-hover:text-saffron-800">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Verified Medicines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-obsidian-950 tracking-tight">
              Common Indian Medicine Price Benchmarks
            </h2>
            <p className="text-xs text-obsidian-800/70 mt-0.5">
              Verified retail MRPs, normalized price per tablet, and affordable bio-equivalent substitutes.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-saffron-700 hover:underline flex items-center gap-1"
          >
            <span>View All ({INDIAN_MEDICINES.length} cataloged)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMedicines.map((med) => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>
      </section>
    </div>
  );
}
