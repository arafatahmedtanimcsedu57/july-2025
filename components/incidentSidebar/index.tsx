'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MajorNewsCoverage } from './news-coverage';
import { FilterControls } from './../filter-controls';

import { useIncidentStore } from '@/lib/incident-store';
import { getUpdatedPersonData } from '@/lib/edit-store';
import { useFilterStore } from '@/lib/filter-store';

import { useFilteredData } from '@/hooks/use-filtered-data';
import {
	calculateCompleteness,
	hasIncompleteData,
} from '@/utilities/person-info-completeness';
import { CASUALTY_TYPES } from '@/constant/casualty-types';
import { SummaryStats } from './stats';

export default function IncidentSidebar() {
	const [showAllCasualties, setShowAllCasualties] = useState(false);

	const { selectedIncident, setSelectedIncident } = useIncidentStore();
	const { casualtyTypeFilter } = useFilterStore();

	const filteredData = useFilteredData();
	let selectedPerson = selectedIncident;
	if (selectedPerson) selectedPerson = getUpdatedPersonData(selectedPerson);

	return (
		<div className="transition-all duration-300 ease-in-out overflow-hidden border-r border-dashed w-[450px]">
			<div className="flex flex-col h-[calc(100vh-61px)]">
				<FilterControls />

				<ScrollArea className="flex-1">
					<SummaryStats />

					<div className="p-4">
						<h3 className="text-sm font-medium mb-4">
							{casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE
								? 'Multiple Casualties'
								: 'Affected Individuals'}
						</h3>
						<div className="flex flex-col gap-2">
							{filteredData
								.slice(0, showAllCasualties ? filteredData.length : 5)
								.map((person) => {
									const incomplete = hasIncompleteData(person);
									const completeness = calculateCompleteness(person);

									return (
										<div
											key={person.id}
											className={`flex flex-col gap-2 p-4 rounded-md border hover:bg-muted cursor-pointer transition-colors`}
											onClick={() => {
												setSelectedIncident(person);
											}}
										>
											{!(casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE) ? (
												<div className="flex gap-4 flex-wrap items-center justify-between">
													<div className="flex items-center gap-2">
														<div className="font-medium text-sm flex items-center gap-1.5">
															{person.name || 'Unknown'}
														</div>
													</div>

													<div className="text-xs font-medium text-muted-foreground">
														{person.type || 'Unknown'}
													</div>
												</div>
											) : (
												<></>
											)}

											<div className="text-xs text-muted-foreground flex flex-col justify-between">
												{!(casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE) ? (
													<span>
														{person.occupation || 'Unknown occupation'}{' '}
														{person.age ? `, ${person.age} years` : ''}
													</span>
												) : (
													<></>
												)}
												<span>{person.location || 'Unknown location'}</span>
											</div>

											{!(casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE) &&
											incomplete ? (
												<div className="flex flex-col gap-2">
													{' '}
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
											) : (
												<></>
											)}
										</div>
									);
								})}

							{filteredData.length > 5 && (
								<Button
									variant="ghost"
									size="sm"
									className="w-full text-xs text-muted-foreground"
									onClick={() => setShowAllCasualties(!showAllCasualties)}
								>
									{showAllCasualties
										? 'Show fewer casualties'
										: `View all ${filteredData.length} casualties`}
								</Button>
							)}
						</div>
					</div>

					<MajorNewsCoverage />
				</ScrollArea>
			</div>
		</div>
	);
}
