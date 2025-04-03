'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type L from 'leaflet';
import type { CasualtyPerson } from '@/types/data';
import { BANGLADESH_CENTER, MAP_ZOOM } from '@/constant/map-container-config';

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
	flyToZoom = MAP_ZOOM.MAX,
	defaultZoom = MAP_ZOOM.DEFAULT,
}: MapControllerProps) {
	const map = useMap();
	const flyingRef = useRef(false);

	useEffect(() => {
		if (
			selectedPerson &&
			selectedPerson.lat != null &&
			selectedPerson.lng != null
		) {
			if (map.dragging.enabled()) {
				map.dragging.disable();
				flyingRef.current = true;
			}

			map.flyTo([selectedPerson.lat, selectedPerson.lng], flyToZoom, {
				animate: true,
				duration: flyToDuration,
			});

			const enableDraggingTimeout = setTimeout(() => {
				if (flyingRef.current) {
					map.dragging.enable();
					flyingRef.current = false;
				}
			}, flyToDuration * 1000);

			if (markerRefs && markerRefs.has(String(selectedPerson.id))) {
				const popupTimeout = setTimeout(() => {
					const marker = markerRefs.get(String(selectedPerson.id));
					if (marker) {
						marker.openPopup();
					}
				}, flyToDuration * 0.1 * 1000 + 100); // Convert to milliseconds and add buffer

				return () => {
					clearTimeout(popupTimeout);
					clearTimeout(enableDraggingTimeout);
					if (flyingRef.current) {
						map.dragging.enable();
						flyingRef.current = false;
					}
				};
			}

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
	}, [selectedPerson, map, markerRefs, flyToDuration, flyToZoom, defaultZoom]);

	return null;
}
