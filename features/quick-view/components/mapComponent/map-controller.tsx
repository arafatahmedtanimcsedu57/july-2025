"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";

import Stats from "@/features/quick-view/components/stats";

import { useSelectedCasualtyStore } from "@/features/quick-view/store/selected-casualty-store";

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
  const { selectedCasualty } = useSelectedCasualtyStore();

  const map = useMap();
  const flyingRef = useRef(false);

  useEffect(() => {
    if (
      selectedCasualty &&
      selectedCasualty.lat != null &&
      selectedCasualty.lng != null
    ) {
      if (map.dragging.enabled()) {
        map.dragging.disable();
        flyingRef.current = true;
      }

      map.flyTo([selectedCasualty.lat, selectedCasualty.lng], flyToZoom, {
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
  }, [
    selectedCasualty,
    map,
    markerRefs,
    flyToDuration,
    flyToZoom,
    defaultZoom,
  ]);

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
        div.className = "custom-leaflet-control h-screen "; // Optional class for styling
        // "custom-leaflet-control h-screen transform md:translate-y-3/4 md:hover:translate-y-0 md:transition-transform md:duration-500 md:ease-in-out";

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
