'use client';

import { create } from 'zustand';
import { allCasualtyData } from './data';

interface DayState {
	currentDay: string;
	setDay: (day: string) => void;
	nextDay: () => void;
	prevDay: () => void;
	availableDays: string[];
}

// Extract all unique dates from the dataset and sort them chronologically
const extractAvailableDays = (): string[] => {
	// Get all unique dates from the data
	const uniqueDates = new Set<string>();

	allCasualtyData.forEach((person) => {
		if (person.date) {
			const dateStr = new Date(person.date).toISOString().split('T')[0];
			uniqueDates.add(dateStr);
		}
	});

	// Convert to array and sort chronologically
	return Array.from(uniqueDates).sort((a, b) => {
		return new Date(a).getTime() - new Date(b).getTime();
	});
};

// Get available days from the dataset
const AVAILABLE_DAYS = extractAvailableDays();

// Get the middle day as default
const DEFAULT_DAY = AVAILABLE_DAYS[Math.floor(AVAILABLE_DAYS.length / 2)];

export const useDayStore = create<DayState>((set) => ({
	currentDay: DEFAULT_DAY,
	availableDays: AVAILABLE_DAYS,
	setDay: (day) => set({ currentDay: day }),
	nextDay: () =>
		set((state) => {
			const currentIndex = AVAILABLE_DAYS.indexOf(state.currentDay);
			if (currentIndex < AVAILABLE_DAYS.length - 1) {
				return { currentDay: AVAILABLE_DAYS[currentIndex + 1] };
			}
			return state;
		}),
	prevDay: () =>
		set((state) => {
			const currentIndex = AVAILABLE_DAYS.indexOf(state.currentDay);
			if (currentIndex > 0) {
				return { currentDay: AVAILABLE_DAYS[currentIndex - 1] };
			}
			return state;
		}),
}));
