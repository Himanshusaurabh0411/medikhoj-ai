"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCabinet } from "@/context/CabinetContext";
import { useLanguage } from "@/context/LanguageContext";
import { ScheduleBadge } from "@/components/common/ScheduleBadge";
import { MedicinePackagingImage } from "@/components/common/MedicinePackagingImage";
import {
  AlertOctagon,
  AlertTriangle,
  Bookmark,
  Calendar,
  CheckCircle2,
  Lock,
  Plus,
  Scale,
  Trash2
} from "lucide-react";

export default function CabinetPage() {
  const { savedItems, removeFromCabinet, clearCabinet, addToCabinet } = useCabinet();
  const { language, t } = useLanguage();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [expiryInput, setExpiryInput] = useState("");
  const [notesInput, setNotesInput] = useState("");

  const checkExpiryStatus = (expiryDateStr?: string) => {
    if (!expiryDateStr) return null;
    const expDate = new Date(expiryDateStr);
    const now = new Date();
    const diff = expDate.getTime() - now.getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

    if (diff < 0) {
      return { status: "expired", label: "EXPIRED!", color: "text-rose-700 bg-rose-50 border-rose-200" };
    }
    if (diff < thirtyDaysMs) {
      return { status: "soon", label: "Expiring Soon (< 30d)", color: "text-amber-800 bg-amber-50 border-amber-200" };
    }
    return { status: "safe", label: "Shelf-Life Valid", color: "text-emerald-800 bg-emerald-50 border-emerald-200" };
  };

  const handleSaveItemEdit = (medId: string) => {
    const item = savedItems.find(i => i.medicine.id === medId);
    if (item) {
      addToCabinet(item.medicine, expiryInput || item.userExpiryDate, notesInput || item.notes);
    }
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-teal-600" />
            <span>Personal Medicine Cabinet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === "hi" ? "मेरी सुरक्षित दवाएं" : "My Saved Medicines"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track shelf-life expiry, dosage notes, and fast access to bio-equivalent generic alternatives.
          </p>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear your saved medicine cabinet?")) {
                clearCabinet();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-800 border border-rose-200 bg-rose-50/50 hover:bg-rose-50 px-3.5 py-2 rounded-xl font-semibold transition-colors"
          >
            Clear Entire Cabinet
          </button>
        )}
      </div>

      {/* Privacy Notice required by prompt */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong>Privacy Safeguard:</strong> All cabinet records and notes are stored strictly on your local device browser. No sensitive personal health data or medicine lists are ever sent to or stored on external advertising servers.
        </div>
      </div>

      {/* Cabinet List */}
      {savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Your medicine cabinet is empty
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Search Indian medicines and tap &quot;Save to Medicine Cabinet&quot; to organize medicines, track expiry dates, and calculate generic savings.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Search & Add Medicines</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedItems.map(({ medicine, userExpiryDate, notes }) => {
            const expiryInfo = checkExpiryStatus(userExpiryDate);
            const isEditing = editingId === medicine.id;

            return (
              <div
                key={medicine.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <MedicinePackagingImage medicine={medicine} size="sm" className="mb-3" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/medicines/${medicine.id}`}
                        className="font-extrabold text-base text-slate-900 hover:text-teal-700 block"
                      >
                        {medicine.brandName}
                      </Link>
                      <p className="text-xs text-slate-500 font-medium">
                        {medicine.dosageForm} • {medicine.strength}
                      </p>
                    </div>
                    <ScheduleBadge category={medicine.prescriptionCategory} productType={medicine.productType} />
                  </div>

                  <p className="text-xs text-slate-700 font-semibold mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {medicine.saltComposition}
                  </p>

                  {/* Expiry Date Badge */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {expiryInfo ? (
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold border ${expiryInfo.color}`}>
                        {expiryInfo.status === "expired" ? (
                          <AlertOctagon className="w-3.5 h-3.5" />
                        ) : (
                          <Calendar className="w-3.5 h-3.5" />
                        )}
                        <span>Expires: {userExpiryDate} ({expiryInfo.label})</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-medium">
                        No expiry date recorded
                      </span>
                    )}
                  </div>

                  {/* Notes */}
                  {notes && (
                    <div className="mt-2 text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      <strong>Notes:</strong> {notes}
                    </div>
                  )}

                  {/* Edit Form */}
                  {isEditing && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">
                          Set Expiry Date
                        </label>
                        <input
                          type="date"
                          value={expiryInput}
                          onChange={(e) => setExpiryInput(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">
                          Personal Notes / Dosage Schedule
                        </label>
                        <input
                          type="text"
                          value={notesInput}
                          placeholder="e.g. 1 tab after breakfast for 5 days"
                          onChange={(e) => setNotesInput(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-slate-500 text-xs px-2 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveItemEdit(medicine.id)}
                          className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {!isEditing && (
                      <button
                        onClick={() => {
                          setEditingId(medicine.id);
                          setExpiryInput(userExpiryDate || "");
                          setNotesInput(notes || "");
                        }}
                        className="text-teal-700 hover:underline font-semibold"
                      >
                        Edit Expiry & Notes
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/compare?ref=${medicine.id}`}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                      title="Compare price"
                    >
                      <Scale className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => removeFromCabinet(medicine.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Remove from cabinet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
