import React, { useState } from 'react';
import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useFilteredData } from '@/hooks/use-filtered-data';
import { useFilterStore } from '@/lib/filter-store';
import { useIncidentStore } from '@/lib/incident-store';

import {
	calculateCompleteness,
	hasIncompleteData,
} from '@/utilities/person-info-completeness';
import { CASUALTY_TYPES } from '@/constant/casualty-types';

const CasualtiesList = React.memo(() => {
	const [showAll, setShowAll] = useState(false);
	const filteredData = useFilteredData();
	const { casualtyTypeFilter } = useFilterStore();
	const { setSelectedIncident } = useIncidentStore();

	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

	return (
		<div className="p-4">
			<h3 className="text-sm font-medium mb-4">
				{isMultipleCasualties ? 'Multiple Casualties' : 'Affected Individuals'}
			</h3>
			<div className="flex flex-col gap-2">
				{filteredData
					.slice(0, showAll ? filteredData.length : 5)
					.map((person) => {
						const incomplete = hasIncompleteData(person);
						const completeness = calculateCompleteness(person);
						return (
							<div
								key={person.id}
								className="flex flex-col gap-2 p-4 rounded-md border hover:bg-muted cursor-pointer transition-colors"
								onClick={() => setSelectedIncident(person)}
							>
								{!isMultipleCasualties && (
									<div className="flex gap-4 flex-wrap items-center justify-between">
										<div className="flex items-center gap-2 font-medium text-sm">
											{person.name || 'Unknown'}
										</div>
										<div className="text-xs font-medium text-muted-foreground">
											{person.type || 'Unknown'}
										</div>
									</div>
								)}
								<div className="text-xs text-muted-foreground flex flex-col">
									{!isMultipleCasualties && (
										<span>
											{person.occupation || 'Unknown occupation'}
											{person.age ? `, ${person.age} years` : ''}
										</span>
									)}
									<span>{person.location || 'Unknown location'}</span>
								</div>
								{!isMultipleCasualties && incomplete && (
									<div className="flex flex-col gap-2">
										<div className="w-full h-1 bg-muted rounded overflow-hidden">
											<div
												className="h-full bg-primary transition-all"
												style={{ width: `${completeness}%` }}
											></div>
										</div>
										<span className="w-fit inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300 self-end">
											<Edit className="h-2.5 w-2.5 mr-0.5" /> Edit needed
										</span>
									</div>
								)}
							</div>
						);
					})}
				{filteredData.length > 5 && (
					<Button
						variant="ghost"
						size="sm"
						className="w-full text-xs text-muted-foreground"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll
							? 'Show fewer casualties'
							: `View all ${filteredData.length} casualties`}
					</Button>
				)}
			</div>
		</div>
	);
});

export { CasualtiesList };
