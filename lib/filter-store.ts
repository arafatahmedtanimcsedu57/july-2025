import { create } from 'zustand';

import type { FilterState } from '@/types/filter-state';
import { CASUALTY_TYPES } from '@/constant/casualty-types';

type FilterActions = {
	setDateFilter: (date: Date | null) => void;
	setMinAgeFilter: (age: string) => void;
	setMaxAgeFilter: (age: string) => void;
	setTypeFilter: (type: string) => void;
	setDistrictFilter: (district: string) => void;

	setCasualtyTypeFilter: (casualtyTypeFilter: string) => void;
	resetFilters: () => void;
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
	dateFilter: null,
	minAgeFilter: '',
	maxAgeFilter: '',
	typeFilter: 'all',
	districtFilter: 'all',
	casualtyTypeFilter: CASUALTY_TYPES.MULTIPLE,

	setDateFilter: (date) => set({ dateFilter: date }),
	setMinAgeFilter: (age) => set({ minAgeFilter: age }),
	setMaxAgeFilter: (age) => set({ maxAgeFilter: age }),
	setTypeFilter: (type) => set({ typeFilter: type }),
	setCasualtyTypeFilter: (casualty) => set({ casualtyTypeFilter: casualty }),
	setDistrictFilter: (district) => set({ districtFilter: district }),
	resetFilters: () =>
		set({
			dateFilter: null,
			minAgeFilter: '',
			maxAgeFilter: '',
			typeFilter: 'all',
			districtFilter: 'all'
		}),
}));
