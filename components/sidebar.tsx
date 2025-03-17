"use client";

import { useEffect } from "react";
import { Move, BoxIcon as Box3d, HelpCircle, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSidebarStore } from "@/lib/sidebar-store";
import { useDayStore } from "@/lib/day-store";
import { getCasualtyDataByDate } from "@/lib/data";
import { CASUALTY_ITEMS } from "@/constant/casualty-types";

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  const { currentDay, availableDays } = useDayStore();

  const casualtyData = getCasualtyDataByDate(currentDay);

  const totals = casualtyData.reduce(
    (acc, person) => {
      if (person.type) {
        acc[person.type]++;
      }
      return acc;
    },
    {
      [CASUALTY_ITEMS.DEATH]: 0,
      [CASUALTY_ITEMS.INJURY]: 0,
      [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: 0,
      [CASUALTY_ITEMS.NO_CASUALTIES]: 0,
    } as Record<string, number>
  );

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [close]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close]);

  const uniqueLocations = Array.from(
    new Set(casualtyData.map((p) => p.location).filter(Boolean))
  );

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 w-full md:w-80 border-l bg-background z-40 overflow-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 space-y-4">
        <Card className="overflow-hidden border-primary/10">
          <CardHeader className="bg-primary/5 py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M18 6a4 4 0 0 0-4-4 7 7 0 0 0-5 2 7 7 0 0 0-5-2 4 4 0 0 0-4 4c0 9.14 9 12 9 12s9-2.86 9-12Z" />
              </svg>
              Memorial Legend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
                <span className="text-sm">
                  Deaths{" "}
                  <span className="font-medium">
                    ({totals[CASUALTY_ITEMS.DEATH] || 0})
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
                <span className="text-sm">
                  Injuries{" "}
                  <span className="font-medium">
                    ({totals[CASUALTY_ITEMS.INJURY] || 0})
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500 shadow-sm"></div>
                <span className="text-sm">
                  Multiple Casualties{" "}
                  <span className="font-medium">
                    ({totals[CASUALTY_ITEMS.MULTIPLE_CASUALTIES] || 0})
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
                <span className="text-sm">
                  No Casualties
                  <span className="font-medium">
                    ({totals[CASUALTY_ITEMS.NO_CASUALTIES] || 0})
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-primary/10">
          <CardHeader className="bg-primary/5 py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              About This Memorial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              This digital memorial honors the victims of the July 2024
              incidents in Bangladesh. Each marker represents a real person
              whose life was affected by these tragic events. We remember them
              with respect and dignity.
            </p>
            <div className="mt-3 p-3 bg-black/5 dark:bg-white/5 rounded-md border-l-2 border-red-700">
              <p className="text-xs text-muted-foreground italic">
                "In the silence of memory, we honor those who suffered. May
                their stories be remembered."
              </p>
            </div>
            <div className="mt-2 p-2 bg-muted rounded-md flex items-center gap-2">
              <Box3d className="h-4 w-4 text-primary" />
              <span className="text-xs">
                Map is displayed in 3D perspective view
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-primary/10">
          <CardHeader className="bg-primary/5 py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 max-h-48 overflow-y-auto">
            <div className="space-y-2 text-sm">
              {uniqueLocations.length > 0 ? (
                uniqueLocations.map((location) => {
                  const count = casualtyData.filter(
                    (p) => p.location === location
                  ).length;
                  return (
                    <div
                      key={location}
                      className="flex justify-between border-b border-border/40 pb-1 last:border-0"
                    >
                      <span>{location}</span>
                      <span className="font-medium">
                        {count} {count === 1 ? "person" : "people"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted-foreground">
                  No location data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-primary/10">
          <CardHeader className="bg-primary/5 py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Move className="h-4 w-4 text-primary" />
              Map Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-primary font-medium">
                <Move className="h-4 w-4" />
                <strong>Pan:</strong> Click and drag the map
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  +
                </span>
                <strong>Zoom:</strong> Scroll wheel or use zoom buttons
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  👆
                </span>
                <strong>Select person:</strong> Click on a marker
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  ℹ️
                </span>
                <strong>View details:</strong> Click on a marker to see
                information
              </p>
              <p className="flex items-center gap-2 mt-2 text-primary font-medium">
                <Box3d className="h-4 w-4" />
                <strong>3D View:</strong> Map is displayed in perspective view
              </p>
              <div className="mt-2 p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  Map view is restricted to Bangladesh borders
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
