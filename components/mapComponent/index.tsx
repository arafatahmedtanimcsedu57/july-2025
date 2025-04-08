"use client";

import { useRef, useMemo, useCallback } from "react";
import { MapContainer } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ThemeTileLayer } from "./theme-tile-layer";
import MapController from "./map-controller";
import CasualtyMarker from "./casualty-marker";

import { useFilteredData } from "@/hooks/use-filtered-data";
import { useIncidentStore } from "@/lib/incident-store";
import { getUpdatedPersonData } from "@/lib/edit-store";

import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
  CASUALTY_TYPES,
} from "@/constant/casualty-types";
import {
  BANGLADESH_CENTER,
  MAP_CONTAINER,
  MAP_ZOOM,
} from "@/constant/map-container-config";
import "./map.css";
import { useFilterStore } from "@/lib/filter-store";
import { Button } from "../ui/button";
import { Filter, X } from "lucide-react";
import { useSidebarStore } from "@/lib/sidebar-store";

export default function MapComponent() {
  const { selectedIncident, setSelectedIncident } = useIncidentStore();
  const { isOpen, toggle } = useSidebarStore();
  const filteredData = useFilteredData();
  const { casualtyTypeFilter } = useFilterStore();

  const validCasualtyData = useMemo(
    () =>
      filteredData.filter((person) => person.lat != null && person.lng != null),
    [filteredData]
  );
  const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());
  const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

  const handleMarkerRef = useCallback((id: string, marker: L.Marker) => {
    markerRefsMap.current.set(id, marker);
    return () => {
      markerRefsMap.current.delete(id);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full">
        <MapContainer
          center={BANGLADESH_CENTER}
          zoom={MAP_CONTAINER.zoom}
          zoomControl={MAP_CONTAINER.zoomControl}
          minZoom={MAP_CONTAINER.minZoom}
          dragging={MAP_CONTAINER.dragging}
          doubleClickZoom={MAP_CONTAINER.doubleClickZoom}
          scrollWheelZoom={MAP_CONTAINER.scrollWheelZoom}
          style={{ ...MAP_CONTAINER.style }}
        >
          <ThemeTileLayer />

          {validCasualtyData.map((person) => {
            const updatedPerson = getUpdatedPersonData(person);
            return (
              <CasualtyMarker
                key={person.id || person.district}
                person={updatedPerson}
                onMarkerRef={handleMarkerRef}
              />
            );
          })}

          <MapController
            selectedPerson={selectedIncident}
            markerRefs={markerRefsMap.current}
            flyToDuration={2}
            flyToZoom={MAP_ZOOM.MAX}
            defaultZoom={MAP_ZOOM.DEFAULT}
          />
        </MapContainer>
      </div>

      <div className="absolute top-4 left-4 z-[100]">
        {!isMultipleCasualties ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <>
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </>
            )}
          </Button>
        ) : (
          <></>
        )}{" "}
      </div>

      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded shadow-lg z-[100]">
        <div className="flex flex-col gap-2 text-xs">
          {Object.entries(CASUALTY_ITEMS).map(([key, value]) =>
            CASUALTY_ITEMS_COLOR_ELEMENTS[value]?.() ? (
              <div key={key} className="flex items-center gap-1">
                {CASUALTY_ITEMS_COLOR_ELEMENTS[value]?.()}
                <span>{value}</span>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </div>
  );
}
