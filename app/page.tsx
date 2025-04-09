'use client';

import MapContainer from '@/components/map-container';
import Header from '@/components/header';
import {
	DonutCharts,
	TabularData,
	TopNCasesByTotalCases,
	TotalCasualties,
} from '@/components/stats/overall';

import Logo from '@/public/logo.png';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
	return (
		<main className="flex flex-1 flex-col bg-background h-[100vh] overflow-hidden">
			<div className="flex h-full">
				<div className="w-[50px] flex flex-col bg-foreground justify-between items-center shadow-2xl z-[100] py-11">
					<Image src={Logo} alt="brand" width={40} height={40} />

					<div></div>
				</div>

				<div className=" text-slate-600 h-full relative">
					<div className="absolute z-10 backdrop-blur-[1px] overflow-auto scrollbar-hide h-full flex flex-col justify-between">
						<Header />

						<div className="flex-1 flex flex-col justify-between p-10 gap-16 ">
							<TotalCasualties />
							<div className="w-max flex flex-wrap gap-10">
								<DonutCharts />
							</div>

							<TabularData />

							<TopNCasesByTotalCases />
						</div>
					</div>
				</div>

				<div className="flex w-full h-full">
					<MapContainer />
				</div>
			</div>
		</main>
	);
}
