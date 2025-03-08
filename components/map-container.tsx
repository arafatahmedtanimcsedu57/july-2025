'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BoxIcon as Box3d } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

// Dynamically import the map component to avoid SSR issues
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
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';

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
		<div
			className={`absolute inset-0 transition-colors duration-300 ${
				isDarkMode
					? 'bg-gradient-to-b from-gray-900 to-black'
					: 'bg-gradient-to-b from-sky-100 to-white'
			}`}
			key={`map-container-${theme}`} // Force re-render when theme changes
		>
			<div className="perspective-container">
				<div className="perspective-indicator backdrop-blur-sm">
					<Box3d className="h-4 w-4" />
					<span>3D Perspective View</span>
				</div>
				<div className="tilted-map-container">
					<MapComponent key={`map-${theme}`} />{' '}
					{/* Force re-render when theme changes */}
				</div>
			</div>
		</div>
	);
}
