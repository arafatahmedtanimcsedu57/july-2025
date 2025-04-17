import React from "react";
import FilterContainer from "@/app/filter-container";
import Methodology from "@/app/methodology";
import {
  DonutCharts,
  TabularData,
  TotalCasualties,
} from "@/features/quick-view/components/stats/overall";

export default function Stats() {
  return (
    <div className="h-full flex flex-col min-w-[430px] bg-foreground rounded-3xl border shadow-lg dark:text-white text-slate-700 relative">
      {/* Top section: Total Casualties */}
      <TotalCasualties />

      {/* Middle section: donut charts + scrollable table */}
      <div className="flex-1 min-h-0 flex flex-col p-10">
        {/* Donut Charts */}
        <div className="flex flex-wrap gap-10 mb-10">
          <DonutCharts />
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 min-h-0 overflow-auto">
          <TabularData />
        </div>
      </div>

      {/* Right-side panels */}
      <div className="absolute right-0 top-6 translate-x-[100%]">
        <FilterContainer />
      </div>

      <div className="absolute right-0 top-20 translate-x-[100%]">
        <Methodology />
      </div>
    </div>
  );
}
