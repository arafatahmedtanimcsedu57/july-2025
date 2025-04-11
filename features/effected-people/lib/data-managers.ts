import { format } from 'date-fns';

import data from '@/features/effected-people/data/data_effected_people.json';
import { CASUALTY_ITEMS } from '@/constant/casualty-types';
import type { EffectedPerson } from '@/types/data';

export const getTotalEffectedPeople = (data = dataEffectedPeople) => {
	return data.reduce((sum) => sum + 1, 0);
};

export const getTotalDeadPeople = (data = dataEffectedPeople) => {
	return (
		data.filter((person) => person.type === CASUALTY_ITEMS.DEATH).length || 0
	);
};

export const getTotalInjuredPeople = (data = dataEffectedPeople) => {
	return (
		data.filter((person) => person.type === CASUALTY_ITEMS.INJURY).length || 0
	);
};

export const getGroupedByDateData = (data = dataEffectedPeople) => {
	return data.reduce((acc, person) => {
		if (!person.date) return acc;

		const dateStr = format(new Date(person.date), 'yyyy-MM-dd');

		if (!acc[dateStr]) {
			acc[dateStr] = {
				date: dateStr,
				displayDate: format(new Date(person.date), 'MMM d'),
				timestamp: person.date,
				deaths: 0,
				injuries: 0,
			};
		}

		if (person.type === CASUALTY_ITEMS.DEATH) {
			acc[dateStr].deaths += 1;
		} else if (person.type === CASUALTY_ITEMS.INJURY) {
			acc[dateStr].injuries += 1;
		}

		return acc;
	}, {} as Record<string, { date: string; displayDate: string; timestamp: number; deaths: number; injuries: number }>);
};
export const dataEffectedPeople: EffectedPerson[] = data.data_effected_people;
