import React, { useState } from "react";

import { SingleCasualty } from "./single-casualty";
import { MultipleCasualty } from "./multiple-casualties";
import { Button } from "@/components/ui/button";

import { useFilteredData } from "@/hooks/use-filtered-data";
import { useFilterStore } from "@/lib/filter-store";
import { useIncidentStore } from "@/lib/incident-store";

import { CASUALTY_TYPES } from "@/constant/casualty-types";

const CasualtiesList = React.memo(() => {
  const [showAll, setShowAll] = useState(false);
  const filteredData = useFilteredData();
  const { casualtyTypeFilter } = useFilterStore();
  const { setSelectedIncident } = useIncidentStore();

  const CASUALTY_COUNT = filteredData.length;
  const MIN_CASUALTY_INITIAL_LOAD = 5;

  const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-4">
        {isMultipleCasualties ? "Multiple Casualties" : "Affected Individuals"}
      </h3>
      <div className="flex flex-col gap-2">
        {filteredData
          .slice(0, showAll ? CASUALTY_COUNT : MIN_CASUALTY_INITIAL_LOAD)
          .map((person) => {
            return (
              <div
                key={person.id}
                className="flex flex-col gap-2 p-4 rounded-md border hover:bg-muted cursor-pointer transition-colors"
                onClick={() => setSelectedIncident(person)}
              >
                {!isMultipleCasualties ? (
                  <SingleCasualty person={person} />
                ) : (
                  <MultipleCasualty person={person} />
                )}
              </div>
            );
          })}
        {CASUALTY_COUNT > MIN_CASUALTY_INITIAL_LOAD && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "Show fewer casualties"
              : `View all ${CASUALTY_COUNT} casualties`}
          </Button>
        )}
      </div>
    </div>
  );
});

export { CasualtiesList };
