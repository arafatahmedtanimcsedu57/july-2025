"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { MapContainer, useMap, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";

import { ThemeTileLayer } from "./theme-tile-layer";

import { getCasualtyDataByDate } from "@/lib/data";
import { useIncidentStore } from "@/lib/incident-store";
import { useDayStore } from "@/lib/day-store";
import { getUpdatedPersonData } from "@/lib/edit-store";
import { useFilterStore } from "@/lib/filter-store";

import { useFilteredData } from "@/hooks/use-filtered-data";

import { CASUALTY_TYPES } from "@/constant/casualty-types";
import { MARKER_COLORS } from "@/constant/marker-colors";

import type { CasualtyPerson } from "@/types/data";

import "leaflet/dist/leaflet.css";
import "./map.css";

const getMarkerColor = (type: string | null) => {
  if (!type || !(type in MARKER_COLORS)) {
    return MARKER_COLORS["default"];
  }
  return MARKER_COLORS[type];
};

const bangladeshCenter: [number, number] = [23.8103, 90.4125]; // Dhaka coordinates
const MarkerRefsContext = React.createContext<Map<
  string,
  L.CircleMarker
> | null>(null);

function MapController({
  selectedPerson,
}: {
  selectedPerson: CasualtyPerson | null;
}) {
  const map = useMap();
  const { currentDay } = useDayStore();

  const casualtyData = getCasualtyDataByDate(currentDay);
  const markerRefs = React.useContext(MarkerRefsContext);

  useEffect(() => {
    if (selectedPerson) {
      if (selectedPerson.lat != null && selectedPerson.lng != null) {
        map.flyTo([selectedPerson.lat, selectedPerson.lng], 18, {
          animate: true,
          duration: 2,
        });

        if (markerRefs && markerRefs.has(String(selectedPerson.id))) {
          setTimeout(() => {
            const marker = markerRefs.get(String(selectedPerson.id));
            if (marker) {
              marker.openPopup();
            }
          }, 2100);
        }
      }
    } else {
      map.flyTo(bangladeshCenter, 7, {
        animate: true,
        duration: 2,
      });
    }
  }, [selectedPerson, casualtyData, map, markerRefs]);

  return null;
}

export default function MapComponent() {
  const { selectedIncident, setSelectedIncident } = useIncidentStore();
  const { currentDay } = useDayStore();

  const filteredData = useFilteredData();
  const { casualtyTypeFilter } = useFilterStore();
  const validCasualtyData = filteredData.filter(
    (person) => person.lat != null && person.lng != null
  );

  const markerRefsMap = useRef<Map<string, L.CircleMarker>>(new Map());

  useEffect(() => {
    setSelectedIncident(null);
  }, [currentDay, setSelectedIncident]);

  return (
    <MarkerRefsContext.Provider value={markerRefsMap.current}>
      <MapContainer
        center={bangladeshCenter}
        zoom={7}
        zoomControl={false}
        minZoom={7}
        dragging={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        style={{ height: "calc(100vh - 61px)" }}
      >
        <ThemeTileLayer />

        {validCasualtyData.map((person) => {
          const updatedPerson = getUpdatedPersonData(person);
          const markerColor = getMarkerColor(updatedPerson.type);

          if (updatedPerson.lat === null || updatedPerson.lng === null)
            return null;

          return (
            <CircleMarker
              key={person.id}
              center={
                [updatedPerson.lat, updatedPerson.lng] as [number, number]
              }
              radius={casualtyTypeFilter === CASUALTY_TYPES.INDIVIDUAL ? 4 : 12}
              pathOptions={{
                color: markerColor.color,
                fillColor: markerColor.fillColor,
                fillOpacity:
                  casualtyTypeFilter === CASUALTY_TYPES.INDIVIDUAL ? 1 : 0.35,
                weight: 0,
              }}
              eventHandlers={{
                click: () => {
                  setSelectedIncident(person);
                },
                add: (e) => {
                  markerRefsMap.current.set(person.id.toString(), e.target);
                },
                remove: () => {
                  markerRefsMap.current.delete(person.id.toString());
                },
              }}
              className="drop-shadow-[0_0_0.1rem_crimson]"
            >
              <Popup closeButton={false} autoPan={false}>
                <div className="p-1 flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {updatedPerson.name || "Unknown"}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        <MapController selectedPerson={selectedIncident} />
      </MapContainer>
    </MarkerRefsContext.Provider>
  );
}
