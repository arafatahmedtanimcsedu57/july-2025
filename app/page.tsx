'use client';

import MapContainer from '@/components/map-container';
import IncidentSidebar from '@/components/incidentSidebar';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { CASUALTY } from '@/constant/casualty-types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

import { useFilterStore } from '@/lib/filter-store';
import { useIncidentStore } from '@/lib/incident-store';

export default function Home() {
	const { casualtyTypeFilter, setCasualtyTypeFilter } = useFilterStore();
	const { setSelectedIncident } = useIncidentStore();

	const handleCasualtyTypeFilter = (casualtyType: string) => {
		if (casualtyTypeFilter !== casualtyType) {
			setSelectedIncident(null);
			setCasualtyTypeFilter(casualtyType);
		}
	};

	return (
		<main className="border-grid flex flex-1 flex-col">
			<Navbar />

			<div className="m-auto container border-dashed border-x h-[calc(100vh-61px)] flex">
				<div className="min-w-[50px] border-r border-dashed flex flex-col justify-center items-center h-full">
					{CASUALTY.map((casualty) => (
						<TooltipProvider key={casualty.name}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										key={casualty.name}
										onClick={() => handleCasualtyTypeFilter(casualty.value)}
										className={`${
											casualtyTypeFilter === casualty.value ? 'bg-muted' : ''
										}`}
									>
										<casualty.icon />
									</Button>
								</TooltipTrigger>

								<TooltipContent>{casualty.name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</div>
				<IncidentSidebar />

				<MapContainer />
				<Sidebar />
			</div>
			<Toaster />
		</main>
	);
}
