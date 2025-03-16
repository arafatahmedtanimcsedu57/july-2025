'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { MajorNewsCoverage } from './news-coverage';
import { FilterControls } from './../filter-controls';

import { SummaryStats } from './stats';
import { CasualtiesList } from './casualtiesList';

export default function IncidentSidebar() {
	return (
		<div className="transition-all duration-300 ease-in-out overflow-hidden border-r border-dashed w-[450px]">
			<div className="flex flex-col h-[calc(100vh-61px)]">
				<FilterControls />

				<ScrollArea className="flex-1">
					<SummaryStats />

					<CasualtiesList />
					<MajorNewsCoverage />
				</ScrollArea>
			</div>
		</div>
	);
}
