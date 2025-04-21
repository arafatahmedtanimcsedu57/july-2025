"use client";

import type { HospitalCasualty } from "@/types/data";
import { create } from "zustand";

interface SelectedCasualtyState {
  selectedCasualty: HospitalCasualty | null;
  setSelectedCasualty: (casualty: HospitalCasualty) => void;
  toggleSelectedCasualty: (casualty: HospitalCasualty) => void;
  resetSelectedCasualty: () => void;
}

export const useSelectedCasualtyStore = create<SelectedCasualtyState>(
  (set) => ({
    selectedCasualty: null,
    setSelectedCasualty: (casualty) => set({ selectedCasualty: casualty }),
    toggleSelectedCasualty: (casualty) =>
      set((state) =>
        state.selectedCasualty?.facility === casualty.facility
          ? { selectedCasualty: null }
          : { selectedCasualty: casualty }
      ),
    resetSelectedCasualty: () => set({ selectedCasualty: null }),
  })
);
