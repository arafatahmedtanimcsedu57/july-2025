'use client';

import { useMemo } from 'react';

import { allCasualtyData } from '@/lib/data';
import { useFilterStore } from '@/lib/filter-store';

import type { CasualtyPerson } from '@/types/data';

export function useFilteredData(): CasualtyPerson[] {
	const { dateFilter, minAgeFilter, maxAgeFilter, typeFilter } =
		useFilterStore();

	return useMemo(() => {
		return allCasualtyData.filter((item) => {
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
	}, [dateFilter, minAgeFilter, maxAgeFilter, typeFilter]);
}
