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
  BANGLADESH_CENTER,
  MAP_CONTAINER,
  MAP_ZOOM,
} from "@/constant/map-container-config";
import "./map.css";
import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
} from "@/constant/casualty-types";

export default function MapComponent() {
  const { selectedIncident } = useIncidentStore();
  const filteredData = useFilteredData();

  const validCasualtyData = useMemo(
    () =>
      filteredData.filter((person) => person.lat != null && person.lng != null),
    [filteredData]
  );
  const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());

  const handleMarkerRef = useCallback((id: string, marker: L.Marker) => {
    markerRefsMap.current.set(id, marker);
    return () => {
      markerRefsMap.current.delete(id);
    };
  }, []);

  return (
    <div className="w-full h-full">
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

      <div className="absolute bottom-8 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-[100] min-h-[100px] flex flex-col justify-center">
        <div className="flex flex-col gap-2">
          {Object.entries(CASUALTY_ITEMS)
            .filter(([_, value]) => CASUALTY_ITEMS_COLOR_ELEMENTS[value]())
            .map(([key, value]) => (
              <div key={`${value}_${key}`} className="flex items-center gap-1">
                {CASUALTY_ITEMS_COLOR_ELEMENTS[value]!()}
                <p className="text-xs dark:text-white text-slate-700">
                  {value}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
