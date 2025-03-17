import React, { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import bangladeshData from "@/lib/bangladesh.json";

import { TILE_LINK } from "@/constant/tile-link";
import { GEO_JSON_STYLE } from "@/constant/geo-json-style";
import { TILE_CONFIG } from "@/constant/tile-config";

import type { GeoJsonObject } from "geojson";

const bangladeshGeoJson = bangladeshData as GeoJsonObject;

const TileLayer = () => {
  const map = useMap();
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const addTileLayer = useCallback(() => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    tileLayerRef.current = L.tileLayer(TILE_LINK, { ...TILE_CONFIG }).addTo(
      map
    );

    L.geoJSON(bangladeshGeoJson, {
      style: (feature) => ({
        ...GEO_JSON_STYLE,
      }),
    }).addTo(map);
  }, [map]);

  useEffect(() => {
    addTileLayer();

    return () => {
      if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    };
  }, [map, addTileLayer]);

  return null;
};

export const ThemeTileLayer = React.memo(TileLayer);
