"use client";

import { memo, useMemo } from "react";
import { CircleMarker, Marker } from "react-leaflet";
import type L from "leaflet";

import { MapIcons } from "./map-icons";
import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLORS,
} from "@/constant/casualty-types";
import type { Casualty } from "@/types/data";

interface CasualtyMarkerProps {
  casualty: Casualty;
  onMarkerRef: (id: string, marker: L.Marker) => void;
}

const CasualtyMarker = memo(({ casualty, onMarkerRef }: CasualtyMarkerProps) => {
  const {  type, lat, lng, district, verified_deaths, verified_injuries } = casualty;

  if (type === CASUALTY_ITEMS.NO_CASUALTIES || lat === null || lng === null)
    return null;

  const markerPosition = [lat, lng] as [number, number];
  
  const icon =
    type === "Death"
      ? MapIcons.death
      : type === "Injury"
      ? MapIcons.injury
      : MapIcons.multipleCasualties;

  const setMarkerRef = useMemo(() => {
    return (marker: L.Marker | null) => {
      if (marker) onMarkerRef(String(district), marker);
    };
  }, [district, onMarkerRef]);


  const markerPin = (
    <Marker
      icon={icon}
      position={markerPosition}
      ref={setMarkerRef}
      eventHandlers={{
        keypress: (e) => {
          if (e.originalEvent.key === "Enter") {
            (e.target as L.Marker).openPopup();
          }
        },
        // click: handleMarkerClick,
      }}
      keyboard={true}
      aria-label={`${type} marker for ${district || "Unknown"}`}
    />
  );

  const markerColor =
    type && CASUALTY_ITEMS_COLORS[type] ? CASUALTY_ITEMS_COLORS[type]() : "";

  const baseCircleMarker = (
    <CircleMarker
      key={district}
      center={markerPosition}
      radius={(casualty.verified_deaths || 0) / 5}
      pathOptions={{
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 1,
        weight: 0,
        stroke: true,
      }}
      // eventHandlers={{ click: handleMarkerClick }}
      className="drop-shadow-[0_0_0.1rem_crimson]"
    >
      {/* {isSelected && markerPin} */}
    </CircleMarker>
  );

  return (
    <CircleMarker
      key={`${district}-outer`}
      center={markerPosition}
      radius={
        ((verified_deaths || 0) + (verified_injuries || 0)) / 25
      }
      pathOptions={{
        color: "#ee7f01",
        fillColor: "#e9a30c",
        fillOpacity: 0.4,
        weight: 0.75,
        stroke: true,
      }}
      // eventHandlers={{ click: handleMarkerClick }}
    >
      {baseCircleMarker}
    </CircleMarker>
  );
});

CasualtyMarker.displayName = "CasualtyMarker";

export default CasualtyMarker;
