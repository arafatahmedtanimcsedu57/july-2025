"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { MapContainer } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ThemeTileLayer } from "./theme-tile-layer";
import MapController from "./map-controller";
import CasualtyMarker from "./casualty-marker";
import { CasualtyToast } from "./casualty-toast";

import { useFilteredData } from "@/hooks/use-filtered-data";
import { useToast } from "@/hooks/use-toast";
import { useIncidentStore } from "@/lib/incident-store";
import { getUpdatedPersonData } from "@/lib/edit-store";

import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
} from "@/constant/casualty-types";
import {
  BANGLADESH_CENTER,
  MAP_CONTAINER,
  MAP_ZOOM,
} from "@/constant/map-container-config";
import "./map.css";

export default function MapComponent() {
  const [activeToastId, setActiveToastId] = useState<string | null>(null);

  const { toast, dismiss } = useToast();
  const { selectedIncident, setSelectedIncident } = useIncidentStore();
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

  const resetToast = () => {
    if (activeToastId) {
      dismiss(activeToastId);
      setActiveToastId(null);
    }
  };

  const handleCloseToast = () => {
    resetToast();
    setSelectedIncident(null);
  };

  // useEffect(() => {
  // 	if (!selectedIncident) {
  // 		resetToast();
  // 	} else {
  // 		resetToast();
  // 		const { id } = toast({
  // 			description: (
  // 				<CasualtyToast
  // 					casualty={selectedIncident}
  // 					onClose={handleCloseToast}
  // 					onSwipeEnd={() => setSelectedIncident(null)}
  // 				/>
  // 			),
  // 			duration: 500000,
  // 			onSwipeEnd: () => {
  // 				setSelectedIncident(null);
  // 			},
  // 		});

  // 		setActiveToastId(id);
  // 	}
  // }, [selectedIncident]);

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
