'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './navbar';

const MapComponent = dynamic(() => import('@/components/map-component'), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center w-full h-full bg-muted">
			<div className="flex flex-col items-center gap-2">
				<div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
				<p className="text-muted-foreground text-sm">Loading map...</p>
			</div>
		</div>
	),
});

export default function MapContainer() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className="flex items-center justify-center w-full h-full bg-muted">
				<div className="flex flex-col items-center gap-2">
					<div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
					<p className="text-muted-foreground text-sm">Loading map...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="">
			<div className="hidden md:block w-fit border border-muted-foreground/30 absolute bottom-8 right-8 z-[10] bg-transparent px-5 py-4 rounded-md shadow-lg backdrop-blur-md ml-96">
				<div className="flex flex-col gap-1 text-slate-800">
					<h2 className="text-lg font-semibold">
						In Memory of the Victims • July 6, 2024
					</h2>
					<p className="text-sm opacity-80">
						Honoring those who lost their lives during the Bangladesh protests
					</p>
				</div>
				<Navbar />
			</div>

			<div className="w-50 h-50 rounded-r-2xl overflow-hidden">
				<MapComponent />
			</div>
		</div>
	);
}
