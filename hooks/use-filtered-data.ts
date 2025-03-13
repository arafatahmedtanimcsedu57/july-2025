'use client';

import { useMemo } from 'react';

import { allCasualtyData } from '@/lib/data';
import { useFilterStore } from '@/lib/filter-store';

import type { CasualtyPerson } from '@/types/data';
import { CASUALTY_TYPES } from '@/constant/casualty-types';

export function useFilteredData(): CasualtyPerson[] {
	const {
		dateFilter,
		minAgeFilter,
		maxAgeFilter,
		typeFilter,
		casualtyTypeFilter,
	} = useFilterStore();

	return useMemo(() => {
		return allCasualtyData.filter((item) => {
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

			// Date filter
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

			// Min age filter
			if (
				minAgeFilter &&
				item.age &&
				item.age < Number.parseInt(minAgeFilter)
			) {
				return false;
			}

			// Max age filter
			if (
				maxAgeFilter &&
				item.age &&
				item.age > Number.parseInt(maxAgeFilter)
			) {
				return false;
			}

			// Type filter
			if (typeFilter !== 'all' && item.type && item.type !== typeFilter) {
				return false;
			}

			return true;
		});
	}, [dateFilter, minAgeFilter, maxAgeFilter, typeFilter, casualtyTypeFilter]);
}
