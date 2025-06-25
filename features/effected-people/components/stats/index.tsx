import React, { useEffect, useState } from "react";

import { FilterControls } from "@/app/filter-control";
import Methodology from "@/app/methodology";
import {
  DonutCharts,
  TotalCasualties,
  DateWiseBarChart,
  ListData,
} from "@/features/effected-people/components/stats/overall";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import FilterContainer from "@/app/filter-container";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { ChevronUp } from "lucide-react";

const VIEWS: Record<string, Record<string, string>> = {
  PERSON_LIST: {
    value: "PERSON_LIST",
    label: "Person List",
  },
  OVERVIEW: {
    value: "OVERVIEW",
    label: "Overview",
  },
} as const;

function Stats() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });

  const [showDrawer, setShowDrawer] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(isTabletOrMobile);

  useEffect(() => {
    setIsMobileScreen(isTabletOrMobile);
    setShowDrawer(!isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <div
      className={classNames(
        "fixed bottom-0 left-2 flex flex-col size-fit w-[260px] xs:min-w-[320px] sm:min-w-[430px] bg-foreground rounded-t-3xl border shadow-lg dark:text-white text-slate-700 transition-all duration-500 ease-in-out",
        {
          // On mobile: open state → full height minus topbar
          "h-[calc(100%-120px)] translate-y-0 ": isMobileScreen && showDrawer,

          // On mobile: closed state → 150px visible
          "h-[150px] translate-y-[calc(100%-150px)]":
            isMobileScreen && !showDrawer,

          // On desktop: always full height minus topbar
          "h-[calc(100%-120px)] translate-y-0": !isMobileScreen,
        }
      )}
    >
      {" "}
      {isMobileScreen && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center bg-white h-8 w-8 shadow-xl rounded-full z-10">
          <button onClick={() => setShowDrawer(!showDrawer)}>
            {showDrawer ? (
              <ChevronUp className="text-slate-800 rotate-180" />
            ) : (
              <ChevronUp className="text-slate-800" />
            )}
          </button>
        </div>
      )}
      <FilterControls />
      <TotalCasualties />
      <Tabs
        className="flex-1 min-h-0 flex flex-col p-10"
        defaultValue={VIEWS.PERSON_LIST.value}
      >
        <TabsList className="grid grid-cols-2 mb-4 sm:w-[250px] m-0">
          {Object.keys(VIEWS).map((view) => {
            return (
              <TabsTrigger key={view} value={VIEWS[view].value}>
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

        <TabsContent
          value={VIEWS.PERSON_LIST.value}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="py-10 flex-1 min-h-0 overflow-auto">
            <ListData />
          </div>
        </TabsContent>
      </Tabs>
      <div className="absolute right-0 top-6 translate-x-[100%]">
        <FilterContainer />
      </div>
      <div className="absolute right-0 top-20 translate-x-[100%]">
        <Methodology />
      </div>
    </div>
  );
}

export default Stats;
