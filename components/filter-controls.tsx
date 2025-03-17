'use client';

import { CalendarIcon, Filter, X } from 'lucide-react';
import { getDate, format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

import { useFilterStatus } from '@/hooks/use-filter-status';

import { cn } from '@/lib/utils';
import { useFilterStore } from '@/lib/filter-store';
import { uniqueTypes } from '@/lib/data';
import { useDayStore } from '@/lib/day-store';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

import { MARKER_COLORS } from '@/constant/marker-colors';
import {
	CASUALTY_ITEMS,
	CASUALTY_ITEMS_COLORS,
} from '@/constant/casualty-types';

export function FilterControls() {
	const { hasActiveFilters } = useFilterStatus();
	const { availableDays } = useDayStore();
	const {
		dateFilter,
		minAgeFilter,
		maxAgeFilter,
		typeFilter,
		setDateFilter,
		setMinAgeFilter,
		setMaxAgeFilter,
		setTypeFilter,
		resetFilters,
	} = useFilterStore();

	const handleDateSelect = (date: Date | undefined) => {
		setDateFilter(date || null);
	};

	return (
		<div className="border-b border-dashed p-4 flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm">
							<Filter className="mr-2 h-5 w-5" />
							Filters
						</Button>
					</PopoverTrigger>

					<PopoverContent className="w-80">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="date-filter">Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												id="date-filter"
												variant="outline"
												className={cn(
													'w-full justify-start text-left font-normal col-span-2 h-8',
													!dateFilter && 'text-muted-foreground',
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{dateFilter ? format(dateFilter, 'PPP') : 'Select date'}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<ScrollArea className="w-96 whitespace-nowrap">
												<div className="p-4 flex gap-2 items-center text-center">
													{availableDays.map((day) => {
														const _date = new Date(day.date);

														return (
															<div
																className="p-4 border rounded flex flex-col items-center justify-center"
																key={day.date}
																onClick={() =>
																	handleDateSelect(new Date(day.date))
																}
															>
																<div className="text-sm uppercase">
																	{format(_date, 'LLL')}
																</div>

																<div className="text-2xl font-extrabold">
																	{getDate(_date)}
																</div>

																<div className="flex gap-2 items-center justify-center">
																	{Object.entries(CASUALTY_ITEMS).map(
																		([key, value]) =>
																			day[value] ? (
																				<div
																					key={key}
																					className="flex items-center gap-1"
																				>
																					{CASUALTY_ITEMS_COLORS[value]?.()}
																				</div>
																			) : (
																				<></>
																			),
																	)}
																</div>
															</div>
														);
													})}
												</div>
												<ScrollBar orientation="horizontal" />
											</ScrollArea>
										</PopoverContent>
									</Popover>
								</div>

								<div className="grid grid-cols-3 items-center gap-4">
									<Label>Age Range</Label>
									<div className="col-span-2 space-y-4">
										<Slider
											defaultValue={[
												minAgeFilter ? Number.parseInt(minAgeFilter) : 0,
												maxAgeFilter ? Number.parseInt(maxAgeFilter) : 100,
											]}
											max={100}
											step={1}
											onValueChange={(values) => {
												setMinAgeFilter(values[0].toString());
												setMaxAgeFilter(values[1].toString());
											}}
											className="my-2"
										/>
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>{minAgeFilter || '0'}</span>
											<span>{maxAgeFilter || '100'}</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="type-filter">Type</Label>
									<Select value={typeFilter} onValueChange={setTypeFilter}>
										<SelectTrigger className="col-span-2 h-8" id="type-filter">
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Types</SelectItem>
											{uniqueTypes.map((type) => (
												<SelectItem key={type} value={type || ''}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>

				{hasActiveFilters && (
					<Button variant="outline" size="sm" onClick={resetFilters}>
						<X className="mr-2 h-4 w-4" />
						Clear Filters
					</Button>
				)}
			</div>

			{/* Active filters display */}
			{hasActiveFilters && (
				<div className="flex flex-wrap gap-2">
					{dateFilter && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Date: {format(dateFilter, 'PPP')}
							<X
								className="h-3 w-3 cursor-pointer"
								onClick={() => setDateFilter(null)}
							/>
						</Badge>
					)}
					{minAgeFilter && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Min Age: {minAgeFilter}
							<X
								className="h-3 w-3 cursor-pointer"
								onClick={() => setMinAgeFilter('')}
							/>
						</Badge>
					)}
					{maxAgeFilter && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Max Age: {maxAgeFilter}
							<X
								className="h-3 w-3 cursor-pointer"
								onClick={() => setMaxAgeFilter('')}
							/>
						</Badge>
					)}
					{typeFilter && typeFilter !== 'all' && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Type: {typeFilter}
							<X
								className="h-3 w-3 cursor-pointer"
								onClick={() => setTypeFilter('all')}
							/>
						</Badge>
					)}
				</div>
			)}
		</div>
	);
}
