import { useFilterStore } from "@/features/effected-people/store/filter-store";

export function useFilterStatus() {
  const { dateFilter, minAgeFilter, maxAgeFilter, typeFilter, districtFilter } =
    useFilterStore();

  const hasActiveFilters = Boolean(
    dateFilter ||
      minAgeFilter ||
      maxAgeFilter ||
      (districtFilter && districtFilter !== "all") ||
      (typeFilter && typeFilter !== "all")
  );

  return {
    hasActiveFilters,
    hasDateFilter: Boolean(dateFilter),
    hasMinAgeFilter: Boolean(minAgeFilter),
    hasMaxAgeFilter: Boolean(maxAgeFilter),
    hasTypeFilter: Boolean(typeFilter && typeFilter !== "all"),
    hasDistrictFilter: Boolean(districtFilter && districtFilter !== "all"),
  };
}
