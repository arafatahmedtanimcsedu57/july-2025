"use client";

import MapContainer from "@/components/map-container";
import IncidentSidebar from "@/components/incidentSidebar";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CASUALTY } from "@/constant/casualty-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useFilterStore } from "@/lib/filter-store";
import { useIncidentStore } from "@/lib/incident-store";
import { useSidebarStore } from "@/lib/sidebar-store";
import {
  getTotalCases,
  getTotalDeaths,
  getTotalInjuries,
} from "@/lib/data_district_wise_injury_death";
import DonutChart from "@/components/ui/donut-chart";

export default function Home() {
  const { casualtyTypeFilter, setCasualtyTypeFilter, resetFilters } =
    useFilterStore();
  const { setSelectedIncident } = useIncidentStore();
  const { close } = useSidebarStore();

  const handleCasualtyTypeFilter = (casualtyType: string) => {
    if (casualtyTypeFilter !== casualtyType) {
      setSelectedIncident(null);
      resetFilters();
      close();
      setCasualtyTypeFilter(casualtyType);
    }
  };

  const deathsDonutChartConfig = [
    { label: "Deaths", value: getTotalDeaths(), color: "#bb4110" },
    { label: "Total Casualties", value: getTotalCases(), color: "#e2e0df" },
  ];

  const deathPercentage =
    (
      (getTotalDeaths() / (getTotalDeaths() + getTotalInjuries())) *
      100
    ).toFixed(1) + "%";

  const injuriesDonutChartConfig = [
    { label: "Injuries", value: getTotalInjuries(), color: "#d8af81" },
    { label: "Total Casualties", value: getTotalCases(), color: "#e2e0df" },
  ];

  const injuriesPercentage =
    (
      (getTotalInjuries() / (getTotalDeaths() + getTotalInjuries())) *
      100
    ).toFixed(1) + "%";

  return (
    <main className="flex flex-1 flex-col bg-background h-[100vh]">
      {/* <Navbar /> */}
      <div className="flex h-full">
        <div className="w-[50px] flex flex-col bg-foreground justify-center items-center shadow-2xl z-[100]">
          {CASUALTY.map((casualty) => (
            <TooltipProvider key={casualty.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    key={casualty.name}
                    onClick={() => handleCasualtyTypeFilter(casualty.value)}
                    className={`text-slate-600 dark:text-white ${
                      casualtyTypeFilter === casualty.value ? "bg-muted" : ""
                    }`}
                  >
                    <casualty.icon />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{casualty.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="bg-red-200 text-slate-600  absolute z-[1] w-0 ml-[48px]">
          <div className="flex flex-col p-10">
            <h5 className="text-xl font-medium w-max">July Memorial</h5>
            <p className="text-xs font-light w-max">Remembering July 2024</p>
          </div>

          <div className="flex flex-col p-10">
            <h5 className="text-xs w-max">Total Casualties</h5>
            <p className="text-4xl font-semibold w-max">
              {getTotalCases().toLocaleString()}
            </p>

            <div className="py-10 w-max flex gap-10">
              <div className="flex gap-2 items-center">
                <DonutChart
                  data={deathsDonutChartConfig}
                  size={56}
                  thickness={3}
                  innerText={deathPercentage}
                />

                <div>
                  <h1 className="text-xs font-semibold">{getTotalDeaths()}</h1>
                  <p className="text-xs">Deaths</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <DonutChart
                  data={injuriesDonutChartConfig}
                  size={56}
                  thickness={3}
                  innerText={injuriesPercentage}
                />

                <div>
                  <h1 className="text-xs font-semibold">
                    {getTotalInjuries()}
                  </h1>
                  <p className="text-xs">Injuries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-full border">
          <MapContainer />
        </div>
      </div>
    </main>
  );
}
