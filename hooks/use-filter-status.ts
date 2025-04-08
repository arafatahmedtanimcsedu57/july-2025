import { useFilterStore } from "@/lib/filter-store";

export function useFilterStatus() {
  const { dateFilter, minAgeFilter, maxAgeFilter, typeFilter, districtFilter } =
    useFilterStore();

  const hasActiveFilters = Boolean(
    dateFilter ||
      districtFilter ||
      minAgeFilter ||
      maxAgeFilter ||
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
