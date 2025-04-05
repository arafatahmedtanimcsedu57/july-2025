'use client';

import { memo, useMemo } from 'react';
import { CircleMarker, Marker } from 'react-leaflet';
import type L from 'leaflet';

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

	const { setSelectedIncident, selectedIncident } = useIncidentStore();
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

	const markerPin = (
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

	const markerComponent = (
		<CircleMarker
			key={person.id}
			center={markerPosition}
			radius={isMultipleCasualties ? (person.verified_deaths || 0) / 50 : 5}
			pathOptions={{
				color:
					person.type && CASUALTY_ITEMS_COLORS[person.type]
						? CASUALTY_ITEMS_COLORS[person.type]()
						: '',
				fillColor:
					person.type && CASUALTY_ITEMS_COLORS[person.type]
						? CASUALTY_ITEMS_COLORS[person.type]()
						: '',
				fillOpacity: 1,
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
			{(selectedIncident?.id && selectedIncident?.id === person.id) ||
				(selectedIncident?.district &&
					selectedIncident?.district === person.district &&
					markerPin)}
		</CircleMarker>
	);

	if (isMultipleCasualties) {
		return (
			<CircleMarker
				key={person.id}
				center={markerPosition}
				radius={(person.total_cases || 1) / 50}
				pathOptions={{
					color: '#e9a30c',
					fillColor: '#e9a30c',
					fillOpacity: 0.35,
					weight: 1,
					stroke: true,
				}}
				eventHandlers={{
					click: () => {
						setSelectedIncident(person);
					},
				}}
			>
				{markerComponent}
			</CircleMarker>
		);
	}

	return markerComponent;
});

CasualtyMarker.displayName = 'CasualtyMarker';

export default CasualtyMarker;
