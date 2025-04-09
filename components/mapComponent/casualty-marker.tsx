"use client";

import { memo } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";

import { useSelectedCasualtyStore } from "@/lib/selected-casualty-store";

import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLOR_ELEMENTS,
} from "@/constant/casualty-types";
import type { Casualty } from "@/types/data";

interface CasualtyMarkerProps {
  casualty: Casualty;
}

const CasualtyMarker = memo(({ casualty }: CasualtyMarkerProps) => {
  const { lat, lng, district, verified_deaths, verified_injuries } = casualty;
  if (lat === null || lng === null) return null;

  const { selectedCasualty, toggleSelectedCasualty } =
    useSelectedCasualtyStore();

  const markerPosition = [lat, lng] as [number, number];
  const isSelected = selectedCasualty && selectedCasualty.district === district;
  const deathCircleRadius = (verified_deaths || 0) / 5;
  const casualtyCircleRadius =
    ((verified_deaths || 0) + (verified_injuries || 0)) / 25;

  const handleMarkerClick = () => toggleSelectedCasualty(casualty);

  const rippleEffect = isSelected ? (
    <>
      <CircleMarker
        center={markerPosition}
        radius={casualtyCircleRadius + 5}
        pathOptions={{
          color: "#ee7f01",
          fillColor: "transparent",
          fillOpacity: 0,
          weight: 2,
          opacity: 0.7,
          dashArray: "5,5",
        }}
        eventHandlers={{ click: handleMarkerClick }}
      />
      <CircleMarker
        center={markerPosition}
        radius={casualtyCircleRadius + 10}
        pathOptions={{
          color: "#ee7f01",
          fillColor: "transparent",
          fillOpacity: 0,
          weight: 1.5,
          opacity: 0.5,
          dashArray: "3,7",
        }}
        eventHandlers={{ click: handleMarkerClick }}
      />
    </>
  ) : (
    <></>
  );

  const deathCircleMarker = (
    <CircleMarker
      key={district}
      center={markerPosition}
      radius={deathCircleRadius}
      pathOptions={{
        color: "#9c0610",
        fillColor: "#9c0610",
        fillOpacity: 1,
        weight: 0,
        stroke: true,
      }}
      eventHandlers={{ click: handleMarkerClick }}
      className="drop-shadow-[0_0_0.1rem_crimson]"
    >
      {isSelected && (
        <Tooltip permanent={true} direction="top">
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">{district}</h3>
            <div className="flex gap-2">
              <div className="flex items-center">
                {CASUALTY_ITEMS_COLOR_ELEMENTS[CASUALTY_ITEMS.DEATH]!()}
                <span>Deaths: {verified_deaths || 0}</span>
              </div>
              <div className="flex items-center">
                {CASUALTY_ITEMS_COLOR_ELEMENTS[CASUALTY_ITEMS.INJURY]!()}
                <span>Injuries: {verified_injuries || 0}</span>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
    </CircleMarker>
  );

  const injuryCircleMarker = (
    <CircleMarker
      key={`${district}-outer`}
      center={markerPosition}
      radius={casualtyCircleRadius}
      pathOptions={{
        color: "#ee7f01",
        fillColor: "#e9a30c",
        fillOpacity: 0.4,
        weight: 0.75,
        stroke: true,
      }}
      eventHandlers={{ click: handleMarkerClick }}
    />
  );

  return (
    <>
      {rippleEffect}
      {injuryCircleMarker}
      {deathCircleMarker}
    </>
  );
});

CasualtyMarker.displayName = "CasualtyMarker";

export default CasualtyMarker;
