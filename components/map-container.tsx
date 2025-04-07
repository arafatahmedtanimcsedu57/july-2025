'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/mapComponent'), {
	ssr: false,
	loading: () => (
		<div className="w-full flex items-center justify-center h-full bg-background">
			<div className="flex flex-col items-center gap-2">
				<div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
				<p className="text-muted-foreground text-sm">Loading map...</p>
			</div>
		</div>
	),
});

export default function MapContainer() {
	return <MapComponent />;
}
