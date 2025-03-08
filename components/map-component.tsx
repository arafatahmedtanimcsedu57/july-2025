'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
	MapContainer,
	TileLayer,
	useMap,
	ZoomControl,
	useMapEvents,
	CircleMarker,
	Popup,
	Rectangle,
	Marker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCasualtyDataByDate } from '@/lib/data';
import { Loader2, Move, MapPin } from 'lucide-react';
import { useIncidentStore } from '@/lib/incident-store';
import { useSidebarStore } from '@/lib/sidebar-store';
import { useDayStore } from '@/lib/day-store';
import { useEditStore, getUpdatedPersonData } from '@/lib/edit-store';
import React from 'react';
import L from 'leaflet';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

// Add custom styles for the popup
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

	// Set initial bounds and restrict panning
	useEffect(() => {
		// Fit map to Bangladesh bounds
		map.fitBounds(bangladeshBounds);

		// Set max bounds to restrict panning
		map.setMaxBounds(bangladeshBounds);

		// Add padding to bounds - create LatLng objects from the coordinates
		const southWest = L.latLng(bangladeshBounds[0][0], bangladeshBounds[0][1]);
		const northEast = L.latLng(bangladeshBounds[1][0], bangladeshBounds[1][1]);
		const paddedBounds = L.latLngBounds(southWest, northEast).pad(0.1);
		map.setMinZoom(7); // Prevent zooming out too far
		map.setMaxBounds(paddedBounds);
	}, [map]);

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

// Component to handle panning events
function PanningController() {
	const [isPanning, setIsPanning] = useState(false);
	const [showIndicator, setShowIndicator] = useState(true);
	const indicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Use map events to detect panning
	useMapEvents({
		mousedown: () => {
			setIsPanning(true);
			// Show indicator for a few seconds when panning starts
			setShowIndicator(true);
			if (indicatorTimeoutRef.current) {
				clearTimeout(indicatorTimeoutRef.current);
			}
		},
		mouseup: () => {
			setIsPanning(false);
			// Hide indicator after a few seconds
			indicatorTimeoutRef.current = setTimeout(() => {
				setShowIndicator(false);
			}, 3000);
		},
		// Remove mouseleave event as it's not in LeafletEventHandlerFnMap
		dragstart: () => {
			setIsPanning(true);
			setShowIndicator(true);
			if (indicatorTimeoutRef.current) {
				clearTimeout(indicatorTimeoutRef.current);
			}
		},
		dragend: () => {
			setIsPanning(false);
			indicatorTimeoutRef.current = setTimeout(() => {
				setShowIndicator(false);
			}, 3000);
		},
	});

	// Show indicator initially and hide after a few seconds
	useEffect(() => {
		indicatorTimeoutRef.current = setTimeout(() => {
			setShowIndicator(false);
		}, 5000);

		return () => {
			if (indicatorTimeoutRef.current) {
				clearTimeout(indicatorTimeoutRef.current);
			}
		};
	}, []);

	return (
		<>
			{/* Panning indicator */}
			{showIndicator && (
				<div className="panning-indicator">
					<Move className="h-4 w-4" />
					<span>
						{isPanning ? 'Panning Map...' : 'Click and drag to pan map'}
					</span>
				</div>
			)}

			{/* Visual overlay when panning */}
			<div className={`panning-overlay ${isPanning ? 'active' : ''}`}>
				<div className="panning-overlay-inner"></div>
			</div>
		</>
	);
}

// Component to handle location selection
function LocationSelector() {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const {
		isSelectingLocation,
		saveLocationSelection,
		cancelLocationSelection,
	} = useEditStore();
	const map = useMap();

	// Use map events to handle clicks for location selection
	useMapEvents({
		click: (e) => {
			if (isSelectingLocation) {
				// Get precise coordinates with 6 decimal places
				const lat = Number.parseFloat(e.latlng.lat.toFixed(6));
				const lng = Number.parseFloat(e.latlng.lng.toFixed(6));
				setPosition([lat, lng]);
			}
		},
	});

	// Reset position when selection mode changes
	useEffect(() => {
		if (!isSelectingLocation) {
			setPosition(null);
		}
	}, [isSelectingLocation]);

	// Zoom out a bit when entering selection mode
	useEffect(() => {
		if (isSelectingLocation) {
			// If we're zoomed in too close, zoom out to see more context
			if (map.getZoom() > 14) {
				map.setZoom(14);
			}
		}
	}, [isSelectingLocation, map]);

	if (!isSelectingLocation) return null;

	return (
		<>
			{/* Location selection overlay */}
			<div className="absolute inset-0 bg-black/20 dark:bg-white/10 z-[1000] pointer-events-none">
				<div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 dark:bg-white/20 text-white px-4 py-2 rounded-md shadow-lg backdrop-blur-sm">
					<div className="flex items-center gap-2">
						<MapPin className="h-4 w-4 text-primary" />
						<span>Click on the map to select a location</span>
					</div>
				</div>
			</div>

			{/* Buttons for confirming or canceling selection */}
			{position && (
				<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-[1001] flex gap-2">
					<Button
						variant="default"
						className="shadow-lg"
						onClick={() => {
							if (position) {
								// Save with precise coordinates
								saveLocationSelection(position[0], position[1]);
							}
						}}
					>
						Confirm Location ({position[0].toFixed(6)}, {position[1].toFixed(6)}
						)
					</Button>
					<Button
						variant="outline"
						className="shadow-lg"
						onClick={cancelLocationSelection}
					>
						Cancel
					</Button>
				</div>
			)}

			{/* Temporary marker for selected position */}
			{position && (
				<Marker
					position={position}
					eventHandlers={{
						click: () => {
							if (position) {
								saveLocationSelection(position[0], position[1]);
							}
						},
					}}
				>
					<Popup className="name-popup" offset={[0, -6]} closeButton={false}>
						<div className="p-1 flex items-center gap-2">
							<span className="font-medium text-sm">
								New Location: {position[0].toFixed(6)}, {position[1].toFixed(6)}
							</span>
						</div>
					</Popup>
				</Marker>
			)}
		</>
	);
}

