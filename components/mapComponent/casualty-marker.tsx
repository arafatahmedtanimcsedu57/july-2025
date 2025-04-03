'use client';

import { memo, useMemo } from 'react';
import { formatDate } from 'date-fns';
import { CircleMarker, Marker, Popup } from 'react-leaflet';
import type L from 'leaflet';
import { Calendar1Icon, MapPinIcon } from 'lucide-react';

import { useIncidentStore } from '@/lib/incident-store';
import { useFilterStore } from '@/lib/filter-store';

import { MapIcons } from './map-icons';
import {
	CASUALTY_ITEMS,
	CASUALTY_ITEMS_COLORS,
	CASUALTY_TYPES,
} from '@/constant/casualty-types';
import type { CasualtyPerson } from '@/types/data';

interface CasualtyMarkerProps {
	person: CasualtyPerson;
	onMarkerRef: (id: string, marker: L.Marker) => void;
}

const CasualtyMarker = memo(({ person, onMarkerRef }: CasualtyMarkerProps) => {
	const { id, name, type, lat, lng } = person;

	const { setSelectedIncident } = useIncidentStore();
	const { casualtyTypeFilter } = useFilterStore();

	const icon =
		type === 'Death'
			? MapIcons.death
			: type === 'Injury'
			? MapIcons.injury
			: MapIcons.multipleCasualties;

	const setMarkerRef = useMemo(() => {
		return (marker: L.Marker | null) => {
			if (marker) {
				onMarkerRef(String(id), marker);
			}
		};
	}, [id, onMarkerRef]);

	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

	if (type === CASUALTY_ITEMS.NO_CASUALTIES || lat === null || lng === null)
		return null;

	const markerPosition = [lat, lng] as [number, number];

	const markerComponent = (
		<Marker
			icon={icon}
			position={markerPosition}
			ref={setMarkerRef}
			eventHandlers={{
				keypress: (e) => {
					if (e.originalEvent.key === 'Enter') {
						(e.target as L.Marker).openPopup();
					}
				},
				click: () => {
					setSelectedIncident(person);
				},
			}}
			keyboard={true}
			aria-label={`${type} marker for ${name || 'Unknown person'}`}
		/>
	);

	if (isMultipleCasualties) {
		return (
			<CircleMarker
				key={person.id}
				center={markerPosition}
				radius={30}
				pathOptions={{
					color: 'red',
					fillColor: 'red',
					fillOpacity: 0.125,
					weight: 0,
					stroke: true,
				}}
				eventHandlers={{
					click: () => {
						setSelectedIncident(person);
					},
				}}
				className="drop-shadow-[0_0_0.1rem_crimson]"
			>
				{markerComponent}
			</CircleMarker>
		);
	}

	return markerComponent;
});

CasualtyMarker.displayName = 'CasualtyMarker';

export default CasualtyMarker;
