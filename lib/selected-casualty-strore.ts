"use client"

import type { Casualty } from "@/types/data"
import { create } from "zustand"

interface SidebarState {
  selectedCasualty: Casualty| null
  setSelectedCasualty: () => void
  resetSelectedCasualty : () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
    selectedCasualty: null,
    setSelectedCasualty: () => set((casualty) => ({ selectedCasualty: casualty })),
    resetSelectedCasualty: () => set({ selectedCasualty: null }),
  
}))

