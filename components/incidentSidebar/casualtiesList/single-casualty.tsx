import React from "react";
import { Edit } from "lucide-react";

import { calculateCompleteness } from "@/utilities/person-info-completeness";
import type { CasualtyPerson } from "@/types/data";

const Casualty = ({ person }: { person: CasualtyPerson }) => {
  const completeness = calculateCompleteness(person);
  const updateNeeded = completeness < 100;

  return (
    <>
      <div className="flex gap-4 flex-wrap items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-sm">
          {person.name || "Unknown"}
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          {person.type || "Unknown"}
        </div>
      </div>

      <div className="text-xs text-muted-foreground flex flex-col">
        <span>
          {person.occupation || "Unknown occupation"}
          {person.age ? `, ${person.age} years` : ""}
        </span>

        <span>{person.location || "Unknown location"}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-full h-1 bg-muted rounded overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${completeness}%` }}
          ></div>
        </div>

        {updateNeeded ? (
          <span className="w-fit inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300 self-end">
            <Edit className="h-2.5 w-2.5 mr-0.5" /> Update Needed
          </span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const SingleCasualty = React.memo(Casualty);
