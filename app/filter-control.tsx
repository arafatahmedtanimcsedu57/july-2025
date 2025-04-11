"use client";

import { X } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/shared/ui/badge";

import { useFilterStatus } from "@/features/effected-people/hooks/use-filter-status";
import { useFilterStore } from "@/features/effected-people/store/filter-store";

export function FilterControls() {
  const { hasActiveFilters } = useFilterStatus();
  const {
    dateFilter,
    minAgeFilter,
    maxAgeFilter,
    typeFilter,
    districtFilter,
    setDateFilter,
    setMinAgeFilter,
    setMaxAgeFilter,
    setTypeFilter,
    setDistrictFilter,
  } = useFilterStore();

  return hasActiveFilters ? (
    <div className="w-full p-10  flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {dateFilter && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 shadow-xl"
          >
            Date: {format(dateFilter, "PPP")}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setDateFilter(null)}
            />
          </Badge>
        )}
        {minAgeFilter && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 shadow-xl"
          >
            Min Age: {minAgeFilter}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setMinAgeFilter("")}
            />
          </Badge>
        )}
        {maxAgeFilter && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 shadow-xl"
          >
            Max Age: {maxAgeFilter}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setMaxAgeFilter("")}
            />
          </Badge>
        )}
        {typeFilter && typeFilter !== "all" && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 shadow-xl"
          >
            Type: {typeFilter}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setTypeFilter("all")}
            />
          </Badge>
        )}

        {districtFilter && districtFilter !== "all" && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 shadow-xl"
          >
            District: {districtFilter}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setDistrictFilter("all")}
            />
          </Badge>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
