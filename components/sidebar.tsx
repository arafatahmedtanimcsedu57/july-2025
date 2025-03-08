'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSidebarStore } from '@/lib/sidebar-store';
import { useDayStore } from '@/lib/day-store';
import { getCasualtyDataByDate } from '@/lib/data';
import { Move, BoxIcon as Box3d, HelpCircle, Map, MapPin } from 'lucide-react';

export default function Sidebar() {
	const { isOpen, close } = useSidebarStore();
	const { currentDay } = useDayStore();

	// Get data for the current day
	const casualtyData = getCasualtyDataByDate(currentDay);

	// Update the totals calculation
	const totals = casualtyData.reduce(
		(acc, person) => {
			if (person.type) {
				acc[person.type]++;
			}
			return acc;
		},
		{
			Death: 0,
			Injury: 0,
			'Multiple Casualties': 0,
			'No Casualties': 0,
		} as Record<string, number>,
	);

	// Close sidebar when escape key is pressed
	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		};

		window.addEventListener('keydown', handleEscapeKey);
		return () => window.removeEventListener('keydown', handleEscapeKey);
	}, [close]);

	// Close sidebar on window resize (mobile to desktop)
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				close();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [close]);

	// Get unique locations, filtering out null values
	const uniqueLocations = Array.from(
		new Set(casualtyData.map((p) => p.location).filter(Boolean)),
	);

	return (
		<aside
			className={`fixed top-16 right-0 bottom-0 w-full md:w-80 border-l bg-background z-40 overflow-auto transition-transform duration-300 ease-in-out ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="p-4 space-y-4">
				<Card className="overflow-hidden border-primary/10">
					<CardHeader className="bg-primary/5 py-3">
						<CardTitle className="text-base flex items-center gap-2">
							<Map className="h-4 w-4 text-primary" />
							Map Legend
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<div className="space-y-2.5">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
								<span className="text-sm">
									Deaths{' '}
									<span className="font-medium">({totals['Death'] || 0})</span>
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
								<span className="text-sm">
									Injuries{' '}
									<span className="font-medium">({totals['Injury'] || 0})</span>
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 rounded-full bg-purple-500 shadow-sm"></div>
								<span className="text-sm">
									Multiple Casualties{' '}
									<span className="font-medium">
										({totals['Multiple Casualties'] || 0})
									</span>
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
								<span className="text-sm">
									No Casualties{' '}
									<span className="font-medium">
										({totals['No Casualties'] || 0})
									</span>
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-primary/10">
					<CardHeader className="bg-primary/5 py-3">
						<CardTitle className="text-base flex items-center gap-2">
							<HelpCircle className="h-4 w-4 text-primary" />
							About This Map
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<p className="text-sm text-muted-foreground">
							This map focuses exclusively on Bangladesh, showing individual
							casualties during the incidents that occurred in July 2024. Each
							marker represents a single person who was killed, injured, or
							reported missing.
						</p>
						<div className="mt-2 p-2 bg-muted rounded-md flex items-center gap-2">
							<Box3d className="h-4 w-4 text-primary" />
							<span className="text-xs">
								Map is displayed in 3D perspective view
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-primary/10">
					<CardHeader className="bg-primary/5 py-3">
						<CardTitle className="text-base flex items-center gap-2">
							<MapPin className="h-4 w-4 text-primary" />
							Locations
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4 max-h-48 overflow-y-auto">
						<div className="space-y-2 text-sm">
							{uniqueLocations.length > 0 ? (
								uniqueLocations.map((location) => {
									const count = casualtyData.filter(
										(p) => p.location === location,
									).length;
									return (
										<div
											key={location}
											className="flex justify-between border-b border-border/40 pb-1 last:border-0"
										>
											<span>{location}</span>
											<span className="font-medium">
												{count} {count === 1 ? 'person' : 'people'}
											</span>
										</div>
									);
								})
							) : (
								<div className="text-muted-foreground">
									No location data available
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-primary/10">
					<CardHeader className="bg-primary/5 py-3">
						<CardTitle className="text-base flex items-center gap-2">
							<Move className="h-4 w-4 text-primary" />
							Map Controls
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<div className="space-y-2 text-sm">
							<p className="flex items-center gap-2 text-primary font-medium">
								<Move className="h-4 w-4" />
								<strong>Pan:</strong> Click and drag the map
							</p>
							<p className="flex items-center gap-2">
								<span className="w-4 h-4 flex items-center justify-center">
									+
								</span>
								<strong>Zoom:</strong> Scroll wheel or use zoom buttons
							</p>
							<p className="flex items-center gap-2">
								<span className="w-4 h-4 flex items-center justify-center">
									👆
								</span>
								<strong>Select person:</strong> Click on a marker
							</p>
							<p className="flex items-center gap-2">
								<span className="w-4 h-4 flex items-center justify-center">
									ℹ️
								</span>
								<strong>View details:</strong> Click on a marker to see
								information
							</p>
							<p className="flex items-center gap-2 mt-2 text-primary font-medium">
								<Box3d className="h-4 w-4" />
								<strong>3D View:</strong> Map is displayed in perspective view
							</p>
							<div className="mt-2 p-2 bg-muted rounded-md">
								<p className="text-xs text-muted-foreground">
									Map view is restricted to Bangladesh borders
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</aside>
	);
}
