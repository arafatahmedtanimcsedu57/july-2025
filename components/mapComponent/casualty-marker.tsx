"use client";

import { memo, useMemo } from "react";
import type L from "leaflet";
import { CircleMarker, Marker, Popup } from "react-leaflet";

import { useIncidentStore } from "@/lib/incident-store";

import { MapIcons } from "./map-icons";
import type { CasualtyPerson } from "@/types/data";
import { CASUALTY_TYPES } from "@/constant/casualty-types";
import { useFilterStore } from "@/lib/filter-store";

interface CasualtyMarkerProps {
  person: CasualtyPerson;
  onMarkerRef: (id: string, marker: L.Marker) => void;
}

const CasualtyMarker = memo(({ person, onMarkerRef }: CasualtyMarkerProps) => {
  const { id, name, type, lat, lng, age, location, date } = person;

  const { setSelectedIncident } = useIncidentStore();
  const { casualtyTypeFilter } = useFilterStore();

  const icon =
    type === "Death"
      ? MapIcons.death
      : type === "Injury"
      ? MapIcons.injury
      : MapIcons.multipleCasualties;

  const setMarkerRef = useMemo(() => {
    return (marker: L.Marker | null) => {
      if (marker) {
        onMarkerRef(String(id), marker);
      }
    };
  }, [id, onMarkerRef]);

  const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

  if (type === "No Casualties" || lat === null || lng === null) return null;

  const markerPosition = [lat, lng] as [number, number];

  const markerComponent = (
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
        click: () => {
          setSelectedIncident(person);
        },
      }}
      keyboard={true}
      aria-label={`${type} marker for ${name || "Unknown person"}`}
    >
      <Popup closeButton={false} autoPan={false}>
        <div className="p-2 flex flex-col gap-1 min-w-[200px]">
          <h3 className="font-semibold text-base border-b pb-1">
            {name || "Unknown"}
          </h3>
          <div className="grid grid-cols-2 gap-x-2 text-sm mt-1">
            <span className="text-muted-foreground">Type:</span>
            <span
              className={
                type === "Death"
                  ? "text-red-600 font-medium"
                  : "text-orange-600 font-medium"
              }
            >
              {type}
            </span>

            {age && (
              <>
                <span className="text-muted-foreground">Age:</span>
                <span>{age}</span>
              </>
            )}

            {location && (
              <>
                <span className="text-muted-foreground">Location:</span>
                <span>{location}</span>
              </>
            )}

            {date && (
              <>
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date(date).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );

  if (isMultipleCasualties) {
    return (
      <CircleMarker
        key={person.id}
        center={markerPosition}
        radius={20}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.1,
          weight: 0,
          stroke: true,
        }}
        eventHandlers={{
          click: () => {
            setSelectedIncident(person);
          },
        }}
        className="drop-shadow-[0_0_0.1rem_crimson]"
      >
        {markerComponent}
      </CircleMarker>
    );
  }

  // Return just the marker for other types
  return markerComponent;
});

CasualtyMarker.displayName = "CasualtyMarker";

export default CasualtyMarker;
