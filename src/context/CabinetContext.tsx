"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Medicine } from "@/types/medicine";

export interface CabinetItem {
  medicine: Medicine;
  savedAt: string;
  userExpiryDate?: string; // Optional user-recorded expiry date (YYYY-MM-DD)
  notes?: string;
}

interface CabinetContextType {
  savedItems: CabinetItem[];
  addToCabinet: (med: Medicine, userExpiryDate?: string, notes?: string) => void;
  removeFromCabinet: (medId: string) => void;
  isSaved: (medId: string) => boolean;
  clearCabinet: () => void;
}

const CabinetContext = createContext<CabinetContextType | undefined>(undefined);

export function CabinetProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<CabinetItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("medikhoj_cabinet");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cabinet items from localStorage", e);
    }
  }, []);

  const saveToStorage = (items: CabinetItem[]) => {
    setSavedItems(items);
    try {
      localStorage.setItem("medikhoj_cabinet", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cabinet", e);
    }
  };

  const addToCabinet = (medicine: Medicine, userExpiryDate?: string, notes?: string) => {
    const existingIndex = savedItems.findIndex(i => i.medicine.id === medicine.id);
    if (existingIndex > -1) {
      // update
      const updated = [...savedItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        userExpiryDate,
        notes,
      };
      saveToStorage(updated);
    } else {
      saveToStorage([
        ...savedItems,
        {
          medicine,
          savedAt: new Date().toISOString(),
          userExpiryDate,
          notes,
        }
      ]);
    }
  };

  const removeFromCabinet = (medId: string) => {
    const updated = savedItems.filter(i => i.medicine.id !== medId);
    saveToStorage(updated);
  };

  const isSaved = (medId: string) => {
    return savedItems.some(i => i.medicine.id === medId);
  };

  const clearCabinet = () => {
    saveToStorage([]);
  };

  return (
    <CabinetContext.Provider
      value={{ savedItems, addToCabinet, removeFromCabinet, isSaved, clearCabinet }}
    >
      {children}
    </CabinetContext.Provider>
  );
}

export function useCabinet() {
  const context = useContext(CabinetContext);
  if (!context) {
    throw new Error("useCabinet must be used within a CabinetProvider");
  }
  return context;
}
