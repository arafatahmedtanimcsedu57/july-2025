"use client";

import { useRef, useCallback } from "react";
import { MapContainer } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ThemeTileLayer } from "./theme-tile-layer";
import MapController from "./map-controller";
import CasualtyMarker from "./casualty-marker";

import { useIncidentStore } from "@/lib/incident-store";
import { getUpdatedPersonData } from "@/lib/edit-store";

import {
  BANGLADESH_CENTER,
  MAP_CONTAINER,
  MAP_ZOOM,
} from "@/constant/map-container-config";
import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
} from "@/constant/casualty-types";

import {dataDistrictWiseInjuryDeath} from "@/lib/data_district_wise_injury_death";

import "./map.css";

export default function MapComponent() {
  const { selectedIncident } = useIncidentStore();

 
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

        {dataDistrictWiseInjuryDeath.map((casualty) => {
          return (
            <CasualtyMarker
              key={ casualty.district}
              casualty={casualty}
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
