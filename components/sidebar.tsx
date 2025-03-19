"use client"

import { useEffect } from "react"
import { getDate, format } from "date-fns"
import React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useSidebarStore } from "@/lib/sidebar-store"
import { useDayStore } from "@/lib/day-store"
import { getCasualtyDataByDate } from "@/lib/data"
import { useFilterStore } from "@/lib/filter-store"
import { useIncidentStore } from "@/lib/incident-store"

import { CASUALTY_ITEMS, CASUALTY_ITEMS_COLORS, CASUALTY_TYPES } from "@/constant/casualty-types"

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore()
  const {
    dateFilter,
    minAgeFilter,
    maxAgeFilter,
    typeFilter,
    casualtyTypeFilter,
    setDateFilter,
    setMinAgeFilter,
    setMaxAgeFilter,
    setTypeFilter,
    resetFilters,
  } = useFilterStore()

  const { currentDay, availableDays } = useDayStore()
  const { setSelectedIncident } = useIncidentStore()

  const casualtyData = getCasualtyDataByDate(currentDay)

  const totals = casualtyData.reduce(
    (acc, person) => {
      if (person.type) {
        acc[person.type]++
      }
      return acc
    },
    {
      [CASUALTY_ITEMS.DEATH]: 0,
      [CASUALTY_ITEMS.INJURY]: 0,
      [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: 0,
      [CASUALTY_ITEMS.NO_CASUALTIES]: 0,
    } as Record<string, number>,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedIncident(null)
    setDateFilter(date || null)
  }

  const handleAgeChange = (values: number[]) => {
    setSelectedIncident(null)
    setMinAgeFilter(values[0].toString())
    setMaxAgeFilter(values[1].toString())
  }

  const handleTypeFilter = (type: string) => {
    setSelectedIncident(null)
    setTypeFilter(type)
  }

  const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      }
    }

    window.addEventListener("keydown", handleEscapeKey)
    return () => window.removeEventListener("keydown", handleEscapeKey)
  }, [close])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [close])

  return (
    <aside
      className={`fixed top-[61px] right-0 bottom-0 w-full md:w-80 border-l bg-background z-40 overflow-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
        <div className="grid grid-cols-1 items-center gap-4 p-4 border-b border-dashed">
          <Label>Massacre Dates</Label>

          <div className="flex flex-wrap gap-2 items-center text-center border-b border-dashed">
            {availableDays.map((day) => {
              const _date = new Date(day.date)

              return (
                <div
                  className="p-4 border cursor-pointer rounded flex flex-col items-center justify-center"
                  key={day.date}
                  onClick={() => handleDateSelect(new Date(day.date))}
                >
                  <div className="text-sm uppercase">{format(_date, "LLL")}</div>

                  <div className="text-2xl font-extrabold">{getDate(_date)}</div>

                  <div className="flex gap-2 items-center justify-center">
                    {Object.entries(CASUALTY_ITEMS).map(([key, value]) =>
                      day[value] ? (
                        <div key={`${key}_${value}`} className="flex items-center gap-1">
                          {CASUALTY_ITEMS_COLORS[value]?.()}
                        </div>
                      ) : (
                        <React.Fragment key={`empty_${key}_${value}`}></React.Fragment>
                      ),
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {!isMultipleCasualties ? (
          <>
            <div className="grid grid-cols-1 items-center gap-4 p-4 border-b border-dashed">
              <Label>Age Range</Label>
              <div className="col-span-2 space-y-4">
                <Slider
                  defaultValue={[
                    minAgeFilter ? Number.parseInt(minAgeFilter) : 0,
                    maxAgeFilter ? Number.parseInt(maxAgeFilter) : 100,
                  ]}
                  max={100}
                  step={1}
                  onValueChange={(values) => handleAgeChange(values)}
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{minAgeFilter || "0"}</span>
                  <span>{maxAgeFilter || "100"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-4 p-4 border-b border-dashed">
              <Label htmlFor="type-filter">Casualty Type</Label>
              <Select value={typeFilter} onValueChange={(e) => handleTypeFilter(e)}>
                <SelectTrigger className="col-span-2 h-8" id="type-filter">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Casualty Types</SelectItem>

                  <SelectItem key={CASUALTY_ITEMS.DEATH} value={CASUALTY_ITEMS.DEATH}>
                    {CASUALTY_ITEMS.DEATH}
                  </SelectItem>

                  <SelectItem key={CASUALTY_ITEMS.INJURY} value={CASUALTY_ITEMS.INJURY}>
                    {CASUALTY_ITEMS.INJURY}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </aside>
  )
}

