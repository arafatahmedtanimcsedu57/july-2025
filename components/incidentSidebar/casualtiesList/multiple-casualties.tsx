import React from "react";

import type { CasualtyPerson } from "@/types/data";

const Casualty = ({ person }: { person: CasualtyPerson }) => {
  return (
    <>
      <div className="text-xs text-muted-foreground flex flex-col">
        <span>{person.location || "Unknown location"}</span>
      </div>
    </>
  );
};

export const MultipleCasualty = React.memo(Casualty);
