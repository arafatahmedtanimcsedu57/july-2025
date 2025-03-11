'use client';

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFilteredData } from '@/hooks/use-filtered-data';
import { useFilterStatus } from '@/hooks/use-filter-status';

import { useFilterStore } from '@/lib/filter-store';
import { allCasualtyData } from '@/lib/data';

export function ResultsDisplay() {
	const filteredData = useFilteredData();
	const { resetFilters } = useFilterStore();
	const { hasActiveFilters } = useFilterStatus();

	// Function to format date or handle null dates
	const formatDate = (timestamp: number | null) => {
		if (timestamp === null) return 'Not available';
		return format(new Date(timestamp), 'PPP');
	};

	return (
		<>
			{/* Results count */}
			<div className="mb-4">
				<p className="text-muted-foreground">
					Showing {filteredData.length} of {allCasualtyData.length} records
				</p>
			</div>

			{/* Results display */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredData.map((item) => (
					<Card key={item.id}>
						<CardHeader className="pb-2">
							<div className="flex justify-between items-start">
								<CardTitle>{item.name}</CardTitle>
								<Badge>{item.type}</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Date:</span>
									<span>{formatDate(item.date)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Age:</span>
									<span>{item.age}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Occupation:</span>
									<span>{item.occupation}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Location:</span>
									<span className="text-right max-w-[200px]">
										{item.location}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* No results message */}
			{filteredData.length === 0 && (
				<div className="text-center py-12">
					<p className="text-xl text-muted-foreground">
						No records match your filter criteria
					</p>
					<Button variant="outline" className="mt-4" onClick={resetFilters}>
						Clear All Filters
					</Button>
				</div>
			)}
		</>
	);
}
