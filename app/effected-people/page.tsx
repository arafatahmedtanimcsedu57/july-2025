"use client";

import Image from "next/image";

import MapContainer from "@/features/effected-people/components/map-container";
import Header from "@/features/effected-people/components/header";
import {
  // DonutCharts,
  // TabularData,
  // TopNCasesByTotalCases,
  TotalCasualties,
} from "@/features/effected-people/components/stats/overall";

import Logo from "@/public/logo.png";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background h-[100vh] overflow-hidden">
      <div className="flex h-full">
        <div className="w-[50px] flex flex-col bg-foreground justify-between items-center shadow-2xl z-[100] py-11">
          <Image src={Logo} alt="brand" width={40} height={40} />

          <div></div>
        </div>

        <div className=" text-slate-600 h-full relative">
          <div className="absolute z-10 backdrop-blur-[1px] overflow-auto scrollbar-hide h-full flex flex-col gap-4">
            <Header />
            <div className="flex-1  flex flex-col  p-10 gap-16 ">
              <TotalCasualties />
              {/* <div className="w-max flex flex-wrap gap-10">
                <DonutCharts />
              </div>

              <TabularData />
              <TopNCasesByTotalCases /> */}
            </div>
          </div>
        </div>

        <div className="flex-1  h-full">
          <MapContainer />
        </div>
      </div>
    </main>
  );
}
