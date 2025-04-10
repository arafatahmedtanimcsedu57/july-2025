'use client';

import MapContainer from '@/features/effected-people/components/map-container';
import Header from '@/features/effected-people/components/header';
import {
	DateWiseBarChart,
	DonutCharts,
	ListData,
	TotalCasualties,
} from '@/features/effected-people/components/stats/overall';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const VIEWS: Record<string, Record<string, string>> = {
	OVERVIEW: {
		value: 'OVERVIEW',
		label: 'Overview',
	},
	PERSON_LIST: {
		value: 'PERSON_LIST',
		label: 'Person List',
	},
} as const;

export default function Home() {
	return (
		<>
			<div className="text-slate-600 h-full relative">
				<div className="absolute z-10 backdrop-blur-[1px] overflow-auto scrollbar-hide h-full flex flex-col gap-4">
					<Header />

					<TotalCasualties />

					<Tabs
						className="flex-1 flex flex-col px-10 "
						defaultValue={VIEWS.OVERVIEW.value}
					>
						<TabsList className="grid grid-cols-2 mb-4 w-[250px] m-0 rounded-xl">
							{Object.keys(VIEWS).map((view) => {
								return (
									<TabsTrigger
										key={view}
										value={VIEWS[view].value}
										className="rounded-xl text-slate-700 dark:text-white data-[state=active]:text-primary"
									>
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
						<TabsContent value={VIEWS.PERSON_LIST.value}>
							<div className="py-10 flex-1 flex flex-col">
								<ListData />
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>

			<div className="flex-1 h-full">
				<MapContainer />
			</div>
		</>
	);
}
