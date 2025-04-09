"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import DonutChart from "@/components/ui/donut-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { getTopNCasesByTotalCases } from "@/lib/data_district_wise_injury_death";
import {
  getTotalCases,
  getTotalDeaths,
  getTotalInjuries,
  dataDistrictWiseInjuryDeath,
} from "@/lib/data_district_wise_injury_death";
import { useSelectedCasualtyStore } from "@/lib/selected-casualty-store";

const total = getTotalCases();
const deathCount = getTotalDeaths();
const injuryCount = getTotalInjuries();
const deathPercentage = ((deathCount / total) * 100).toFixed(1) + "%";
const injuriesPercentage = ((injuryCount / total) * 100).toFixed(1) + "%";
const topNCasesByTotalCases = getTopNCasesByTotalCases();

const donutChartsConfig = () => {
  return [
    {
      chart: {
        data: [
          { label: "Deaths", value: deathCount, color: "#bb4110" },
          {
            label: "Total Casualties",
            value: total,
            color: "#e2e0df",
          },
        ],

        size: 56,
        thickness: 3,
        innerText: deathPercentage,
      },
      legend: {
        label: "Deaths",
        value: deathCount,
      },
    },

    {
      chart: {
        data: [
          { label: "Injuries", value: injuryCount, color: "#de813c" },
          {
            label: "Total Casualties",
            value: total,
            color: "#e2e0df",
          },
        ],

        size: 56,
        thickness: 3,
        innerText: injuriesPercentage,
      },
      legend: {
        label: "Injuries",
        value: injuryCount,
      },
    },
  ];
};

const TotalCasualties = () => {
  return (
    <div>
      <h5 className="text-xs w-max">Total Casualties</h5>
      <p className="text-4xl font-semibold w-max">{total.toLocaleString()}</p>
    </div>
  );
};

const DonutCharts = () => {
  return (
    <>
      {donutChartsConfig().map((donutChart) => (
        <div
          className="flex flex-wrap gap-2 items-center"
          key={donutChart.legend.label}
        >
          <DonutChart
            data={donutChart.chart.data}
            size={donutChart.chart.size}
            thickness={donutChart.chart.thickness}
            innerText={donutChart.chart.innerText}
          />

          <div>
            <h1 className="text-xs font-semibold">{donutChart.legend.value}</h1>
            <p className="text-xs">{donutChart.legend.label}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const TabularData = () => {
  const { selectedCasualty, toggleSelectedCasualty } =
    useSelectedCasualtyStore();
  const [showAll, setShowAll] = useState(false);

  const displayData = showAll
    ? dataDistrictWiseInjuryDeath
    : dataDistrictWiseInjuryDeath.slice(0, 3);

  return (
    <div className="space-y-2">
      <Table className="text-[14px]">
        <TableHeader className="text-[10px]">
          <TableRow>
            <TableHead className="h-4 whitespace-nowrap uppercase font-mono font-bold">
              District
            </TableHead>
            <TableHead className="h-4 whitespace-nowrap uppercase font-mono font-bold">
              Total Cases
            </TableHead>
            <TableHead className="h-4 whitespace-nowrap uppercase font-mono font-bold">
              Deaths
            </TableHead>
            <TableHead className="h-4 whitespace-nowrap uppercase font-mono font-bold text-right">
              Injuries
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {displayData.map((item) => {
            const selectedTow = selectedCasualty?.district === item.district;

            return (
              <TableRow
                className={`cursor-pointer ${
                  selectedTow ? "bg-accent rounded-full" : "bg-transparent"
                }`}
                key={item.district}
                onClick={() => toggleSelectedCasualty(item)}
              >
                <TableCell
                  className={`py-2 font-light ${
                    selectedTow ? "rounded-s-full" : ""
                  }`}
                >
                  {item.district}
                </TableCell>
                <TableCell className="py-0  font-light">
                  {item.total_cases}
                </TableCell>
                <TableCell className="py-0  font-light">
                  {item.verified_deaths}
                </TableCell>
                <TableCell
                  className={`py-0 text-right font-light ${
                    selectedTow ? "rounded-e-full" : ""
                  }`}
                >
                  {item.verified_injuries}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="text-xs flex items-center gap-1"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show All <ChevronDown className="h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const TopNCasesByTotalCases = () => {
  const maxCases = Math.max(
    ...topNCasesByTotalCases.map((item) => item.total_cases || 0)
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold uppercase text-xs font-mono">
        Most Effected
      </span>
      {topNCasesByTotalCases.map((item, index) => {
        const widthPercentage = Math.max(
          10,
          Math.min(100, ((item.total_cases || 0) / maxCases) * 100)
        );

        const colors = ["bg-indigo-600", "bg-indigo-500", "bg-indigo-400"];

        const bgColor = colors[index % colors.length];

        return (
          <div key={item.district} className="flex gap-2 items-center">
            <div
              key={item.district}
              className={`flex rounded-3xl items-center justify-between px-4 py-2 ${bgColor}`}
              style={{ width: `${widthPercentage}%` }}
            >
              <span className="font-medium text-white">{item.district}</span>
            </div>
            <span className="font-normal whitespace-nowrap">
              {item.total_cases?.toLocaleString()} Cases
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { TotalCasualties, DonutCharts, TabularData, TopNCasesByTotalCases };
