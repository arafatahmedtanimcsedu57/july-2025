import React from "react";

import {
  DonutCharts,
  TabularData,
  TopNCasesByTotalCases,
  TotalCasualties,
} from "@/features/home/components/stats/overall";

function Stats() {
  return (
    <div className="min-w-[430px] bg-foreground rounded-xl shadow-lg overflow-auto scrollbar-hide h-[100vh] dark:text-white text-slate-700">
      <TotalCasualties />

      <div className="p-10 flex-1 flex flex-col">
        <div className="w-max flex flex-wrap gap-10 mb-10">
          <DonutCharts />
        </div>

        <div className="w-max flex flex-wrap gap-10 mb-10">
          <TabularData />
        </div>

        <TopNCasesByTotalCases />
      </div>
    </div>
  );
}

export default Stats;
