"use client"

import { create } from "zustand"

interface IncidentState {
  selectedIncidentId: string | null
  setSelectedIncident: (id: string | null) => void
}

export const useIncidentStore = create<IncidentState>((set) => ({
  selectedIncidentId: null,
  setSelectedIncident: (id) => set({ selectedIncidentId: id }),
}))

