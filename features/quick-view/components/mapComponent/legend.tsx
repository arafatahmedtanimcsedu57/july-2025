import React from "react";

import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
} from "@/constant/casualty-types";

function Legend() {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(CASUALTY_ITEMS)
        .filter(([_, value]) => CASUALTY_ITEMS_COLOR_ELEMENTS[value]())
        .map(([key, value]) => (
          <div key={`${value}_${key}`} className="flex items-center gap-1">
            {CASUALTY_ITEMS_COLOR_ELEMENTS[value]!()}
            <p className="text-xs dark:text-white text-slate-700">{value}</p>
          </div>
        ))}
    </div>
  );
}

export { Legend };
