'use client';

import { useEffect, useRef } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Calendar, LinkIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from 'date-fns';

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
import { Separator } from '@/shared/ui/separator';

import {
	getGroupedByDateData,
	getTotalDeadPeople,
	getTotalEffectedPeople,
	getTotalInjuredPeople,
} from '@/features/effected-people/lib/data-managers';
import { useSelectedPersonStore } from '@/features/effected-people/store/selected-person-store';
import { useFilteredData } from '@/features/effected-people/hooks/use-filtered-data';

import { GENDERS } from '@/constant/gender-types';
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from '@/constant/casualty-types';

import MaleIcon from '@/public/male.png';
import FemaleIcon from '@/public/female.png';
import Link from 'next/link';

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
	const data = useFilteredData();
	const total = getTotalEffectedPeople(data);

	const deathCount = getTotalDeadPeople(data);
	const injuryCount = getTotalInjuredPeople(data);

	const deathPercentage = ((deathCount / total) * 100).toFixed(1) + '%';
	const injuriesPercentage = ((injuryCount / total) * 100).toFixed(1) + '%';

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
	const data = useFilteredData();
	const total = getTotalEffectedPeople(data);
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
	const data = useFilteredData();

	const groupedByDateData = getGroupedByDateData(data);
	const chartData = Object.values(groupedByDateData).sort(
		(a, b) => a.timestamp - b.timestamp,
	);
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
	const { selectedPerson, toggleSelectedPerson } = useSelectedPersonStore();
	const data = useFilteredData();
	const selectedPersonRef = useRef<HTMLDivElement>(null);
	const listContainerRef = useRef<HTMLDivElement>(null);

	const displayData = data;

	useEffect(() => {
		if (
			selectedPerson &&
			selectedPersonRef.current &&
			listContainerRef.current
		) {
			// Store a reference to the current value to use inside the callback
			const currentListContainer = listContainerRef.current;

			// Wait for the next frame to ensure DOM is updated
			requestAnimationFrame(() => {
				// Check again that the refs are still valid
				if (selectedPersonRef.current && currentListContainer) {
					const containerRect = currentListContainer.getBoundingClientRect();
					const selectedRect =
						selectedPersonRef.current.getBoundingClientRect();

					// Calculate the exact center position
					const containerCenter = containerRect.top + containerRect.height / 2;
					const selectedCenter = selectedRect.top + selectedRect.height / 2;

					// Calculate how much we need to scroll to center the element
					const scrollOffset =
						currentListContainer.scrollTop + (selectedCenter - containerCenter);

					// Smooth scroll to the calculated position
					currentListContainer.scrollTo({
						top: scrollOffset,
						behavior: 'smooth',
					});
				}
			});
		}
	}, [selectedPerson]);

	return (
		<div
			ref={listContainerRef}
			className="overflow-auto h-full scrollbar-hide flex flex-col gap-4"
		>
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
					mediaLinks,
					summary,
					graphicLevel,
				} = person;

				const GenderIcon =
					gender === GENDERS.MALE
						? MaleIcon
						: gender === GENDERS.FEMALE
						? FemaleIcon
						: '';
				const _date = date ? new Date(date) : '';
				const _dateString = _date
					? formatDate(_date.toLocaleString(), 'dd MMM')
					: '';

				const selectedItem = selectedPerson?.id === person.id;

				return (
					<Card
						ref={selectedItem ? selectedPersonRef : null}
						key={id}
						className={`cursor-pointer rounded-2xl text-slate-700 dark:text-white ${
							selectedItem ? 'bg-white  border-primary' : 'bg-background '
						}`}
						onClick={() => toggleSelectedPerson(person)}
					>
						<CardHeader className="space-y-4">
							<CardTitle className="flex flex-col gap-2">
								<div className="flex justify-between items-center">
									<div className="flex gap-2 items-center">
										{GenderIcon ? (
											<Image
												src={GenderIcon || '/placeholder.svg'}
												alt="gender"
												width={32}
												height={32}
											/>
										) : (
											<></>
										)}
										<div className="flex flex-col">
											<span className="text-xs">{name || 'Unknown'}</span>
											{age || occupation ? (
												<span className="text-xs font-normal">
													{age ? `${age} years , ` : ''} {occupation || ''}
												</span>
											) : (
												<></>
											)}
										</div>
									</div>

									{type ? CASUALTY_ITEMS_COLOR_ELEMENTS[type]!() : <></>}
								</div>
							</CardTitle>
							{selectedItem ? (
								<>
									<Separator />
									<CardDescription
										className={`${
											selectedItem
												? 'text-slate-700 dark:text-white flex flex-col gap-1'
												: ''
										}`}
									>
										<div className="flex gap-2 items-center">
											<div>
												<MapPin width={16} />
											</div>
											{district || location ? (
												<span className="text-xs">
													{location ? `${location} , ` : ''} {district || ''}
												</span>
											) : (
												<></>
											)}
										</div>

										<div className="flex gap-2 items-center">
											<div>
												<Calendar width={16} />
											</div>
											<span className="text-xs">{_dateString || ''}</span>
										</div>

										{graphicLevel ? (
											<div className="flex gap-2 bg-slate-200 rounded-lg p-4">
												<span>Graphical Level:</span>{' '}
												<span>{graphicLevel || ''}</span>
											</div>
										) : (
											<></>
										)}

										<div className="flex flex-col gap-1">
											{mediaLinks.map((link) => (
												<Link
													href={link}
													key={link}
													target="_black"
													className="inline-flex gap-2 text-xs text-blue-500 hover:underline items-center"
												>
													<div>
														<LinkIcon width={16} />
													</div>
													<span className="truncate overflow-hidden whitespace-nowrap block max-w-full">
														{link}
													</span>
												</Link>
											))}
										</div>

										{summary ? (
											<div className="bg-slate-200 rounded-lg p-4">
												{summary}
											</div>
										) : (
											<></>
										)}
									</CardDescription>
								</>
							) : (
								<></>
							)}
						</CardHeader>
					</Card>
				);
			})}
		</div>
	);
};

export { TotalCasualties, DonutCharts, DateWiseBarChart, ListData };
