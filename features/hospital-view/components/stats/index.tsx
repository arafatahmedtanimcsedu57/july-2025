import React, { type Dispatch, type SetStateAction } from 'react';
import FilterContainer from '@/app/filter-container';
import Methodology from '@/app/methodology';
import {
	DonutCharts,
	TabularData,
	TotalCasualties,
} from '@/features/hospital-view/components/stats/overall';
import { Button } from '@/shared/ui/button';
import { ChevronUp } from 'lucide-react';

interface StatsProps {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Stats({ show, setShow }: StatsProps) {
	return (
		<div className="h-full flex flex-col min-w-[430px] bg-background rounded-3xl border shadow-lg dark:text-white text-slate-700 relative">
			<TotalCasualties />

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
