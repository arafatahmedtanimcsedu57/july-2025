'use client';

import type { EffectedPerson } from '@/types/data';
import { create } from 'zustand';

interface SelectedPersonState {
	selectedPerson: EffectedPerson | null;
	setSelectedPerson: (person: EffectedPerson) => void;
	toggleSelectedPerson: (person: EffectedPerson) => void;
	resetSelectedPerson: () => void;
}

export const useSelectedCasualtyStore = create<SelectedPersonState>((set) => ({
	selectedPerson: null,
	setSelectedPerson: (person) => set({ selectedPerson: person }),
	toggleSelectedPerson: (person) =>
		set((state) =>
			state.selectedPerson?.id === person.id
				? { selectedPerson: null }
				: { selectedPerson: person },
		),
	resetSelectedPerson: () => set({ selectedPerson: null }),
}));
