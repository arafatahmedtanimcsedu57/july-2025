"use client";

import { useMemo } from "react";

import { dataEffectedPeople } from "@/features/effected-people/lib/data-managers";
import { useFilterStore } from "@/features/effected-people/store/filter-store";

import type { EffectedPerson } from "@/types/data";

export function useFilteredData(): EffectedPerson[] {
  const { dateFilter, minAgeFilter, maxAgeFilter, typeFilter, districtFilter } =
    useFilterStore();

  return useMemo(() => {
    return dataEffectedPeople.filter((item) => {
      if (
        districtFilter.toLocaleUpperCase() !== "ALL" &&
        item.district &&
        item.district.toLocaleUpperCase() !== districtFilter.toLocaleUpperCase()
      ) {
        return false;
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
      if (
        typeFilter.toLocaleUpperCase() !== "ALL" &&
        item.type &&
        item.type.toLocaleUpperCase() !== typeFilter.toLocaleUpperCase()
      ) {
        return false;
      }
      return true;
    });
  }, [dateFilter, minAgeFilter, maxAgeFilter, typeFilter, districtFilter]);
}
