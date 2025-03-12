'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map-component'), {
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
	return (
		<div className="container">
			<MapComponent />
		</div>
	);
}
