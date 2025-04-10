import React, { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import bangladeshData from "@/data/bangladesh.json";
import bangladeshDetailsData from "@/data/bangladesh_details.json";
import divisionsData from "@/data/bd-divisions.json";

import {
  GEO_DETAILS_JSON_STYLE,
  GEO_JSON_STYLE,
} from "@/constant/geo-json-style";

import type { GeoJsonObject } from "geojson";

const bangladeshGeoJson = bangladeshData as GeoJsonObject;
const bangladeshDetailsGeoJson = bangladeshDetailsData as GeoJsonObject;

const TileLayer = () => {
  const map = useMap();

  const addTileLayer = useCallback(() => {
    L.geoJSON(bangladeshDetailsGeoJson, {
      style: (feature) => ({
        ...GEO_DETAILS_JSON_STYLE,
      }),
    }).addTo(map);

    L.geoJSON(bangladeshGeoJson, {
      style: (feature) => ({
        ...GEO_JSON_STYLE,
      }),
    }).addTo(map);

    divisionsData.divisions.forEach((division) => {
      const lat = Number.parseFloat(division.lat);
      const lng = Number.parseFloat(division.long);

      if (!isNaN(lat) && !isNaN(lng)) {
        const icon = L.divIcon({
          className: "division-label",
          html: `${division.name}`,
          iconSize: [100, 20],
          iconAnchor: [50, 10],
        });

        L.marker([lat, lng], { icon }).addTo(map);
      }
    });
  }, []);

  useEffect(() => {
    addTileLayer();
  }, [map, addTileLayer]);

  return null;
};

export const ThemeTileLayer = React.memo(TileLayer);
