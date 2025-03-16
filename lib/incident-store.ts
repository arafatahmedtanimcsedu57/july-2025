'use client';

import type { CasualtyPerson } from '@/types/data';
import { create } from 'zustand';

interface IncidentState {
	selectedIncident: CasualtyPerson | null;
	setSelectedIncident: (incident: CasualtyPerson | null) => void;
}

export const useIncidentStore = create<IncidentState>((set) => ({
	selectedIncident: null,
	setSelectedIncident: (incident) => set({ selectedIncident: incident }),
}));
