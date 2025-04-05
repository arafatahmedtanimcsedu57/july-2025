'use client';

import { useMemo } from 'react';

import { allCasualtyData } from '@/lib/data';
import { dataDistrictWiseInjuryDeath } from '@/lib/data_district_wise_injury_death';
import { useFilterStore } from '@/lib/filter-store';

import { CASUALTY_TYPES } from '@/constant/casualty-types';
import type { CasualtyPerson } from '@/types/data';

export function useFilteredData(): CasualtyPerson[] {
	const {
		dateFilter,
		minAgeFilter,
		maxAgeFilter,
		typeFilter,
		casualtyTypeFilter,
	} = useFilterStore();

	return useMemo(() => {
		// Important
		return [...allCasualtyData, ...dataDistrictWiseInjuryDeath].filter(
			(item) => {
				if (casualtyTypeFilter && item.type) {
					const _type = item.type ? item.type.toLocaleUpperCase() : '';

					if (casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE) {
						if (!_type.includes(CASUALTY_TYPES.MULTIPLE)) {
							return false;
						}
					}

					if (casualtyTypeFilter !== CASUALTY_TYPES.MULTIPLE) {
						if (_type.includes(CASUALTY_TYPES.MULTIPLE)) {
							return false;
						}
					}
				}

				if (dateFilter && item.date) {
					const itemDate = new Date(item.date);
					const filterDate = new Date(dateFilter);

					if (
						itemDate.getDate() !== filterDate.getDate() ||
						itemDate.getMonth() !== filterDate.getMonth() ||
						itemDate.getFullYear() !== filterDate.getFullYear()
					) {
						return false;
					}
				}

				if (
					minAgeFilter &&
					item.age &&
					item.age < Number.parseInt(minAgeFilter)
				) {
					return false;
				}

				if (
					maxAgeFilter &&
					item.age &&
					item.age > Number.parseInt(maxAgeFilter)
				) {
					return false;
				}

				if (typeFilter !== 'all' && item.type && item.type !== typeFilter) {
					return false;
				}

				return true;
			},
		);
	}, [dateFilter, minAgeFilter, maxAgeFilter, typeFilter, casualtyTypeFilter]);
}
