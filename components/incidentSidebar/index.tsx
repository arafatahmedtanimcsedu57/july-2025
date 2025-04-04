'use client';

import { SummaryStats } from './stats';
import { CasualtiesList } from './casualtiesList';
import { MajorNewsCoverage } from './news-coverage';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function IncidentSidebar() {
	return (
		<div className="transition-all duration-300 ease-in-out overflow-hidden border-r border-dashed w-[300px]">
			<div className="flex flex-col h-[calc(100vh-61px)]">
				<SummaryStats />
				<ScrollArea className="flex-1">
					<CasualtiesList />
					<MajorNewsCoverage />
				</ScrollArea>
			</div>
		</div>
	);
}
