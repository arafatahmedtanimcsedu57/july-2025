'use client';

import MapContainer from '@/features/home/components/map-container';
import Header from '@/features/home/components/header';
import {
	DonutCharts,
	TabularData,
	TopNCasesByTotalCases,
	TotalCasualties,
} from '@/features/home/components/stats/overall';

export default function Home() {
	return (
		<>
			<div className=" text-slate-600 h-full relative">
				<div className="absolute z-10 backdrop-blur-[1px] overflow-auto scrollbar-hide h-full flex flex-col gap-4">
					<Header />

					<TotalCasualties />

					<div className="p-10 flex-1 flex flex-col">
						<div className="w-max flex flex-wrap gap-10 mb-10">
							<DonutCharts />
						</div>

						<div className="w-max flex flex-wrap gap-10 mb-10">
							<TabularData />
						</div>

						<TopNCasesByTotalCases />
					</div>
				</div>
			</div>

			<div className="flex-1 h-full">
				<MapContainer />
			</div>
		</>
	);
}
