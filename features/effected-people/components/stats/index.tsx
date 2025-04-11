import React from "react";

import { FilterControls } from "@/app/filter-control";
import Header from "@/app/header";
import {
  DonutCharts,
  TotalCasualties,
  DateWiseBarChart,
  ListData,
} from "@/features/effected-people/components/stats/overall";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const VIEWS: Record<string, Record<string, string>> = {
  OVERVIEW: {
    value: "OVERVIEW",
    label: "Overview",
  },
  PERSON_LIST: {
    value: "PERSON_LIST",
    label: "Person List",
  },
} as const;

function Stats() {
  return (
    <div className="w-[330px] bg-foreground rounded-xl shadow-lg overflow-auto scrollbar-hide h-[100vh] dark:text-white text-slate-700">
      <Header />

      <FilterControls />

      <TotalCasualties />

      <Tabs
        className="flex-1 flex flex-col px-10 "
        defaultValue={VIEWS.OVERVIEW.value}
      >
        <TabsList className="grid grid-cols-2 mb-4 w-[250px] m-0 rounded-xl">
          {Object.keys(VIEWS).map((view) => {
            return (
              <TabsTrigger
                key={view}
                value={VIEWS[view].value}
                className="rounded-xl text-slate-700 dark:text-white data-[state=active]:text-primary"
              >
                {VIEWS[view].label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value={VIEWS.OVERVIEW.value}>
          <div className="py-10 flex-1 flex flex-col">
            <div className="w-max flex flex-wrap gap-10 mb-10">
              <DonutCharts />
            </div>

            <DateWiseBarChart />
          </div>
        </TabsContent>
        <TabsContent value={VIEWS.PERSON_LIST.value}>
          <div className="py-10 flex-1 flex flex-col">
            <ListData />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Stats;
