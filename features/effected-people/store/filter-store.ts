import { create } from 'zustand';

import type { FilterState } from '@/types/filter-state';

type FilterActions = {
	setDateFilter: (date: Date | null) => void;
	setMinAgeFilter: (age: string) => void;
	setMaxAgeFilter: (age: string) => void;
	setTypeFilter: (type: string) => void;
	setDistrictFilter: (district: string) => void;

	resetFilters: () => void;
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
	dateFilter: null,
	minAgeFilter: '',
	maxAgeFilter: '',
	typeFilter: 'all',
	districtFilter: 'all',

	setDateFilter: (date) => set({ dateFilter: date }),
	setMinAgeFilter: (age) => set({ minAgeFilter: age }),
	setMaxAgeFilter: (age) => set({ maxAgeFilter: age }),
	setTypeFilter: (type) => set({ typeFilter: type }),
	setDistrictFilter: (district) => set({ districtFilter: district }),
	resetFilters: () =>
		set({
			dateFilter: null,
			minAgeFilter: '',
			maxAgeFilter: '',
			typeFilter: 'all',
			districtFilter: 'all',
		}),
}));
