'use client';

import { create } from 'zustand';

import { allCasualtyData } from './data';
import { CASUALTY_ITEMS } from '@/constant/casualty-types';

interface DayState {
	currentDay: string;
	setDay: (day: string) => void;
	availableDays: {
		date: string;
		[CASUALTY_ITEMS.DEATH]: boolean;
		[CASUALTY_ITEMS.INJURY]: boolean;
		[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
	}[];
}

const extractAvailableDays = (): {
	date: string;
	[CASUALTY_ITEMS.DEATH]: boolean;
	[CASUALTY_ITEMS.INJURY]: boolean;
	[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
}[] => {
	const dateMap = new Map<
		string,
		{
			[CASUALTY_ITEMS.DEATH]: boolean;
			[CASUALTY_ITEMS.INJURY]: boolean;
			[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
		}
	>();

	allCasualtyData.forEach((person) => {
		if (person.date) {
			const date = new Date(person.date);
			const dateStr = date.toISOString().split('T')[0];

			if (!dateMap.has(dateStr)) {
				dateMap.set(dateStr, {
					[CASUALTY_ITEMS.DEATH]: false,
					[CASUALTY_ITEMS.INJURY]: false,
					[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: false,
				});
			}

			// Get the existing entry and update flags
			const entry = dateMap.get(dateStr)!;
			if (person.type === CASUALTY_ITEMS.DEATH)
				entry[CASUALTY_ITEMS.DEATH] = true;
			if (person.type === CASUALTY_ITEMS.INJURY)
				entry[CASUALTY_ITEMS.INJURY] = true;
			if (person.type === CASUALTY_ITEMS.MULTIPLE_CASUALTIES)
				entry[CASUALTY_ITEMS.MULTIPLE_CASUALTIES] = true;
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
