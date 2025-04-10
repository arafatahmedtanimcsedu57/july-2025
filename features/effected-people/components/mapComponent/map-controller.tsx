'use client';

import { useEffect, useRef } from 'react';
import { useMap, ZoomControl } from 'react-leaflet';
import type L from 'leaflet';

import { useSelectedPersonStore } from '@/features/effected-people/store/selected-person-store';

import { BANGLADESH_CENTER, MAP_ZOOM } from '@/constant/map-container-config';

interface MapControllerProps {
	markerRefs: Map<string, L.Marker> | null;
	flyToDuration?: number;
	flyToZoom?: number;
	defaultZoom?: number;
}

export function MapController({
	markerRefs,
	flyToDuration = 2,
	flyToZoom = MAP_ZOOM.MAX,
	defaultZoom = MAP_ZOOM.DEFAULT,
}: MapControllerProps) {
	const { selectedPerson } = useSelectedPersonStore();

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

	return (
		<>
			<ZoomControl position="topright" />
		</>
	);
}
