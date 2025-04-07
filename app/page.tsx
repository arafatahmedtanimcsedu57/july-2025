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

import { useFilterStore } from '@/lib/filter-store';
import { useIncidentStore } from '@/lib/incident-store';
import { useSidebarStore } from '@/lib/sidebar-store';

export default function Home() {
	const { casualtyTypeFilter, setCasualtyTypeFilter, resetFilters } =
		useFilterStore();
	const { setSelectedIncident } = useIncidentStore();
	const { close } = useSidebarStore();

	const handleCasualtyTypeFilter = (casualtyType: string) => {
		if (casualtyTypeFilter !== casualtyType) {
			setSelectedIncident(null);
			resetFilters();
			close();
			setCasualtyTypeFilter(casualtyType);
		}
	};

	return (
		<main className="flex flex-1 flex-col bg-background h-[100vh]">
			<div className="flex h-full">
				<div className="w-[50px] flex flex-col bg-foreground justify-center items-center shadow-2xl z-[100]">
					{CASUALTY.map((casualty) => (
						<TooltipProvider key={casualty.name}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										key={casualty.name}
										onClick={() => handleCasualtyTypeFilter(casualty.value)}
										className={`text-slate-600 dark:text-white ${
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

				<div className="hidden md:flex md:w-full">
					<div className="text-slate-600 md:w-[50%] w-full">
						<div className="flex flex-col  flex-wrap p-10">
							<h5 className="text-2xl font-semibold">July Memorial</h5>
							<p className="hidden md:block text-xs font-light">
								Remembering July 2024
							</p>
						</div>
					</div>
					<MapContainer />
				</div>
			</div>
		</main>
	);
}
