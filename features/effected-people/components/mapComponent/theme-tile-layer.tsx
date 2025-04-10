import React, { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import bangladeshData from "@/data/bangladesh.json";
import bangladeshDetailsData from "@/data/bangladesh_details.json";
import districtData from "@/data/bd-districts.json";

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

    districtData.districts.forEach((district) => {
      const lat = Number.parseFloat(district.lat);
      const lng = Number.parseFloat(district.long);

      if (!isNaN(lat) && !isNaN(lng)) {
        const icon = L.divIcon({
          className: "division-label",
          html: `${district.name}`,
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
