import { format } from 'date-fns';
import { CASUALTY_ITEMS } from '@/constant/casualty-types';
import type { EffectedPerson } from '@/types/data';

const API_ENDPOINT =
	'http://localhost:3000/api/individual-incidents?depth=0&draft=true&limit=10000';

async function fetchData(): Promise<EffectedPerson[]> {
	try {
		const response = await fetch(API_ENDPOINT);
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			throw new Error(`Failed to fetch data. Status code: ${response.status}`);
		}
		const data = await response.json();

		// Transform the data
		const transformedData = data.docs.map((item: any) => ({
			id: item.id,
			graphicLevel: item.graphicLevel || null,
			name: item.name,
			gender: item.gender,
			age: item.age,
			occupation: item.occupation,
			type: item.type,
			location: item.location,
			district: item.district,
			summary: null,
			mediaLinks: item.mediaLinks.map((link: any) => link.url),
			lat: item.lat,
			lng: item.lng,
			locationCoordinates: `${item.lat}, ${item.lng}`,
			date: new Date(item.date).getTime(),
		}));

		return transformedData;
	} catch (error: any) {
		console.error('Failed to fetch data:', error.message);
		return [];
	}
}

let dataEffectedPeople: EffectedPerson[] = [];

export const getTotalEffectedPeople = async (data: EffectedPerson[]) => {
	try {
		return data.reduce((sum) => sum + 1, 0);
	} catch (error) {
		console.error('Error in getTotalEffectedPeople:', error);
		return 0;
	}
};

export const getTotalDeadPeople = async (data: EffectedPerson[]) => {
	try {
		return (
			data.filter((person) => person.type === CASUALTY_ITEMS.DEATH).length || 0
		);
	} catch (error) {
		console.error('Error in getTotalDeadPeople:', error);
		return 0;
	}
};

export const getTotalInjuredPeople = async (data: EffectedPerson[]) => {
	try {
		return (
			data.filter((person) => person.type === CASUALTY_ITEMS.INJURY).length || 0
		);
	} catch (error) {
		console.error('Error in getTotalInjuredPeople:', error);
		return 0;
	}
};

export const getGroupedByDateData = async (data: EffectedPerson[]) => {
	// console.log(data);
	try {
		return data.reduce(
			(acc, person) => {
				// console.log(person);
				if (!person.date) return acc;

				const dateStr = format(new Date(person.date), 'yyyy-MM-dd');
				// console.log(dateStr);

				if (!acc[dateStr]) {
					acc[dateStr] = {
						date: dateStr,
						displayDate: format(new Date(person.date), 'MMM d'),
						timestamp: person.date,
						deaths: 0,
						injuries: 0,
					};
				}

				if (person.type === CASUALTY_ITEMS.DEATH) acc[dateStr].deaths += 1;
				else if (person.type === CASUALTY_ITEMS.INJURY)
					acc[dateStr].injuries += 1;

				return acc;
			},
			{} as Record<
				string,
				{
					date: string;
					displayDate: string;
					timestamp: number;
					deaths: number;
					injuries: number;
				}
			>,
		);
	} catch (error) {
		console.error('Error in getGroupedByDateData:', error);
		return {};
	}
};

export const extractAvailableDays = async (): Promise<
	{
		date: string;
		[CASUALTY_ITEMS.DEATH]: boolean;
		[CASUALTY_ITEMS.INJURY]: boolean;
		[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
	}[]
> => {
	try {
		if (dataEffectedPeople.length === 0) {
			dataEffectedPeople = await fetchData();
		}
		const dateMap = new Map<
			string,
			{
				[CASUALTY_ITEMS.DEATH]: boolean;
				[CASUALTY_ITEMS.INJURY]: boolean;
				[CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
			}
		>();

		if (dataEffectedPeople && dataEffectedPeople.length > 0) {
			dataEffectedPeople.forEach((person) => {
				if (person.date) {
					const date = new Date(person.date);
					const dateStr = date.toLocaleDateString().split('T')[0];

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
		}

		// Convert to an array and sort by date
		return Array.from(dateMap.entries())
			.map(([date, data]) => ({ date, ...data }))
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	} catch (error) {
		console.error('Error in extractAvailableDays:', error);
		return [];
	}
};

export const extractUniqueDistricts = async () => {
	try {
		if (dataEffectedPeople.length === 0) {
			dataEffectedPeople = await fetchData();
		}
		// Use a Set to automatically handle uniqueness
		const uniqueDistricts = new Set();

		// Iterate through the data and add each district to the Set
		dataEffectedPeople.forEach((person) => {
			if (person.district) {
				uniqueDistricts.add(person.district);
			}
		});

		return Array.from(uniqueDistricts)
			.sort()
			.map((item) => ({
				name: item,
				value: item,
			}));
	} catch (error) {
		console.error('Error in extractUniqueDistricts:', error);
		return [];
	}
};

export const getDataEffectedPeople = async () => {
	try {
		if (dataEffectedPeople.length === 0) {
			dataEffectedPeople = await fetchData();
		}
		return dataEffectedPeople;
	} catch (error) {
		console.error('Error in getDataEffectedPeople:', error);
		return [];
	}
};
