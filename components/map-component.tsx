'use client';

import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import L from 'leaflet';
import { Loader2 } from 'lucide-react';
import { MapContainer, useMap, CircleMarker, Popup } from 'react-leaflet';

import { getCasualtyDataByDate } from '@/lib/data';
import { useIncidentStore } from '@/lib/incident-store';
import { useDayStore } from '@/lib/day-store';
import { getUpdatedPersonData } from '@/lib/edit-store';
import bangladeshData from '@/lib/bangladesh.json';

import { GeoJsonObject } from 'geojson';

import 'leaflet/dist/leaflet.css';
import './map.css';

const bangladeshGeoJson = bangladeshData as GeoJsonObject;

const markerColors: Record<string, { color: string; fillColor: string }> = {
	Death: { color: '#ef4444', fillColor: '#ef4444' }, // red
	Injury: { color: '#f97316', fillColor: '#f97316' }, // orange
	'Multiple Casualties': { color: '#8b5cf6', fillColor: '#8b5cf6' }, // purple
	'No Casualties': { color: '#3b82f6', fillColor: '#3b82f6' }, // blue
	default: { color: '#6b7280', fillColor: '#6b7280' }, // gray as default
};

const getMarkerColor = (type: string | null) => {
	if (!type || !(type in markerColors)) {
		return markerColors['default'];
	}
	return markerColors[type];
};

const bangladeshBounds: [[number, number], [number, number]] = [
	[20.7, 88.0], // Southwest corner
	[26.7, 92.7], // Northeast corner
];

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

	useEffect(() => {
		if (prevDayRef.current !== currentDay) {
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

	const addTileLayer = useCallback(() => {
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

		L.geoJSON(bangladeshGeoJson, {
			style: (feature) => ({
				color: '#2c2827', // Stroke (border) color
				weight: 2, // Border thickness
				fillColor: '#fffff', // Fill color
				fillOpacity: 0.01, // Transparency of fill
				shadowColor: '#000', // Shadow color (black)
				shadowBlur: 5, // Shadow blur effect
				shadowOffset: [3, 3], // Shadow offset (X, Y)
				lineJoin: 'bevel',
				className: 'filter-[10%]',
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
}

export default function MapComponent() {
	const [isLoading, setIsLoading] = useState(true);
	const { selectedIncidentId, setSelectedIncident } = useIncidentStore();
	const { currentDay } = useDayStore();

	const casualtyData = getCasualtyDataByDate(currentDay);

	const bangladeshCenter: [number, number] = [23.8103, 90.4125]; // Dhaka coordinates

	useEffect(() => {
		setSelectedIncident(null);
	}, [currentDay, setSelectedIncident]);

	useEffect(() => {
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

	const validCasualtyData = casualtyData.filter(
		(person) => person.lat != null && person.lng != null,
	);

	return (
		<MapContainer
			center={bangladeshCenter}
			zoom={7}
			zoomControl={false}
			minZoom={7}
			dragging={true}
			doubleClickZoom={true}
			scrollWheelZoom={true}
			style={{ width: 'calc(100vw - 400px)', height: 'calc(100vh - 110px)' }}
		>
			<ThemeTileLayer />

			{validCasualtyData.map((person) => {
				const updatedPerson = getUpdatedPersonData(person);
				const markerColor = getMarkerColor(updatedPerson.type);

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
