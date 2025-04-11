'use client';

import { useState, useEffect } from 'react';

interface ResponsiveZoom {
	DEFAULT: number;
	MAX: number;
	MIN: number;
}

export function useResponsiveZoom(): ResponsiveZoom {
	const [zoom, setZoom] = useState<ResponsiveZoom>({
		DEFAULT: 7.5,
		MAX: 10,
		MIN: 7.5,
	});

	useEffect(() => {
		// Function to update zoom based on screen size
		const updateZoom = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			// Small screens (mobile)
			if (width < 640) {
				setZoom({
					DEFAULT: 8,
					MAX: 10,
					MIN: 6,
				});
			}

			// Small screens (mobile)
			if (width < 768) {
				setZoom({
					DEFAULT: 7,
					MAX: 10,
					MIN: 6,
				});
			}

			// Medium screens (tablets)
			else if (width < 1024) {
				setZoom({
					DEFAULT: 8,
					MAX: 10,
					MIN: 6,
				});
			}
			// Large screens
			else if (width < 2000) {
				setZoom({
					DEFAULT: 7.5,
					MAX: 10,
					MIN: 6,
				});
			}
			// Extra large screens
			else {
				setZoom({
					DEFAULT: 9,
					MAX: 11,
					MIN: 7,
				});
			}

			// Further adjust based on height if needed
			if (height < 700) {
				setZoom((prev) => ({
					...prev,
					DEFAULT: Math.max(prev.DEFAULT - 0.5, prev.MIN),
					MAX: prev.MAX - 0.5,
				}));
			}
		};

		// Initial update
		updateZoom();

		// Add event listener for window resize
		window.addEventListener('resize', updateZoom);

		// Cleanup
		return () => window.removeEventListener('resize', updateZoom);
	}, []);

	return zoom;
}