// Component to handle tile layers based on theme
function ThemeTileLayer() {
	const map = useMap();
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';
	const tileLayerRef = useRef<L.TileLayer | null>(null);

	// Function to add the appropriate tile layer
	const addTileLayer = useCallback(() => {
		// Remove existing tile layer if it exists
		if (tileLayerRef.current) {
			map.removeLayer(tileLayerRef.current);
			tileLayerRef.current = null;
		}

		// Add the appropriate tile layer based on theme
		if (isDarkMode) {
			// Dark mode - black tiles
			tileLayerRef.current = L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
					subdomains: 'abcd',
					maxZoom: 20,
					className: 'dark-tiles',
				},
			).addTo(map);
		} else {
			// Light mode - grayscale tiles
			tileLayerRef.current = L.tileLayer(
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					maxZoom: 19,
					className: 'grayscale-tiles',
				},
			).addTo(map);
		}
	}, [map, isDarkMode]);

	// Add tile layer on initial mount and when theme changes
	useEffect(() => {
		addTileLayer();

		// Cleanup function to remove tile layer when component unmounts
		return () => {
			if (tileLayerRef.current) {
				map.removeLayer(tileLayerRef.current);
			}
		};
	}, [map, addTileLayer, theme]);

	return null;
}

export default function MapComponent() {
	const [isLoading, setIsLoading] = useState(true);
	const { selectedIncidentId, setSelectedIncident } = useIncidentStore();
	const { currentDay } = useDayStore();
	const { editedData, isSelectingLocation } = useEditStore();
	const [useCustomPins, setUseCustomPins] = useState(false);
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';

	// Get data for the current day
	const casualtyData = getCasualtyDataByDate(currentDay);

	// Center on Bangladesh
	const bangladeshCenter: [number, number] = [23.8103, 90.4125]; // Dhaka coordinates

	// Close sidebar when clicking on map
	const handleMapClick = useCallback(() => {
		// Only close sidebar if not in location selection mode
		if (!isSelectingLocation) {
			const { close } = useSidebarStore.getState();
			close();
		}
	}, [isSelectingLocation]);

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
			style={{ height: '100%', width: '100%' }}
			className={`z-0 ${isSelectingLocation ? 'location-selection-mode' : ''}`}
			zoomControl={false}
			dragging={true} // Ensure dragging is enabled
			doubleClickZoom={true}
			scrollWheelZoom={true}
			maxBounds={bangladeshBounds}
			maxBoundsViscosity={1.0} // Prevent dragging outside bounds
		>
			{/* Use TileLayer directly for initial load */}
			{isDarkMode ? (
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
					url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
					className="dark-tiles"
				/>
			) : (
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					className="grayscale-tiles"
				/>
			)}

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
					opacity: 0.7,
				}}
			/>

			<ZoomControl position="bottomright" />

			{/* Only show markers if not in location selection mode */}
			{!isSelectingLocation &&
				validCasualtyData.map((person) => {
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
							center={
								[updatedPerson.lat, updatedPerson.lng] as [number, number]
							}
							radius={6}
							pathOptions={{
								color: markerColor.color,
								fillColor: markerColor.fillColor,
								fillOpacity: 1,
								weight: 0, // Remove border
							}}
							eventHandlers={{
								click: () => {
									setSelectedIncident(person.id.toString());
								},
							}}
						>
							<Popup
								className="name-popup"
								offset={[0, -6]} // Offset to position above the dot
								closeButton={false} // Remove close button for cleaner look
							>
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
			<PanningController />
			<LocationSelector />

			{/* Overlay to close sidebar when clicking on map */}
			<div
				className="absolute inset-0 z-[5] pointer-events-none"
				onClick={handleMapClick}
			/>
		</MapContainer>
	);
}
