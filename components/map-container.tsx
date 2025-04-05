'use client';

import dynamic from 'next/dynamic';
import { FilterControls } from './filter-controls';

import { useFilterStore } from '@/lib/filter-store';
import { CASUALTY_TYPES } from '@/constant/casualty-types';

const MapComponent = dynamic(() => import('@/components/mapComponent'), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center h-[calc(100vh-34px)] bg-muted">
			<div className="flex flex-col items-center gap-2">
				<div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
				<p className="text-muted-foreground text-sm">Loading map...</p>
			</div>
		</div>
	),
});

export default function MapContainer() {
	const { casualtyTypeFilter } = useFilterStore();

	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

	return (
		<div className="w-full">
			<FilterControls />

			<MapComponent />
		</div>
	);
}
