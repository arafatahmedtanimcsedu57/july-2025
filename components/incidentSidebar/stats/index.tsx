import React, { useCallback, memo } from 'react';

import { SingleCasualtyStats } from './single-casualty-stats';
import { MultipleCasualtyStats } from './multiple-casualty-stats';

import { useFilterStore } from '@/lib/filter-store';
import { useFilteredData } from '@/hooks/use-filtered-data';

import { CASUALTY_TYPES } from '@/constant/casualty-types';

const Stats = () => {
	const { casualtyTypeFilter } = useFilterStore();
	const filteredData = useFilteredData();

	const totals = useCallback(() => {
		return filteredData.reduce(
			(acc, person) => {
				if (person.type) {
					acc[person.type]++;
				}
				acc.total++;
				return acc;
			},
			{
				Death: 0,
				Injury: 0,
				'Multiple Casualties': 0,
				'No Casualties': 0,
				total: 0,
			} as Record<string, number>,
		);
	}, [filteredData])();

	return (
		<div className="grid grid-cols-2 gap-3 bg-transparent p-4 border-b border-dashed">
			{casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE ? (
				<MultipleCasualtyStats totals={totals} />
			) : (
				<SingleCasualtyStats totals={totals} />
			)}
		</div>
	);
};

export const SummaryStats = memo(Stats);
