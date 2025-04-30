import React, { type Dispatch, type SetStateAction } from 'react';
import Methodology from '@/app/methodology';
import {
	DonutCharts,
	TabularData,
	TotalCasualties,
} from '@/features/hospital-view/components/stats/overall';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import Link from 'next/link';

interface StatsProps {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Stats({ show, setShow }: StatsProps) {
	return (
		<div className="h-full flex flex-col min-w-[430px] bg-foreground rounded-3xl border shadow-lg dark:text-white text-slate-700 relative">
			<TotalCasualties />

			<Tabs defaultValue={'hospital-view'} className="p-10">
				<TabsList className="grid grid-cols-2 mb-4 w-[250px] m-0">
					<TabsTrigger value="country-view" asChild>
						<Link href="/country-view">Country View</Link>
					</TabsTrigger>
					<TabsTrigger value="hospital-view" asChild>
						<Link href="/hospital-view" className="text-slate-900">
							Hospital View
						</Link>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			<div className="flex-1 min-h-0 flex flex-col p-10">
				<div className="flex flex-wrap gap-10 mb-10">
					<DonutCharts />
				</div>

				<div className="flex-1 min-h-0 overflow-auto">
					<TabularData />
				</div>
			</div>

			<div className="absolute right-0 top-10 translate-x-[100%]">
				<Methodology />
			</div>
		</div>
	);
}
