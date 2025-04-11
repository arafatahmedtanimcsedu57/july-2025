"use client";

import { useRef } from "react";
import { MapContainer } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ThemeTileLayer } from "./theme-tile-layer";
import { MapContainerController } from "./map-controller";
import { EffectedPersonMarker } from "./effected-person-marker";
import { Legend } from "./legend";

import { useResponsiveZoom } from "@/features/effected-people/hooks/use-responsive-zoom";
import { useFilteredData } from "@/features/effected-people/hooks/useFiltered-data";
import { useFilterContainerStore } from "@/features/effected-people/store/filter-container-store";

import {
  BANGLADESH_CENTER,
  MAP_CONTAINER,
} from "@/constant/map-container-config";

import "./map.css";
import { MapStatsControl } from "./map-controller";

export default function MapComponent() {
  const { isOpen, toggle } = useFilterContainerStore();
  const responsiveZoom = useResponsiveZoom();
  const data = useFilteredData();
  const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());

  return (
    <div className="w-full h-full">
      <MapContainer
        center={BANGLADESH_CENTER}
        zoom={responsiveZoom.DEFAULT}
        zoomControl={MAP_CONTAINER.zoomControl}
        minZoom={responsiveZoom.MIN}
        dragging={MAP_CONTAINER.dragging}
        doubleClickZoom={MAP_CONTAINER.doubleClickZoom}
        scrollWheelZoom={MAP_CONTAINER.scrollWheelZoom}
        style={{ ...MAP_CONTAINER.style }}
        className="map__effected-people"
      >
        <ThemeTileLayer />

        <MapStatsControl />

        {data.map((person) => {
          return <EffectedPersonMarker key={person.id} person={person} />;
        })}

        <MapContainerController
          markerRefs={markerRefsMap.current}
          flyToDuration={2}
          flyToZoom={responsiveZoom.MAX}
          defaultZoom={responsiveZoom.DEFAULT}
        />
      </MapContainer>

      <div className="absolute bottom-8 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-[100] min-h-[100px] flex flex-col justify-center">
        <Legend />
      </div>
    </div>
  );
}
