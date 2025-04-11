"use client";

import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import Image from "next/image";
import { formatDate } from "date-fns";

import { DonutChart } from "@/shared/ui/donut-chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import {
  getGroupedByDateData,
  getTotalDeadPeople,
  getTotalEffectedPeople,
  getTotalInjuredPeople,
} from "@/features/effected-people/lib/data-managers";
import { useSelectedPersonStore } from "@/features/effected-people/store/selected-person-store";
import { useFilteredData } from "@/features/effected-people/hooks/useFiltered-data";

import { GENDERS } from "@/constant/gender-types";
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from "@/constant/casualty-types";

import MaleIcon from "@/public/male.png";
import FemaleIcon from "@/public/female.png";

const dateWiseBarChartConfig = () => {
  return {
    deaths: {
      label: "Deaths",
    },
    injuries: {
      label: "Injuries",
    },
  };
};

const donutChartsConfig = () => {
  const data = useFilteredData();
  const total = getTotalEffectedPeople(data);

  const deathCount = getTotalDeadPeople(data);
  const injuryCount = getTotalInjuredPeople(data);

  const deathPercentage = ((deathCount / total) * 100).toFixed(1) + "%";
  const injuriesPercentage = ((injuryCount / total) * 100).toFixed(1) + "%";

  return [
    {
      chart: {
        data: [
          { label: "Deaths", value: deathCount, color: "#9c0612" },
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
          { label: "Injuries", value: injuryCount, color: "#ee7f01" },
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
  const data = useFilteredData();
  const total = getTotalEffectedPeople(data);
  return (
    <div className="flex flex-col p-10">
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

const DateWiseBarChart = () => {
  const data = useFilteredData();

  const groupedByDateData = getGroupedByDateData(data);
  const chartData = Object.values(groupedByDateData).sort(
    (a, b) => a.timestamp - b.timestamp
  );
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="bg-transparent !p-0  px-2">
        <ChartContainer config={dateWiseBarChartConfig()}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="displayDate" hide />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="deaths" fill="#9c0610" radius={4} />
            <Bar dataKey="injuries" fill="#ee7f01" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-2 py-2">
        <CardDescription>Deaths & Injuries vs Date</CardDescription>
      </CardFooter>
    </Card>
  );
};

const ListData = () => {
  const { selectedPerson, toggleSelectedPerson } = useSelectedPersonStore();
  const [showAll, setShowAll] = useState(false);
  const data = useFilteredData();
  const selectedPersonRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const displayData = showAll ? data : data.slice(0, 3);

  useEffect(() => {
    if (
      selectedPerson &&
      selectedPersonRef.current &&
      listContainerRef.current
    ) {
      // Store a reference to the current value to use inside the callback
      const currentListContainer = listContainerRef.current;

      // Wait for the next frame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Check again that the refs are still valid
        if (selectedPersonRef.current && currentListContainer) {
          const containerRect = currentListContainer.getBoundingClientRect();
          const selectedRect =
            selectedPersonRef.current.getBoundingClientRect();

          // Calculate the exact center position
          const containerCenter = containerRect.top + containerRect.height / 2;
          const selectedCenter = selectedRect.top + selectedRect.height / 2;

          // Calculate how much we need to scroll to center the element
          const scrollOffset =
            currentListContainer.scrollTop + (selectedCenter - containerCenter);

          // Smooth scroll to the calculated position
          currentListContainer.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          });
        }
      });
    }
  }, [selectedPerson]);

  return (
    <div className="space-y-2">
      <div
        ref={listContainerRef}
        className="max-h-[300px] overflow-auto scrollbar-hide space-y-2"
      >
        {displayData.map((person) => {
          const {
            id,
            name,
            age,
            occupation,
            gender,
            type,
            location,
            district,
            date,
          } = person;

          const GenderIcon =
            gender === GENDERS.MALE
              ? MaleIcon
              : gender === GENDERS.FEMALE
              ? FemaleIcon
              : "";
          const _date = date ? new Date(date) : "";
          const _dateString = _date
            ? formatDate(_date.toLocaleString(), "dd MMM")
            : "";

          const selectedItem = selectedPerson?.id === person.id;

          return (
            <Card
              ref={selectedItem ? selectedPersonRef : null}
              key={id}
              className={`cursor-pointer rounded-2xl ${
                selectedItem ? "bg-accent shadow-xl" : "bg-transparent "
              }`}
              onClick={() => toggleSelectedPerson(person)}
            >
              <CardHeader className="space-y-4">
                <CardTitle className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      {GenderIcon ? (
                        <Image
                          src={GenderIcon || "/placeholder.svg"}
                          alt="gender"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <></>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs">{name || "Unknown"}</span>
                        <span className="text-xs font-normal">
                          {age || "..."} years, {occupation || "..."}
                        </span>
                      </div>
                    </div>

                    {type ? CASUALTY_ITEMS_COLOR_ELEMENTS[type]!() : <></>}
                  </div>
                </CardTitle>
                <Separator />
                <CardDescription
                  className={`${selectedItem ? "text-white" : ""}`}
                >
                  <div className="flex gap-2 items-center">
                    <div>
                      <MapPin width={16} />
                    </div>
                    <span className="text-xs">
                      {location || "..."}, {district || "..."}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div>
                      <Calendar width={16} />
                    </div>
                    <span className="text-xs">{_dateString || "..."}</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
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

export { TotalCasualties, DonutCharts, DateWiseBarChart, ListData };
