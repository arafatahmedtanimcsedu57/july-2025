import React, { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

import bangladeshData from '@/data/bangladesh.json';
import bangladeshDetailsData from '@/data/bangladesh_details.json';
import districtData from '@/data/bd-districts.json';

import {
	GEO_DETAILS_JSON_STYLE,
	GEO_JSON_STYLE,
} from '@/constant/geo-json-style';

import type { GeoJsonObject } from 'geojson';

const bangladeshGeoJson = bangladeshData as GeoJsonObject;
const bangladeshDetailsGeoJson = bangladeshDetailsData as GeoJsonObject;

const TileLayer = () => {
	const map = useMap();

	const addTileLayer = useCallback(() => {
		map.createPane('basePane');
		map.createPane('detailsPane');
		map.createPane('labelsPane');

		map.getPane('basePane')!.style.zIndex = '200';
		map.getPane('detailsPane')!.style.zIndex = '300';
		map.getPane('labelsPane')!.style.zIndex = '400';

		L.geoJSON(bangladeshDetailsGeoJson, {
			pane: 'detailsPane',
			style: (feature) => ({
				...GEO_DETAILS_JSON_STYLE,
			}),
		}).addTo(map);

		L.geoJSON(bangladeshGeoJson, {
			pane: 'basePane',
			style: (feature) => ({
				...GEO_JSON_STYLE,
			}),
		}).addTo(map);

		districtData.districts.forEach((district) => {
			const lat = Number.parseFloat(district.lat);
			const lng = Number.parseFloat(district.long);

			if (!isNaN(lat) && !isNaN(lng)) {
				const icon = L.divIcon({
					className: 'division-label',
					html: `${district.name}`,
					iconSize: [100, 20],
					iconAnchor: [50, 10],
				});

				L.marker([lat, lng], {
					icon,
					pane: 'labelsPane',
				}).addTo(map);
			}
		});
	}, [map]);

	useEffect(() => {
		addTileLayer();
	}, [addTileLayer]);

	return null;
};

export const ThemeTileLayer = React.memo(TileLayer);
