"use client";

import { memo } from "react";
import { CircleMarker } from "react-leaflet";

import { useSelectedCasualtyStore } from "@/lib/selected-casualty-store";

import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLORS,
} from "@/constant/casualty-types";
import type { Casualty } from "@/types/data";

interface CasualtyMarkerProps {
  casualty: Casualty;
}

const CasualtyMarker = memo(({ casualty }: CasualtyMarkerProps) => {
  const { type, lat, lng, district, verified_deaths, verified_injuries } =
    casualty;
  if (type === CASUALTY_ITEMS.NO_CASUALTIES || lat === null || lng === null)
    return null;

  const markerPosition = [lat, lng] as [number, number];
  const { selectedCasualty, toggleSelectedCasualty } =
    useSelectedCasualtyStore();
  const handleMarkerClick = () => {
    toggleSelectedCasualty(casualty);
  };

  const markerColor =
    type && CASUALTY_ITEMS_COLORS[type] ? CASUALTY_ITEMS_COLORS[type]() : "";

  const isSelected = selectedCasualty && selectedCasualty.district === district;

  const rippleEffect = isSelected && (
    <>
      <CircleMarker
        center={markerPosition}
        radius={((verified_deaths || 0) + (verified_injuries || 0)) / 25 + 5}
        pathOptions={{
          color: "#ee7f01",
          fillColor: "transparent",
          fillOpacity: 0,
          weight: 2,
          opacity: 0.7,
          dashArray: "5,5",
        }}
      />
      <CircleMarker
        center={markerPosition}
        radius={((verified_deaths || 0) + (verified_injuries || 0)) / 25 + 10}
        pathOptions={{
          color: "#ee7f01",
          fillColor: "transparent",
          fillOpacity: 0,
          weight: 1.5,
          opacity: 0.5,
          dashArray: "3,7",
        }}
      />
    </>
  );

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
      eventHandlers={{ click: handleMarkerClick }}
      className={`drop-shadow-[0_0_0.1rem_crimson] ${
        isSelected ? "animate-bounce-small" : ""
      }`}
    />
  );

  return (
    <>
      {rippleEffect}
      <CircleMarker
        key={`${district}-outer`}
        center={markerPosition}
        radius={((verified_deaths || 0) + (verified_injuries || 0)) / 25}
        pathOptions={{
          color: "#ee7f01",
          fillColor: "#e9a30c",
          fillOpacity: 0.4,
          weight: 0.75,
          stroke: true,
        }}
        eventHandlers={{ click: handleMarkerClick }}
      >
        {baseCircleMarker}
      </CircleMarker>
    </>
  );
});

CasualtyMarker.displayName = "CasualtyMarker";

export default CasualtyMarker;
