import React from "react";

import type { CasualtyPerson } from "@/types/data";
import { useFilterStore } from "@/lib/filter-store";
import { CASUALTY_TYPES } from "@/constant/casualty-types";
import { Separator } from "@/components/ui/separator";
import { useIncidentStore } from "@/lib/incident-store";

const Casualty = ({ person }: { person: CasualtyPerson }) => {
  const { casualtyTypeFilter } = useFilterStore();
  const { selectedIncident, setSelectedIncident } = useIncidentStore();

  const { total_injuries, total_deaths, total_cases } = person;
  const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

  return (
    <>
      <div className="text-xs text-muted-foreground flex flex-col">
        <span>{person.district || "Unknown location"}</span>

        {selectedIncident?.district === person.district ? (
          <>
            {isMultipleCasualties && (total_injuries || total_deaths) ? (
              <div className="text-xs flex flex-row gap-2">
                {total_cases ? (
                  <div>
                    <span>Total Cases:</span>{" "}
                    <span className="text-muted-foreground">{total_cases}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            <Separator className="my-4 bg-background" />
            {isMultipleCasualties && (total_injuries || total_deaths) ? (
              <div className="text-xs flex flex-row gap-2">
                {total_injuries ? (
                  <div>
                    <span>Injuries:</span>{" "}
                    <span className="text-muted-foreground">
                      {total_injuries}
                    </span>
                  </div>
                ) : (
                  <></>
                )}

                {total_deaths ? (
                  <div>
                    <span>Deaths:</span>{" "}
                    <span className="text-muted-foreground">
                      {total_deaths}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const MultipleCasualty = React.memo(Casualty);
