'use client';

import MapContainer from '@/features/country-view/components/map-container';

export default function Home() {
	return (
		<>
			<div className="flex-1 h-full">
				<MapContainer />
			</div>
		</>
	);
}
