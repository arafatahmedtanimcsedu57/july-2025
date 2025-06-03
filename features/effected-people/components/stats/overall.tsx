import { useEffect, useRef, Suspense, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from 'date-fns';

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
import {
	getGroupedByDateData,
	getTotalDeadPeople,
	getTotalEffectedPeople,
	getTotalInjuredPeople,
} from '@/features/effected-people/lib/data-managers';
import { useSelectedPersonStore } from '@/features/effected-people/store/selected-person-store';
import { useFilteredData } from '@/features/effected-people/hooks/use-filtered-data';
import { DonutChart } from '@/shared/ui/donut-chart';

import { GENDERS } from '@/constant/gender-types';
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from '@/constant/casualty-types';

import MaleIcon from '@/public/male.png';
import FemaleIcon from '@/public/female.png';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';
import TotalCasualtiesData from './total-casualties-data';

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

const TotalCasualties = () => {
	return (
		<div className="flex flex-col p-10">
			<h5 className="text-xs w-max">Total Casualties</h5>
			<Suspense fallback={<p>Loading...</p>}>
				<TotalCasualtiesValue />
			</Suspense>
		</div>
	);
};

async function TotalCasualtiesValue() {
	const total = await TotalCasualtiesData();
	return (
		<p className="text-4xl font-semibold w-max">{total?.toLocaleString()}</p>
	);
}

const DonutCharts = () => {
	const [deathCount, setDeathCount] = useState(0);
	const [injuryCount, setInjuryCount] = useState(0);

	const data = useFilteredData();

	const total = getTotalEffectedPeople(data);

	useEffect(() => {
		getTotalDeadPeople(data).then((data) => {
			setDeathCount(data);
		});
		getTotalInjuredPeople(data).then((data) => {
			setInjuryCount(data);
		});
	}, [data]);

	const donutChart = {
		chart: {
			data: [
				{
					label: 'Deaths',
					value: deathCount,
					color: 'var(--destructive)',
				},
				{
					label: 'Injuries',
					value: injuryCount,
					color: 'var(--primary)',
				},
			],
		},
	};

	return (
		<div className="flex flex-wrap gap-2 items-center">
			<DonutChart
				data={donutChart.chart.data}
				size={40}
				thickness={3}
				innerText=""
			/>

			<div>
				<h1 className="text-xs font-semibold">
					{deathCount?.toLocaleString()}
				</h1>
				<p className="text-xs">Deaths</p>
			</div>
			<DonutChart
				data={donutChart.chart.data}
				size={40}
				thickness={3}
				innerText=""
			/>
			<div>
				<h1 className="text-xs font-semibold">
					{injuryCount?.toLocaleString()}
				</h1>
				<p className="text-xs">Injuries</p>
			</div>
		</div>
	);
};

const DateWiseBarChart = () => {
	const [groupedByDateData, setGroupedByDateData] = useState<
		Record<
			string,
			{
				date: string;
				displayDate: string;
				timestamp: number;
				deaths: number;
				injuries: number;
			}
		>
	>({});
	const data = useFilteredData();

	useEffect(() => {
		getGroupedByDateData(data).then((data) => {
			setGroupedByDateData(data);
		});
	}, [data]);

	console.log(groupedByDateData);
	const chartData: {
		date: string;
		displayDate: string;
		timestamp: number;
		deaths: number;
		injuries: number;
	}[] = Object.values(groupedByDateData).sort(
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

	console.log('LIst', data);
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
								(() => {
									const details = [
										{ label: 'Name', value: name || 'Unknown' },
										{ label: 'Age', value: age || 'N/A' },
										{ label: 'Gender', value: gender || 'N/A' },
										{ label: 'Occupation', value: occupation || 'N/A' },
										{
											label: 'Type',
											value: type || 'N/A',
											render: (val: string) => (
												<span
													className={`px-2 py-1 rounded-full text-xs font-medium ${
														val === 'Death'
															? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
															: val === 'Injury'
															? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
															: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
													}`}
												>
													{val}
												</span>
											),
										},
										{ label: 'Date', value: _dateString },
										{ label: 'District', value: district || 'N/A' },
										{ label: 'Location', value: location || 'N/A' },
										{ label: 'Graphic Level', value: graphicLevel || 'N/A' },
										{
											label: 'Media Links',
											value: mediaLinks,
											// Allow null for links
											render: (links: string[] | null) =>
												links && links.length > 0 ? (
													<div className="flex flex-col gap-1">
														{links.map((link) => (
															<Link
																href={link}
																key={link}
																target="_blank" // Corrected target attribute
																rel="noopener noreferrer" // Added for security
																className="inline-flex gap-2 text-xs text-blue-500 hover:underline items-center"
															>
																<LinkIcon
																	width={14}
																	height={14}
																	className="min-w-3 min-h-3"
																/>
																<span className="truncate overflow-hidden whitespace-nowrap block max-w-xs">
																	{link}
																</span>
															</Link>
														))}
													</div>
												) : (
													'N/A'
												),
										},
										{
											label: 'Summary',
											value: summary,
											// Allow null for val
											render: (val: string | null) =>
												val ? (
													<div className="text-xs whitespace-pre-wrap">
														{val}
													</div>
												) : (
													'N/A'
												),
										},
									];

									return (
										<div className="mt-4 overflow-auto h-full scrollbar-hide">
											<Table>
												{/* No TableHeader */}
												<TableBody>
													{details
														.filter(
															(item) => item.value && item.value !== 'N/A',
														) // Filter out items with no value or 'N/A' except for links/summary which handle it internally
														.map((item) => (
															<TableRow key={item.label}>
																<TableCell className="font-medium p-0 w-1/3 text-muted-foreground text-xs align-top">
																	{item.label}
																</TableCell>
																<TableCell className="text-xs p-0 align-top max-w-[50px] ">
																	{/* Call render if it exists, otherwise display value. Render functions handle null internally. */}
																	{item.render
																		? item.render(item.value as any)
																		: item.value}
																</TableCell>
															</TableRow>
														))}
												</TableBody>
											</Table>
										</div>
									);
								})()
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
