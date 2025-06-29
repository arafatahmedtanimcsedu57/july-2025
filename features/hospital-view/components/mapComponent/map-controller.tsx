import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

import Stats from '@/features/hospital-view/components/stats';

import { useSelectedCasualtyStore } from '@/features/hospital-view/store/selected-casualty-store';

import { BANGLADESH_CENTER, DHAKA_LAT_LONG, MAP_ZOOM } from '@/constant/map-container-config';
import { useMediaQuery } from 'react-responsive';

interface MapControllerProps {
	markerRefs: Map<string, L.Marker> | null;
	flyToDuration?: number;
	flyToZoom?: number;
	defaultZoom?: number;
}

export function MapContainerController({
	markerRefs,
	flyToDuration = 2,
	flyToZoom = MAP_ZOOM.MAX,
	defaultZoom = MAP_ZOOM.DEFAULT,
}: MapControllerProps) {
	const { selectedCasualty } = useSelectedCasualtyStore();
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });

	const map = useMap();
	const flyingRef = useRef(false);

	useEffect(() => {
		if (
			selectedCasualty &&
			selectedCasualty.lat != null &&
			selectedCasualty.lng != null
		) {
			if (map.dragging.enabled()) {
				map.dragging.disable();
				flyingRef.current = true;
			}

			map.flyTo([selectedCasualty.lat, selectedCasualty.lng], flyToZoom, {
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
				.flyTo(isTabletOrMobile ? DHAKA_LAT_LONG : BANGLADESH_CENTER, defaultZoom, {
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
	}, [
		selectedCasualty,
		map,
		markerRefs,
		flyToDuration,
		flyToZoom,
		defaultZoom,
	]);

	return (
		<>
			<ZoomControl position="topright" />
		</>
	);
}

export const MapStatsControl: React.FC = () => {
	const map = useMap();

	const [show, setShow] = useState(false);

	useEffect(() => {
		const Custom = L.Control.extend({
			onAdd: () => {
				const div = L.DomUtil.create('div');
				div.className = `custom-leaflet-control h-screen `; // Optional class for styling

				//  ${
				// show ? "translate-y-1" : "translate-y-[50vh]"
				// }
				L.DomEvent.disableClickPropagation(div);
				L.DomEvent.disableScrollPropagation(div);

				const root = ReactDOM.createRoot(div);
				root.render(<Stats show={show} setShow={setShow} />);

				return div;
			},
			onRemove: () => {
				// Optionally handle cleanup
			},
			options: {
				position: 'topleft',
			},
		});

		const control = new Custom();
		map.addControl(control);

		return () => {
			map.removeControl(control);
		};
	}, [map, show]);

	return null;
};
