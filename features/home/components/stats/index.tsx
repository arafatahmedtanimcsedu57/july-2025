import React from "react";

import {
  DonutCharts,
  TabularData,
  TotalCasualties,
} from "@/features/home/components/stats/overall";
import FilterContainer from "@/app/filter-container";

function Stats() {
  return (
    <div className="min-w-[430px] bg-foreground rounded-3xl border shadow-lg overflow-auto h-[100vh] scrollbar-hide dark:text-white text-slate-700">
      <TotalCasualties />

      <div className="p-10 flex-1 flex flex-col">
        <div className="w-max flex flex-wrap gap-10 mb-10">
          <DonutCharts />
        </div>

        <div className="w-max flex flex-wrap gap-10 mb-10">
          <TabularData />
        </div>
      </div>

      <div className="absolute right-0 top-6 translate-x-[100%]">
        <FilterContainer />
      </div>
    </div>
  );
}

export default Stats;
