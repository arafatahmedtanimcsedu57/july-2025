import React, { useCallback, memo } from "react";

import { SingleCasualtyStats } from "./single-casualty-stats";
import { MultipleCasualtyStats } from "./multiple-casualty-stats";

import { useFilterStore } from "@/lib/filter-store";
import { useFilteredData } from "@/hooks/use-filtered-data";

import { CASUALTY_ITEMS, CASUALTY_TYPES } from "@/constant/casualty-types";

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
        [CASUALTY_ITEMS.DEATH]: 0,
        [CASUALTY_ITEMS.INJURY]: 0,
        [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: 0,
        [CASUALTY_ITEMS.NO_CASUALTIES]: 0,
        total: 0,
      } as Record<string, number>
    );
  }, [filteredData])();

  return (
    <div className="grid grid-cols-1 gap-3 bg-transparent p-4 border-b border-dashed">
      {casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE ? (
        <MultipleCasualtyStats totals={totals} />
      ) : (
        <SingleCasualtyStats totals={totals} />
      )}
    </div>
  );
};

export const SummaryStats = memo(Stats);
