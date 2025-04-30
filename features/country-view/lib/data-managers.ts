import data from '@/features/country-view/data/data_district_wise_injury_death.json';
import type { Casualty } from '@/types/data';

export const dataDistrictWiseInjuryDeath: Casualty[] =
	data.data_district_wise_injury_death;

export const getTotalCases = (): number => {
	return dataDistrictWiseInjuryDeath.reduce(
		(sum, item) => sum + (item?.total_cases || 0),
		0,
	);
};

export const getTotalInjuries = (): number => {
	return dataDistrictWiseInjuryDeath.reduce(
		(sum, item) => sum + (item?.verified_injuries || 0),
		0,
	);
};

export const getTotalDeaths = (): number => {
	return dataDistrictWiseInjuryDeath.reduce(
		(sum, item) => sum + (item?.verified_deaths || 0),
		0,
	);
};

export const getTopNCasesByTotalCases = (n = 3) => {
	const sortedData = [...dataDistrictWiseInjuryDeath];

	sortedData.sort((a, b) => (b?.total_cases || 0) - (a?.total_cases || 0));

	return sortedData.slice(0, n);
};
