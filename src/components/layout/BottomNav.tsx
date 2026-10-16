"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCabinet } from "@/context/CabinetContext";
import { Bookmark, Home, Scale, ScanLine, Search, ShieldCheck } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { savedItems } = useCabinet();

  const items = [
    { href: "/", label: language === "hi" ? "होम" : "Home", icon: Home },
    { href: "/search", label: language === "hi" ? "खोजें" : "Search", icon: Search },
    { href: "/compare", label: language === "hi" ? "तुलना" : "Compare", icon: Scale },
    { href: "/scan", label: language === "hi" ? "स्कैन" : "Scan", icon: ScanLine },
    { href: "/cabinet", label: language === "hi" ? "कैबिनेट" : "Cabinet", icon: Bookmark, badge: savedItems.length },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] rounded-xl transition-colors relative ${
                isActive ? "text-teal-600 font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-teal-600" : "text-slate-500"}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
