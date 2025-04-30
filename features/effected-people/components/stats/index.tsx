import React from 'react';

import { FilterControls } from '@/app/filter-control';
import Methodology from '@/app/methodology';
import {
	DonutCharts,
	TotalCasualties,
	DateWiseBarChart,
	ListData,
} from '@/features/effected-people/components/stats/overall';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import FilterContainer from '@/app/filter-container';

const VIEWS: Record<string, Record<string, string>> = {
	PERSON_LIST: {
		value: 'PERSON_LIST',
		label: 'Person List',
	},
	OVERVIEW: {
		value: 'OVERVIEW',
		label: 'Overview',
	},
} as const;

function Stats() {
	return (
		<div className="h-full flex flex-col min-w-[430px] bg-foreground rounded-3xl border shadow-lg dark:text-white text-slate-700 relative">
			<FilterControls />

			<TotalCasualties />

			<Tabs
				className="flex-1 min-h-0 flex flex-col p-10"
				defaultValue={VIEWS.PERSON_LIST.value}
			>
				<TabsList className="grid grid-cols-2 mb-4 w-[250px] m-0">
					{Object.keys(VIEWS).map((view) => {
						return (
							<TabsTrigger key={view} value={VIEWS[view].value}>
								{VIEWS[view].label}
							</TabsTrigger>
						);
					})}
				</TabsList>
				<TabsContent value={VIEWS.OVERVIEW.value}>
					<div className="py-10 flex-1 flex flex-col">
						<div className="w-max flex flex-wrap gap-10 mb-10">
							<DonutCharts />
						</div>

						<DateWiseBarChart />
					</div>
				</TabsContent>

				<TabsContent
					value={VIEWS.PERSON_LIST.value}
					className="flex-1 min-h-0 flex flex-col"
				>
					<div className="py-10 flex-1 min-h-0 overflow-auto">
						<ListData />
					</div>
				</TabsContent>
			</Tabs>

			<div className="absolute right-0 top-6 translate-x-[100%]">
				<FilterContainer />
			</div>

			<div className="absolute right-0 top-20 translate-x-[100%]">
				<Methodology />
			</div>
		</div>
	);
}

export default Stats;
