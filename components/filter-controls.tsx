'use client';

import { X } from 'lucide-react';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';

import { useFilterStatus } from '@/hooks/use-filter-status';

import { useFilterStore } from '@/lib/filter-store';

export function FilterControls() {
	const { hasActiveFilters } = useFilterStatus();
	const {
		dateFilter,
		minAgeFilter,
		maxAgeFilter,
		typeFilter,
		setDateFilter,
		setMinAgeFilter,
		setMaxAgeFilter,
		setTypeFilter,
	} = useFilterStore();

	return hasActiveFilters ? (
		<div className="fixed z-10 top-[61px] w-full p-4 flex flex-col gap-4">
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
		</div>
	) : (
		<></>
	);
}
