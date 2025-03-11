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
		<>
			{/* Filter controls */}
			<div className="bg-card border rounded-lg p-6 mb-8">
				<div className="flex flex-wrap items-center justify-between mb-4">
					<h2 className="text-xl font-semibold flex items-center">
						<Filter className="mr-2 h-5 w-5" />
						Filters
					</h2>
					{hasActiveFilters && (
						<Button variant="outline" size="sm" onClick={resetFilters}>
							<X className="mr-2 h-4 w-4" />
							Clear Filters
						</Button>
					)}
				</div>

				<div className="flex flex-wrap flex-col gap-4 justify-between">
					{/* Date filter */}
					<div>
						<Label htmlFor="date-filter">Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id="date-filter"
									variant="outline"
									className={cn(
										'w-full justify-start text-left font-normal',
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

					{/* Age range filter */}
					<div>
						<Label htmlFor="min-age">Min Age</Label>
						<Input
							id="min-age"
							type="number"
							placeholder="Min age"
							value={minAgeFilter}
							onChange={(e) => setMinAgeFilter(e.target.value)}
						/>
					</div>

					<div>
						<Label htmlFor="max-age">Max Age</Label>
						<Input
							id="max-age"
							type="number"
							placeholder="Max age"
							value={maxAgeFilter}
							onChange={(e) => setMaxAgeFilter(e.target.value)}
						/>
					</div>

					{/* Type filter */}
					<div>
						<Label htmlFor="type-filter">Type</Label>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger id="type-filter">
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

			{/* Active filters display */}
			{hasActiveFilters && (
				<div className="flex flex-wrap gap-2 mb-4">
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
		</>
	);
}
