'use client';

import { useRef } from 'react';
import { MapContainer } from 'react-leaflet';
import type L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CpuIcon } from 'lucide-react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { ThemeTileLayer } from './theme-tile-layer';
import { MapController } from './map-controller';
import { CasualtyMarker } from './casualty-marker';
import { Legend } from './legend';

import {
	BANGLADESH_CENTER,
	MAP_CONTAINER,
	MAP_ZOOM,
} from '@/constant/map-container-config';

import { dataDistrictWiseInjuryDeath } from '@/lib/data_district_wise_injury_death';

import './map.css';

export default function MapComponent() {
	const markerRefsMap = useRef<Map<string, L.Marker>>(new Map());

	return (
		<div className="w-full h-full">
			<MapContainer
				center={BANGLADESH_CENTER}
				zoom={MAP_CONTAINER.zoom}
				zoomControl={MAP_CONTAINER.zoomControl}
				minZoom={MAP_CONTAINER.minZoom}
				dragging={MAP_CONTAINER.dragging}
				doubleClickZoom={MAP_CONTAINER.doubleClickZoom}
				scrollWheelZoom={MAP_CONTAINER.scrollWheelZoom}
				style={{ ...MAP_CONTAINER.style }}
			>
				<ThemeTileLayer />

				{dataDistrictWiseInjuryDeath.map((casualty) => {
					return <CasualtyMarker key={casualty.district} casualty={casualty} />;
				})}

				<MapController
					markerRefs={markerRefsMap.current}
					flyToDuration={2}
					flyToZoom={MAP_ZOOM.MAX}
					defaultZoom={MAP_ZOOM.DEFAULT}
				/>
			</MapContainer>

			<div className="absolute bottom-8 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-[100] min-h-[100px] flex flex-col justify-center">
				<Legend />
			</div>
		</div>
	);
}
