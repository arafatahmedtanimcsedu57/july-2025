'use client';

import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';
import type L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { ThemeTileLayer } from './theme-tile-layer';
import MapController from './map-controller';
import CasualtyMarker from './casualty-marker';
import { Skeleton } from '@/components/ui/skeleton';

import { useIncidentStore } from '@/lib/incident-store';
import { useDayStore } from '@/lib/day-store';
import { getUpdatedPersonData } from '@/lib/edit-store';

import { useFilteredData } from '@/hooks/use-filtered-data';

import {
	CASUALTY_ITEMS,
	CASUALTY_ITEMS_COLOR_ELEMENTS,
} from '@/constant/casualty-types';
import {
	BANGLADESH_CENTER,
	MAP_CONTAINER,
	MAP_ZOOM,
} from '@/constant/map-container-config';
import './map.css';

export default function MapComponent() {
	const { selectedIncident, setSelectedIncident } = useIncidentStore();
	const { currentDay } = useDayStore();
	const filteredData = useFilteredData();

	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const [mapError, setMapError] = useState<string | null>(null);

	const validCasualtyData = useMemo(
		() =>
			filteredData.filter((person) => person.lat != null && person.lng != null),
		[filteredData],
	);

	const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());

	useEffect(() => {
		setSelectedIncident(null);
	}, [currentDay, setSelectedIncident]);

	const handleMarkerRef = useCallback((id: string, marker: L.Marker) => {
		markerRefsMap.current.set(id, marker);
		return () => {
			markerRefsMap.current.delete(id);
		};
	}, []);

	const handleMapLoad = useCallback(() => {
		setIsMapLoaded(true);
	}, []);

	if (mapError) {
		return (
			<div className="flex items-center justify-center h-full bg-red-50 rounded-lg p-4">
				<div className="text-center">
					<p className="text-red-600 mb-2">{mapError}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
					>
						Reload
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="relative h-full w-full">
			{!isMapLoaded && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
					<div className="space-y-2 w-[80%]">
						<Skeleton className="h-[300px] w-full rounded-lg" />
						<div className="flex items-center space-x-4">
							<Skeleton className="h-4 w-[30%]" />
							<Skeleton className="h-4 w-[30%]" />
							<Skeleton className="h-4 w-[30%]" />
						</div>
					</div>
				</div>
			)}

			<div
				className="h-full w-full"
				role="region"
				aria-label="Interactive map showing casualty locations"
			>
				<MapContainer
					center={BANGLADESH_CENTER}
					zoom={MAP_CONTAINER.zoom}
					zoomControl={MAP_CONTAINER.zoomControl}
					minZoom={MAP_CONTAINER.minZoom}
					dragging={MAP_CONTAINER.dragging}
					doubleClickZoom={MAP_CONTAINER.doubleClickZoom}
					scrollWheelZoom={MAP_CONTAINER.scrollWheelZoom}
					style={{ ...MAP_CONTAINER.style }}
					whenReady={handleMapLoad}
				>
					<ZoomControl position="topright" />

					<ThemeTileLayer />

					{validCasualtyData.map((person) => {
						const updatedPerson = getUpdatedPersonData(person);
						return (
							<CasualtyMarker
								key={person.id}
								person={updatedPerson}
								onMarkerRef={handleMarkerRef}
							/>
						);
					})}

					<MapController
						selectedPerson={selectedIncident}
						markerRefs={markerRefsMap.current}
						flyToDuration={2}
						flyToZoom={MAP_ZOOM.MAX}
						defaultZoom={MAP_ZOOM.DEFAULT}
					/>
				</MapContainer>
			</div>

			{isMapLoaded && (
				<div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded shadow-lg z-[100]">
					<div className="flex flex-col gap-2 text-xs">
						{Object.entries(CASUALTY_ITEMS).map(([key, value]) => (
							<div key={key} className="flex items-center gap-1">
								{CASUALTY_ITEMS_COLOR_ELEMENTS[value]?.()}
								<span>{value}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
