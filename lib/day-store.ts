'use client';

import { create } from 'zustand';

import { allCasualtyData } from './data';

interface DayState {
	currentDay: string;
	setDay: (day: string) => void;
	availableDays: {
		date: string;
		hasDeath: boolean;
		hasInjury: boolean;
		hasMultipleCasualties: boolean;
	}[];
}

const extractAvailableDays = (): {
	date: string;
	hasDeath: boolean;
	hasInjury: boolean;
	hasMultipleCasualties: boolean;
}[] => {
	const dateMap = new Map<
		string,
		{ hasDeath: boolean; hasInjury: boolean; hasMultipleCasualties: boolean }
	>();

	allCasualtyData.forEach((person) => {
		if (person.date) {
			const date = new Date(person.date);
			const dateStr = date.toISOString().split('T')[0];

			if (!dateMap.has(dateStr)) {
				dateMap.set(dateStr, {
					hasDeath: false,
					hasInjury: false,
					hasMultipleCasualties: false,
				});
			}

			// Get the existing entry and update flags
			const entry = dateMap.get(dateStr)!;
			if (person.type === 'Death') entry.hasDeath = true;
			if (person.type === 'Injury') entry.hasInjury = true;
			if (person.type === 'Multiple Casualties')
				entry.hasMultipleCasualties = true;
		}
	});

	// Convert to an array and sort by date
	return Array.from(dateMap.entries())
		.map(([date, data]) => ({ date, ...data }))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const AVAILABLE_DAYS = extractAvailableDays();
// const DEFAULT_DAY = AVAILABLE_DAYS[AVAILABLE_DAYS.length - 1];

export const useDayStore = create<DayState>((set) => ({
	currentDay: '',
	availableDays: AVAILABLE_DAYS,
	setDay: (day) => set({ currentDay: day }),
}));
