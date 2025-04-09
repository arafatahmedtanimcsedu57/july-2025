"use client";

import { memo, useMemo } from "react";
import { CircleMarker, Marker } from "react-leaflet";
import type L from "leaflet";

import { useIncidentStore } from "@/lib/incident-store";
import { MapIcons } from "./map-icons";
import {
  CASUALTY_ITEMS,
  CASUALTY_ITEMS_COLORS,
} from "@/constant/casualty-types";
import type { CasualtyPerson } from "@/types/data";

interface CasualtyMarkerProps {
  person: CasualtyPerson;
  onMarkerRef: (id: string, marker: L.Marker) => void;
}

const CasualtyMarker = memo(({ person, onMarkerRef }: CasualtyMarkerProps) => {
  const { id, name, type, lat, lng } = person;
  const { setSelectedIncident, selectedIncident } = useIncidentStore();

  if (type === CASUALTY_ITEMS.NO_CASUALTIES || lat === null || lng === null)
    return null;

  const markerPosition = [lat, lng] as [number, number];
  const isSelected =
    (selectedIncident?.id && selectedIncident.id === person.id) ||
    (selectedIncident?.district &&
      selectedIncident.district === person.district);

  const icon =
    type === "Death"
      ? MapIcons.death
      : type === "Injury"
      ? MapIcons.injury
      : MapIcons.multipleCasualties;

  const setMarkerRef = useMemo(() => {
    return (marker: L.Marker | null) => {
      if (marker) onMarkerRef(String(id), marker);
    };
  }, [id, onMarkerRef]);

  const handleMarkerClick = () => setSelectedIncident(person);

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
        click: handleMarkerClick,
      }}
      keyboard={true}
      aria-label={`${type} marker for ${name || "Unknown person"}`}
    />
  );

  const markerColor =
    type && CASUALTY_ITEMS_COLORS[type] ? CASUALTY_ITEMS_COLORS[type]() : "";

  const baseCircleMarker = (
    <CircleMarker
      key={id}
      center={markerPosition}
      radius={(person.verified_deaths || 0) / 5}
      pathOptions={{
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 1,
        weight: 0,
        stroke: true,
      }}
      eventHandlers={{ click: handleMarkerClick }}
      className="drop-shadow-[0_0_0.1rem_crimson]"
    >
      {isSelected && markerPin}
    </CircleMarker>
  );

  return (
    <CircleMarker
      key={`${id}-outer`}
      center={markerPosition}
      radius={
        ((person.verified_deaths || 0) + (person.verified_injuries || 0)) / 25
      }
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
  );
});

CasualtyMarker.displayName = "CasualtyMarker";

export default CasualtyMarker;
