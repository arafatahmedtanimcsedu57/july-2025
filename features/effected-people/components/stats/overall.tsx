'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
	Calendar,
	ChevronDown,
	ChevronUp,
	LocateIcon,
	Map,
	MapPin,
	PinIcon,
} from 'lucide-react';

import { DonutChart } from '@/shared/ui/donut-chart';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/ui/chart';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

import {
	getGroupedByDateData,
	getTotalDeadPeople,
	getTotalEffectedPeople,
	getTotalInjuredPeople,
	dataEffectedPeople,
} from '@/features/effected-people/lib/data-managers';

import { GENDERS } from '@/constant/gender-types';
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from '@/constant/casualty-types';

import MaleIcon from '@/public/male.png';
import FemaleIcon from '@/public/female.png';
import Image from 'next/image';
import { Separator } from '@/shared/ui/separator';
import { formatDate } from 'date-fns';

const total = getTotalEffectedPeople();
const deathCount = getTotalDeadPeople();
const injuryCount = getTotalInjuredPeople();
const deathPercentage = ((deathCount / total) * 100).toFixed(1) + '%';
const injuriesPercentage = ((injuryCount / total) * 100).toFixed(1) + '%';
const groupedByDateData = getGroupedByDateData();
let chartData = Object.values(groupedByDateData).sort(
	(a, b) => a.timestamp - b.timestamp,
);

const dateWiseBarChartConfig = () => {
	return {
		deaths: {
			label: 'Deaths',
		},
		injuries: {
			label: 'Injuries',
		},
	};
};

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

				size: 56,
				thickness: 3,
				innerText: deathPercentage,
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

				size: 56,
				thickness: 3,
				innerText: injuriesPercentage,
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

const DateWiseBarChart = () => {
	return (
		<Card className="bg-transparent border-0 shadow-none">
			<CardContent className="bg-transparent !p-0  px-2">
				<ChartContainer config={dateWiseBarChartConfig()}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} horizontal={false} />
						<XAxis dataKey="displayDate" hide />
						<YAxis hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar dataKey="deaths" fill="#9c0610" radius={4} />
						<Bar dataKey="injuries" fill="#ee7f01" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="px-2 py-2">
				<CardDescription>Deaths & Injuries vs Date</CardDescription>
			</CardFooter>
		</Card>
	);
};

const ListData = () => {
	const [showAll, setShowAll] = useState(false);

	const displayData = showAll
		? dataEffectedPeople
		: dataEffectedPeople.slice(0, 3);

	return (
		<div className="space-y-2">
			<div className="max-h-[300px] overflow-auto scrollbar-hide space-y-2">
				{displayData.map((person) => {
					const {
						id,
						name,
						age,
						occupation,
						gender,
						type,
						location,
						district,
						date,
					} = person;

					const GenderIcon =
						gender === GENDERS.MALE
							? MaleIcon
							: gender === GENDERS.FEMALE
							? FemaleIcon
							: '';
					const _date = date ? new Date(date) : '';
					const _dateString = formatDate(_date.toLocaleString(), 'dd MMM');

					return (
						<Card key={id} className="bg-transparent cursor-pointer">
							<CardHeader className="space-y-4">
								<CardTitle className="flex flex-col gap-2">
									<div className="flex justify-between items-center">
										<div className="flex gap-2 items-center">
											<Image
												src={GenderIcon}
												alt="gender"
												width={32}
												height={32}
											/>
											<div className="flex flex-col">
												<span className="text-xs">{name || 'Unknown'}</span>
												<span className="text-xs font-normal">
													{age || '...'} years, {occupation || '...'}
												</span>
											</div>
										</div>

										{type ? CASUALTY_ITEMS_COLOR_ELEMENTS[type]!() : <></>}
									</div>
								</CardTitle>
								<Separator />
								<CardDescription>
									<div className="flex gap-2 items-center">
										<div>
											<MapPin width={16} />
										</div>
										<span className="text-xs">
											{location || '...'}, {district || '...'}
										</span>
									</div>

									<div className="flex gap-2 items-center">
										<div>
											<Calendar width={16} />
										</div>
										<span className="text-xs">{_dateString || '...'}</span>
									</div>
								</CardDescription>
							</CardHeader>
						</Card>
					);
				})}
			</div>
			<div className="flex justify-center">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setShowAll(!showAll)}
					className="text-xs flex items-center gap-1"
				>
					{showAll ? (
						<>
							Show Less <ChevronUp className="h-3 w-3" />
						</>
					) : (
						<>
							Show All <ChevronDown className="h-3 w-3" />
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

export { TotalCasualties, DonutCharts, DateWiseBarChart, ListData };
