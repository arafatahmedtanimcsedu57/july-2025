'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { DonutChart } from '@/shared/ui/donut-chart';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table';

import { getTopNCasesByTotalCases } from '@/features/hospital-view/lib/data-managers';
import {
	getTotalCases,
	getTotalDeaths,
	getTotalInjuries,
	dataHospitalWiseInjuryDeath,
} from '@/features/hospital-view/lib/data-managers';
import { useSelectedCasualtyStore } from '@/features/hospital-view/store/selected-casualty-store';
import { Badge } from '@/shared/ui/badge';

const total = getTotalCases();
const deathCount = getTotalDeaths();
const injuryCount = getTotalInjuries();
const topNCasesByTotalCases = getTopNCasesByTotalCases();

const donutChartsConfig = () => {
	return [
		{
			chart: {
				data: [
					{ label: 'Deaths', value: deathCount, color: '#9c0612' },
					{
						label: 'Total Casualties',
						value: total,
						color: '#e2e0df',
					},
				],

				size: 40,
				thickness: 3,
				innerText: '',
			},
			legend: {
				label: 'Deaths',
				value: deathCount,
			},
		},

		{
			chart: {
				data: [
					{ label: 'Injuries', value: injuryCount, color: '#ee7f01' },
					{
						label: 'Total Casualties',
						value: total,
						color: '#e2e0df',
					},
				],

				size: 40,
				thickness: 3,
				innerText: '',
			},
			legend: {
				label: 'Injuries',
				value: injuryCount,
			},
		},
	];
};

const TotalCasualties = () => {
	return (
		<div className="flex flex-col p-10">
			<h5 className="text-xs w-max">Total Casualties</h5>
			<p className="text-4xl font-semibold w-max">{total.toLocaleString()}</p>
		</div>
	);
};

const DonutCharts = () => {
	return (
		<>
			{donutChartsConfig().map((donutChart) => (
				<div
					className="flex flex-wrap gap-2 items-center"
					key={donutChart.legend.label}
				>
					<DonutChart
						data={donutChart.chart.data}
						size={donutChart.chart.size}
						thickness={donutChart.chart.thickness}
						innerText={donutChart.chart.innerText}
					/>

					<div>
						<h1 className="text-xs font-semibold">{donutChart.legend.value}</h1>
						<p className="text-xs">{donutChart.legend.label}</p>
					</div>
				</div>
			))}
		</>
	);
};

const TabularData = () => {
	const { selectedCasualty, toggleSelectedCasualty } =
		useSelectedCasualtyStore();
	const selectedRowRef = useRef<HTMLTableRowElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedRowRef.current && containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const rowRect = selectedRowRef.current.getBoundingClientRect();
			const scrollTop =
				rowRect.top -
				containerRect.top +
				containerRef.current.scrollTop -
				containerRect.height / 2;
			containerRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
		}
	}, [selectedCasualty]);

	const displayData = dataHospitalWiseInjuryDeath;

	return (
		<div ref={containerRef} className="overflow-auto h-full scrollbar-hide">
			<div className="min-w-full text-sm">
				<div>
					{displayData
						.sort(
							(a, b) =>
								(b.total_verified_cases || 0) - (a.total_verified_cases || 0),
						)
						.map((item, index, arr) => {
							const selected = selectedCasualty?.facility === item.facility;
							const nextSelected =
								index + 1 < arr.length &&
								selectedCasualty?.facility === arr[index + 1].facility;

							const shouldHaveBorder = !selected && !nextSelected;

							return (
								<div
									key={item.facility}
									ref={selected ? selectedRowRef : null}
									className={`cursor-pointer w-full hover:bg-slate-200 flex justify-between items-center px-4 py-4 gap-3 ${
										selected
											? 'bg-foreground font-semibold px-4 shadow-md rounded-3xl border border-slate-100'
											: ''
									} ${shouldHaveBorder ? 'border-b' : ''}`}
									onClick={() => toggleSelectedCasualty(item)}
								>
									<div className="max-w-[220px] flex-1">{item.facility}</div>

									<div className="flex flex-wrap gap-2">
										<Badge className="bg-[#970811] text-white">
											{item.verified_deaths}{' '}
										</Badge>
										<Badge className="bg-[#ef7b0a] text-white">
											{item.verified_injuries}
										</Badge>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

const TopNCasesByTotalCases = () => {
	const maxCases = Math.max(
		...topNCasesByTotalCases.map((item) => item.total_verified_cases || 0),
	);

	return (
		<div className="flex flex-col gap-2">
			<span className="font-bold uppercase text-xs font-mono">
				Most Effected
			</span>
			{topNCasesByTotalCases.map((item, index) => {
				const widthPercentage = Math.max(
					10,
					Math.min(100, ((item.total_verified_cases || 0) / maxCases) * 100),
				);

				const colors = ['bg-indigo-600', 'bg-indigo-500', 'bg-indigo-400'];

				const bgColor = colors[index % colors.length];

				return (
					<div key={item.facility} className="flex gap-2 items-center">
						<div
							key={item.facility}
							className={`flex rounded-3xl items-center justify-between px-4 py-2 ${bgColor}`}
							style={{ width: `${widthPercentage}%` }}
						>
							<span className="font-medium text-white">{item.facility}</span>
						</div>
						<span className="font-normal whitespace-nowrap">
							{item.total_verified_cases?.toLocaleString()} Cases
						</span>
					</div>
				);
			})}
		</div>
	);
};

export { TotalCasualties, DonutCharts, TabularData, TopNCasesByTotalCases };
