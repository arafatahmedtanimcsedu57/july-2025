"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";

import Stats from "@/features/effected-people/components/stats";

import { useSelectedPersonStore } from "@/features/effected-people/store/selected-person-store";

import { BANGLADESH_CENTER, MAP_ZOOM } from "@/constant/map-container-config";

interface MapControllerProps {
  markerRefs: Map<string, L.Marker> | null;
  flyToDuration?: number;
  flyToZoom?: number;
  defaultZoom?: number;
}

export function MapContainerController({
  markerRefs,
  flyToDuration = 2,
  flyToZoom = MAP_ZOOM.MAX,
  defaultZoom = MAP_ZOOM.DEFAULT,
}: MapControllerProps) {
  const { selectedPerson } = useSelectedPersonStore();

  const map = useMap();
  const flyingRef = useRef(false);

  useEffect(() => {
    if (
      selectedPerson &&
      selectedPerson.lat != null &&
      selectedPerson.lng != null
    ) {
      if (map.dragging.enabled()) {
        map.dragging.disable();
        flyingRef.current = true;
      }

      map.flyTo([selectedPerson.lat, selectedPerson.lng], flyToZoom, {
        animate: true,
        duration: flyToDuration,
      });

      const enableDraggingTimeout = setTimeout(() => {
        if (flyingRef.current) {
          map.dragging.enable();
          flyingRef.current = false;
        }
      }, flyToDuration * 1000);

      return () => {
        clearTimeout(enableDraggingTimeout);
        if (flyingRef.current) {
          map.dragging.enable();
          flyingRef.current = false;
        }
      };
    } else {
      if (map.dragging.enabled()) {
        map.dragging.disable();
        flyingRef.current = true;
      }

      map
        .flyTo(BANGLADESH_CENTER, defaultZoom, {
          animate: true,
          duration: flyToDuration,
        })
        .closePopup();

      const enableDraggingTimeout = setTimeout(() => {
        if (flyingRef.current) {
          map.dragging.enable();
          flyingRef.current = false;
        }
      }, flyToDuration * 1000);

      return () => {
        clearTimeout(enableDraggingTimeout);
        if (flyingRef.current) {
          map.dragging.enable();
          flyingRef.current = false;
        }
      };
    }
  }, [selectedPerson, map, markerRefs, flyToDuration, flyToZoom, defaultZoom]);

  return (
    <>
      <ZoomControl position="topright" />
    </>
  );
}

export const MapStatsControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const Custom = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create("div");
        div.className = "custom-leaflet-control"; // Optional class for styling

        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.disableScrollPropagation(div);

        const root = ReactDOM.createRoot(div);
        root.render(<Stats />);

        return div;
      },
      onRemove: () => {
        // Optionally handle cleanup
      },
      options: {
        position: "topleft",
      },
    });

    const control = new Custom();
    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
};
