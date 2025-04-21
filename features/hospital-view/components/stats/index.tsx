import React, { type Dispatch, type SetStateAction } from "react";
import FilterContainer from "@/app/filter-container";
import Methodology from "@/app/methodology";
import {
  DonutCharts,
  TabularData,
  TotalCasualties,
} from "@/features/hospital-view/components/stats/overall";
import { Button } from "@/shared/ui/button";
import { ChevronUp } from "lucide-react";

interface StatsProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Stats({ show, setShow }: StatsProps) {
  return (
    <div className="h-full flex flex-col min-w-[430px] bg-foreground rounded-3xl border shadow-lg dark:text-white text-slate-700 relative">
      {/* <Button
        variant="default"
        className="hover:bg-primary px-4 !py-0 !rounded-b-none rounded-t-2xl absolute -top-10 left-[50%] -translate-x-[50%]"
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <ChevronUp />
      </Button> */}

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
