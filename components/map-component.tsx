'use client';

import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import L from 'leaflet';
import { Loader2 } from 'lucide-react';
import {
	MapContainer,
	useMap,
	CircleMarker,
	Popup,
	Rectangle,
	ZoomControl,
} from 'react-leaflet';

import { useTheme } from '@/components/theme-provider';

import { getCasualtyDataByDate } from '@/lib/data';
import { useIncidentStore } from '@/lib/incident-store';
import { useDayStore } from '@/lib/day-store';
import { getUpdatedPersonData } from '@/lib/edit-store';

import 'leaflet/dist/leaflet.css';
import './map.css';

// Define colors for different casualty types with a default fallback
const markerColors: Record<string, { color: string; fillColor: string }> = {
	Death: { color: '#ef4444', fillColor: '#ef4444' }, // red
	Injury: { color: '#f97316', fillColor: '#f97316' }, // orange
	'Multiple Casualties': { color: '#8b5cf6', fillColor: '#8b5cf6' }, // purple
	'No Casualties': { color: '#3b82f6', fillColor: '#3b82f6' }, // blue
	default: { color: '#6b7280', fillColor: '#6b7280' }, // gray as default
};

// Helper function to get marker color safely
const getMarkerColor = (type: string | null) => {
	if (!type || !(type in markerColors)) {
		return markerColors['default'];
	}
	return markerColors[type];
};

// Define Bangladesh bounds with a more specific type
const bangladeshBounds: [[number, number], [number, number]] = [
	[20.7, 88.0], // Southwest corner
	[26.7, 92.7], // Northeast corner
];

// Component to handle map zooming and bounds
function MapController({
	selectedPersonId,
}: {
	selectedPersonId: string | null;
}) {
	const map = useMap();
	const { currentDay } = useDayStore();
	const casualtyData = getCasualtyDataByDate(currentDay);
	const prevDayRef = React.useRef(currentDay);

	useEffect(() => {
		if (selectedPersonId) {
			const person = casualtyData.find(
				(p) => p.id.toString() === selectedPersonId,
			);
			if (person && person.lat != null && person.lng != null) {
				map.flyTo([person.lat, person.lng], 18, {
					animate: true,
					duration: 2,
				});
			}
		}
	}, [selectedPersonId, casualtyData, map]);

	// Reset zoom level when date changes
	useEffect(() => {
		// Only reset if the date actually changed
		if (prevDayRef.current !== currentDay) {
			// Reset to fit Bangladesh bounds
			map.fitBounds(bangladeshBounds, {
				animate: true,
				duration: 1.5,
			});
			prevDayRef.current = currentDay;
		}
	}, [currentDay, map]);

	return null;
}

// Component to handle tile layers based on theme
function ThemeTileLayer() {
	const map = useMap();
	const tileLayerRef = useRef<L.TileLayer | null>(null);

	// Function to add the appropriate tile layer
	const addTileLayer = useCallback(() => {
		// Remove existing tile layer if it exists
		if (tileLayerRef.current) {
			map.removeLayer(tileLayerRef.current);
			tileLayerRef.current = null;
		}

		tileLayerRef.current = L.tileLayer(
			'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				maxZoom: 19,
				className: 'grayscale-tiles',
			},
		).addTo(map);
	}, [map]);

	// Add tile layer on initial mount and when theme changes
	useEffect(() => {
		addTileLayer();

		// Cleanup function to remove tile layer when component unmounts
		return () => {
			if (tileLayerRef.current) {
				map.removeLayer(tileLayerRef.current);
			}
		};
	}, [map, addTileLayer]);

	return null;
}

export default function MapComponent() {
	const [isLoading, setIsLoading] = useState(true);
	const { selectedIncidentId, setSelectedIncident } = useIncidentStore();
	const { currentDay } = useDayStore();
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';

	// Get data for the current day
	const casualtyData = getCasualtyDataByDate(currentDay);

	// Center on Bangladesh
	const bangladeshCenter: [number, number] = [23.8103, 90.4125]; // Dhaka coordinates

	useEffect(() => {
		// Reset selected incident when day changes
		setSelectedIncident(null);
	}, [currentDay, setSelectedIncident]);

	useEffect(() => {
		// Simulate loading the map data
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center w-full h-full bg-muted">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	// Filter out data points with null lat/lng
	const validCasualtyData = casualtyData.filter(
		(person) => person.lat != null && person.lng != null,
	);

	return (
		<MapContainer
			center={bangladeshCenter}
			zoom={7}
			zoomControl={true}
			minZoom={7}
			dragging={true} // Ensure dragging is enabled
			doubleClickZoom={true}
			scrollWheelZoom={true}
			style={{ width: 'calc(100vw - 400px)', height: 'calc(100vh - 110px)' }}
		>
			<ZoomControl position="bottomleft" />
			{/* Also use ThemeTileLayer to handle theme changes */}
			<ThemeTileLayer />
			{/* Bangladesh border outline */}
			<Rectangle
				bounds={bangladeshBounds}
				pathOptions={{
					color: isDarkMode ? '#666' : '#333',
					weight: 2,
					fill: false,
					dashArray: '5, 5',
					opacity: 1,
				}}
			/>
			{/* Only show markers if not in location selection mode */}
			{validCasualtyData.map((person) => {
				// Get updated person data if it exists
				const updatedPerson = getUpdatedPersonData(person);

				// Get marker color safely
				const markerColor = getMarkerColor(updatedPerson.type);

				// Ensure lat and lng are not null before creating CircleMarker
				if (updatedPerson.lat === null || updatedPerson.lng === null)
					return null;

				return (
					<CircleMarker
						key={person.id}
						center={[updatedPerson.lat, updatedPerson.lng] as [number, number]}
						radius={4}
						pathOptions={{
							color: markerColor.color,
							fillColor: markerColor.fillColor,
							fillOpacity: 1,
							weight: 0,
						}}
						eventHandlers={{
							click: () => {
								setSelectedIncident(person.id.toString());
							},
						}}
					>
						<Popup closeButton={false}>
							<div className="p-1 flex items-center gap-2">
								<span className="font-medium text-sm">
									{updatedPerson.name || 'Unknown'}
								</span>
							</div>
						</Popup>
					</CircleMarker>
				);
			})}
			<MapController selectedPersonId={selectedIncidentId} />
		</MapContainer>
	);
}
