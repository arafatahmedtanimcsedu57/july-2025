'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { CasualtyPerson } from '@/types/data';
import { BANGLADESH_CENTER } from '@/constant/map-container-config';
import type L from 'leaflet';

interface MapControllerProps {
	selectedPerson: CasualtyPerson | null;
	markerRefs: Map<string, L.Marker> | null;
	flyToDuration?: number;
	flyToZoom?: number;
	defaultZoom?: number;
}

export default function MapController({
	selectedPerson,
	markerRefs,
	flyToDuration = 2,
	flyToZoom = 18,
	defaultZoom = 7,
}: MapControllerProps) {
	const map = useMap();

	useEffect(() => {
		console.log(selectedPerson, selectedPerson?.lat, selectedPerson?.lng);
		if (
			selectedPerson &&
			selectedPerson.lat != null &&
			selectedPerson.lng != null
		) {
			map.flyTo([selectedPerson.lat, selectedPerson.lng], flyToZoom, {
				animate: true,
				duration: flyToDuration,
			});

			if (markerRefs && markerRefs.has(String(selectedPerson.id))) {
				const popupTimeout = setTimeout(() => {
					const marker = markerRefs.get(String(selectedPerson.id));
					if (marker) {
						marker.openPopup();
					}
				}, flyToDuration * 0.1 + 100); // Add a small buffer

				return () => clearTimeout(popupTimeout);
			}
		} else {
			map
				.flyTo(BANGLADESH_CENTER, defaultZoom, {
					animate: true,
					duration: flyToDuration,
				})
				.closePopup();
		}
	}, [selectedPerson]);

	return null;
}
