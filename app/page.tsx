"use client";

import MapContainer from "@/components/map-container";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import {
  DonutCharts,
  TabularData,
  TopNCasesByTotalCases,
  TotalCasualties,
} from "@/components/stats/overall";

import { useFilterStore } from "@/lib/filter-store";
import { useIncidentStore } from "@/lib/incident-store";
import { useSidebarStore } from "@/lib/sidebar-store";

import { CASUALTY } from "@/constant/casualty-types";

import Logo from "@/public/logo.png";
import Image from "next/image";

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

  return (
    <main className="flex flex-1 flex-col bg-background h-[100vh] overflow-hidden">
      {/* <Navbar /> */}
      <div className="flex h-full">
        <div className="w-[50px] flex flex-col bg-foreground justify-between items-center shadow-2xl z-[100] py-11">
          <Image src={Logo} alt="brand" width={40} height={40} />

          <div>
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

          <div></div>
        </div>

        <div className=" text-slate-600 h-full relative">
          <div className="absolute z-[1] overflow-auto scrollbar-hide h-full flex flex-col justify-between">
            <Header />

            <div className="flex-1 flex flex-col justify-between p-10 gap-16 ">
              <TotalCasualties />
              <div className="w-max flex flex-wrap gap-10">
                <DonutCharts />
              </div>

              <TabularData />
              <TopNCasesByTotalCases />
            </div>
          </div>
        </div>

        <div className="flex w-full h-full">
          <MapContainer />
        </div>
      </div>
    </main>
  );
}
