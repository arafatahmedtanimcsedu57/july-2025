import { useFilterStore } from '@/lib/filter-store';

export function useFilterStatus() {
	const { dateFilter, minAgeFilter, maxAgeFilter, typeFilter } =
		useFilterStore();

	const hasActiveFilters = Boolean(
		dateFilter ||
			minAgeFilter ||
			maxAgeFilter ||
			(typeFilter && typeFilter !== 'all'),
	);

	return {
		hasActiveFilters,
		hasDateFilter: Boolean(dateFilter),
		hasMinAgeFilter: Boolean(minAgeFilter),
		hasMaxAgeFilter: Boolean(maxAgeFilter),
		hasTypeFilter: Boolean(typeFilter && typeFilter !== 'all'),
	};
}
