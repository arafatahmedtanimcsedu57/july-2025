'use client';

import { format } from 'date-fns';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

import { useFilterStatus } from '@/hooks/use-filter-status';

import { cn } from '@/lib/utils';
import { useFilterStore } from '@/lib/filter-store';
import { uniqueTypes } from '@/lib/data';

export function FilterControls() {
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

	const { hasActiveFilters } = useFilterStatus();

	const handleDateSelect = (date: Date | undefined) => {
		setDateFilter(date || null);
	};

	return (
		<div className="border-b border-dashed p-4 flex flex-col gap-4">
			{/* Filter controls */}

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
							{/* <div className="space-y-2">
								<h4 className="font-medium leading-none">Dimensions</h4>
								<p className="text-sm text-muted-foreground">
									Set the dimensions for the layer.
								</p>
							</div> */}
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
											<Calendar
												mode="single"
												selected={dateFilter || undefined}
												onSelect={handleDateSelect}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>

								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="min-age">Min Age</Label>
									<Input
										id="min-age"
										type="number"
										className="col-span-2 h-8"
										placeholder="Min age"
										value={minAgeFilter}
										onChange={(e) => setMinAgeFilter(e.target.value)}
									/>
								</div>

								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="max-age">Max Age</Label>
									<Input
										id="max-age"
										type="number"
										className="col-span-2 h-8"
										placeholder="Max age"
										value={maxAgeFilter}
										onChange={(e) => setMaxAgeFilter(e.target.value)}
									/>
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
