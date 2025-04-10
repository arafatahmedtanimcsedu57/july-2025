"use client";

import type { Casualty } from "@/types/data";
import { create } from "zustand";

interface SelectedCasualtyState {
  selectedCasualty: Casualty | null;
  setSelectedCasualty: (casualty: Casualty) => void;
  toggleSelectedCasualty: (casualty: Casualty) => void;
  resetSelectedCasualty: () => void;
}

export const useSelectedCasualtyStore = create<SelectedCasualtyState>(
  (set) => ({
    selectedCasualty: null,
    setSelectedCasualty: (casualty) => set({ selectedCasualty: casualty }),
    toggleSelectedCasualty: (casualty) =>
      set((state) =>
        state.selectedCasualty?.district === casualty.district
          ? { selectedCasualty: null }
          : { selectedCasualty: casualty }
      ),
    resetSelectedCasualty: () => set({ selectedCasualty: null }),
  })
);
