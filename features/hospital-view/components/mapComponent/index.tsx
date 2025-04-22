"use client";

import { useRef } from "react";
import { MapContainer } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ThemeTileLayer } from "./theme-tile-layer";
import { MapContainerController, MapStatsControl } from "./map-controller";
import { CasualtyMarker } from "./casualty-marker";
import { Legend } from "./legend";

import { useResponsiveZoom } from "@/features/hospital-view/hooks/use-responsive-zoom";
import { dataHospitalWiseInjuryDeath } from "@/features/hospital-view/lib/data-managers";

import {
  BANGLADESH_CENTER,
  MAP_CONTAINER,
} from "@/constant/map-container-config";

import "./map.css";

export default function MapComponent() {
  const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());
  const responsiveZoom = useResponsiveZoom();

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
        className="map__casualties"
      >
        <ThemeTileLayer />

        <MapStatsControl />

        {dataHospitalWiseInjuryDeath.map((casualty) => {
          return <CasualtyMarker key={casualty.facility} casualty={casualty} />;
        })}

        <MapContainerController
          markerRefs={markerRefsMap.current}
          flyToDuration={2}
          flyToZoom={responsiveZoom.MAX}
          defaultZoom={responsiveZoom.DEFAULT}
        />
      </MapContainer>

      <div className="absolute bottom-8 right-4 z-[100] min-h-[100px]">
        <div className="mx-auto">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <div className="flex flex-col justify-center bg-white dark:bg-gray-800 p-4 rounded-lg">
                <Legend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
