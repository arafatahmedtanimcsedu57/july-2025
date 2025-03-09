'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, AlertTriangle, Edit, FileEdit } from 'lucide-react';
import { useIncidentStore } from '@/lib/incident-store';
import { getCasualtyDataByDate } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useSidebarStore } from '@/lib/sidebar-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useDayStore } from '@/lib/day-store';
import { format, parseISO } from 'date-fns';
import DayNavigation from '@/components/day-navigation';
import { useEditStore, getUpdatedPersonData } from '@/lib/edit-store';
import PersonEditForm from './person-edit-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

// Helper function to get badge color based on casualty type
const getBadgeColor = (type: string | null) => {
	switch (type) {
		case 'Death':
			return 'bg-red-500 text-white';
		case 'Injury':
			return 'bg-orange-500 text-white';
		case 'Multiple Casualties':
			return 'bg-purple-500 text-white';
		case 'No Casualties':
			return 'bg-blue-500 text-white';
		default:
			return 'bg-gray-500 text-white'; // Default color
	}
};

// Helper function to format date safely
const formatDateSafe = (date: number | null): string => {
	if (date == null) return 'Unknown date';
	try {
		return format(new Date(date), 'MMMM d, yyyy');
	} catch (error) {
		return 'Invalid date';
	}
};

// Helper function to check if a person has incomplete data
const hasIncompleteData = (person: any): boolean => {
	const requiredFields = [
		'name',
		'age',
		'occupation',
		'type',
		'location',
		'description',
	];
	return requiredFields.some((field) => !person[field]);
};

// Helper function to calculate data completeness percentage
const calculateCompleteness = (person: any): number => {
	const requiredFields = [
		'name',
		'age',
		'occupation',
		'type',
		'location',
		'description',
	];
	const completedFields = requiredFields.filter((field) => !!person[field]);
	return Math.round((completedFields.length / requiredFields.length) * 100);
};

export default function IncidentSidebar() {
	const { selectedIncidentId, setSelectedIncident } = useIncidentStore();
	const { currentDay } = useDayStore();
	const { isEditing, startEditing, cancelEditing } = useEditStore();
	const [showAllCasualties, setShowAllCasualties] = useState(false);

	// Get data for the current day
	const casualtyData = getCasualtyDataByDate(currentDay);
	let selectedPerson = casualtyData.find(
		(p) => p.id.toString() === selectedIncidentId,
	);

	// Get updated person data if it exists
	if (selectedPerson) {
		selectedPerson = getUpdatedPersonData(selectedPerson);
	}

	// Calculate totals for the current day
	const totals = casualtyData.reduce(
		(acc, person) => {
			if (person.type) {
				acc[person.type]++;
			}
			acc.total++;
			return acc;
		},
		{
			Death: 0,
			Injury: 0,
			'Multiple Casualties': 0,
			'No Casualties': 0,
			total: 0,
		} as Record<string, number>,
	);

	// Format the current day for display
	const formattedDate = format(parseISO(currentDay), 'MMMM d, yyyy');

	// Close sidebar when escape key is pressed (only if an incident is selected)
	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isEditing) {
					cancelEditing();
				} else if (selectedIncidentId) {
					setSelectedIncident(null);
				}
			}
		};

		// Close right sidebar when incident sidebar is opened
		if (selectedIncidentId) {
			const { close } = useSidebarStore.getState();
			close();
		}

		window.addEventListener('keydown', handleEscapeKey);
		return () => window.removeEventListener('keydown', handleEscapeKey);
	}, [setSelectedIncident, selectedIncidentId, isEditing, cancelEditing]);

	return (
		<div className="fixed top-20 left-0 bottom-0 w-full md:w-96 bg-background z-40 transition-all duration-300 ease-in-out">
			{selectedPerson ? (
				// Person Details View
				<div className="flex flex-col h-full">
					<DayNavigation />
					<div className="flex items-center justify-between p-4 border-b">
						<div>
							<h2 className="text-lg font-semibold">Person Details</h2>
							<p className="text-sm text-muted-foreground">
								{selectedPerson.location || 'Unknown location'} -{' '}
								{formatDateSafe(selectedPerson.date)}
							</p>
						</div>
						<div className="flex gap-2">
							{!isEditing && (
								<Button
									variant="outline"
									size="icon"
									onClick={startEditing}
									aria-label="Edit person details"
									title="Edit person details"
								>
									<Edit className="h-4 w-4" />
								</Button>
							)}
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									if (isEditing) {
										cancelEditing();
									}
									setSelectedIncident(null);
								}}
								aria-label="Back to summary"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="p-4 pb-8">
							{isEditing ? (
								<PersonEditForm
									person={selectedPerson}
									onCancel={cancelEditing}
								/>
							) : (
								<div className="space-y-6">
									{/* Incomplete data alert and progress bar */}
									{hasIncompleteData(selectedPerson) && (
										<div className="space-y-3">
											<Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800">
												<AlertTriangle className="h-4 w-4" />
												<AlertDescription>
													This person has incomplete information. Click the edit
													button to fill in missing details.
												</AlertDescription>
											</Alert>

											<div className="space-y-1">
												<div className="flex justify-between items-center text-xs">
													<span className="text-muted-foreground">
														Data completeness
													</span>
													<span className="font-medium">
														{calculateCompleteness(selectedPerson)}%
													</span>
												</div>
												<Progress
													value={calculateCompleteness(selectedPerson)}
													className="h-1.5"
												/>
											</div>
										</div>
									)}

									{/* Person type badge */}
									<div>
										<Badge className={getBadgeColor(selectedPerson.type)}>
											{selectedPerson.type || 'Unknown'}
										</Badge>
									</div>

									{/* Person information */}
									<div className="space-y-4">
										<div className="flex gap-4 items-start">
											<div className="relative h-24 w-24 overflow-hidden rounded-md border shadow-sm">
												<Image
													src={
														selectedPerson.image ||
														'/placeholder.svg?height=96&width=96'
													}
													alt={selectedPerson.name || 'Person'}
													width={96}
													height={96}
													className="object-cover"
												/>
											</div>

											<div className="flex-1">
												<h3 className="font-medium">
													{selectedPerson.name || 'Unknown'}
												</h3>
												<p className="text-sm text-muted-foreground">
													Age: {selectedPerson.age ?? 'Unknown'}
												</p>
												<p className="text-sm text-muted-foreground">
													Occupation: {selectedPerson.occupation || 'Unknown'}
												</p>
											</div>
										</div>

										{selectedPerson.description && (
											<div className="bg-muted/50 p-3 rounded-md">
												<p className="text-sm">{selectedPerson.description}</p>
											</div>
										)}
									</div>

									{/* Incident details */}
									{selectedPerson.incidentDetails && (
										<div className="space-y-2">
											<h3 className="font-medium">Incident Details</h3>
											<div className="bg-muted/50 p-3 rounded-md">
												<p className="text-sm">
													{selectedPerson.incidentDetails}
												</p>

												{selectedPerson.extendedDetails && (
													<p className="text-sm mt-2 pt-2 border-t border-border/20">
														{selectedPerson.extendedDetails}
													</p>
												)}
											</div>
										</div>
									)}

									{/* News links */}
									{selectedPerson.newsLinks &&
										selectedPerson.newsLinks.length > 0 && (
											<div className="space-y-2">
												<h3 className="font-medium">News Sources</h3>
												<ul className="space-y-1 bg-muted/50 p-3 rounded-md">
													{selectedPerson.newsLinks.map((link, index) => (
														<li key={index}>
															<a
																href={link.url}
																target="_blank"
																rel="noopener noreferrer"
																className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
															>
																{link.title}{' '}
																<ExternalLink className="h-3 w-3" />
															</a>
														</li>
													))}
												</ul>
											</div>
										)}

									{/* Missing fields section */}
									{hasIncompleteData(selectedPerson) && (
										<div className="space-y-2 mt-4 p-3 bg-muted rounded-md">
											<h3 className="font-medium text-sm flex items-center gap-1.5">
												<FileEdit className="h-3.5 w-3.5 text-amber-500" />
												Missing Information
											</h3>
											<ul className="text-xs text-muted-foreground space-y-1">
												{!selectedPerson.name && <li>• Name</li>}
												{!selectedPerson.age && <li>• Age</li>}
												{!selectedPerson.occupation && <li>• Occupation</li>}
												{!selectedPerson.type && <li>• Casualty Type</li>}
												{!selectedPerson.location && <li>• Location</li>}
												{!selectedPerson.description && <li>• Description</li>}
											</ul>
											<Button
												variant="outline"
												size="sm"
												className="mt-2 w-full"
												onClick={startEditing}
											>
												<Edit className="h-3.5 w-3.5 mr-2" /> Edit Person
												Details
											</Button>
										</div>
									)}
								</div>
							)}
						</div>
					</ScrollArea>
				</div>
			) : (
				// Summary View for the current day
				<div className="flex flex-col h-full">
					<DayNavigation />
					<div className="p-4 border-b bg-black/5 dark:bg-white/5">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-white/90"
								>
									<path d="M18 6a4 4 0 0 0-4-4 7 7 0 0 0-5 2 7 7 0 0 0-5-2 4 4 0 0 0-4 4c0 9.14 9 12 9 12s9-2.86 9-12Z" />
								</svg>
							</div>
							<div>
								<h2 className="text-lg font-semibold">
									{formattedDate} Memorial
								</h2>
								<p className="text-sm text-muted-foreground">
									Honoring the victims across Bangladesh
								</p>
							</div>
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="p-4 space-y-6">
							{/* Memorial banner */}
							<div className="bg-gray-100 dark:bg-gray-900/50 border-l-4 border-red-700 rounded-md p-4 flex items-start gap-3">
								<div className="shrink-0 mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-red-700 dark:text-red-500"
									>
										<path d="M18 6a4 4 0 0 0-4-4 7 7 0 0 0-5 2 7 7 0 0 0-5-2 4 4 0 0 0-4 4c0 9.14 9 12 9 12s9-2.86 9-12Z" />
									</svg>
								</div>
								<div>
									<h3 className="font-medium">In Memoriam</h3>
									<p className="text-sm text-muted-foreground mt-1">
										We remember those who lost their lives and were injured
										during the events of {formattedDate} across Bangladesh. This
										map serves as a digital memorial to honor their memory.
									</p>
								</div>
							</div>

							{/* Casualty statistics */}
							<div>
								<h3 className="font-medium mb-3 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect width="18" height="18" x="3" y="3" rx="2" />
										<path d="M12 8v8" />
										<path d="M8 12h8" />
									</svg>
									Lives Affected
								</h3>
								<div className="grid grid-cols-2 gap-3">
									<Card className="bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-red-600 dark:text-red-400">
												{totals['Death'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Deaths
											</div>
										</CardContent>
									</Card>

									<Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
												{totals['Injury'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Injuries
											</div>
										</CardContent>
									</Card>

									<Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
												{totals['Multiple Casualties'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Multiple Casualties
											</div>
										</CardContent>
									</Card>

									<Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
												{totals['No Casualties'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												No Casualties
											</div>
										</CardContent>
									</Card>
								</div>
							</div>

							{/* Event description - dynamically changes based on the day */}
							<div className="space-y-3">
								<h3 className="font-medium">Event Overview</h3>
								<div className="bg-muted/50 rounded-md p-3 text-sm">
									{currentDay === '2024-07-03' && (
										<>
											<p>
												On July 3rd, 2024, student protests began at
												universities across Bangladesh. The demonstrations,
												which started peacefully, were organized to protest
												against government policies affecting education and
												employment.
											</p>
											<p className="mt-2">
												Police intervention at several campuses led to clashes,
												with security forces using tear gas and batons to
												disperse gatherings. Multiple students were injured, and
												one activist was reported missing.
											</p>
										</>
									)}
									{currentDay === '2024-07-04' && (
										<>
											<p>
												On July 4th, 2024, protests intensified and spread
												beyond university campuses to major cities. The first
												fatalities were reported as security forces used
												increased force to control the growing demonstrations.
											</p>
											<p className="mt-2">
												In Chittagong, one person was killed when security
												forces opened fire on protesters. Several people were
												reported missing after police raids on protest camps in
												Dhaka's Motijheel area.
											</p>
										</>
									)}
									{currentDay === '2024-07-05' && (
										<>
											<p>
												On July 5th, 2024, widespread protests erupted across
												Bangladesh in response to government policies. The
												demonstrations, which began peacefully, escalated into
												violence in several major cities including Dhaka,
												Chittagong, and Rajshahi.
											</p>
											<p className="mt-2">
												Security forces responded with tear gas, rubber bullets,
												and in some instances, live ammunition. The
												confrontations resulted in multiple fatalities,
												injuries, and reports of missing persons.
											</p>
										</>
									)}
									{currentDay === '2024-07-06' && (
										<>
											<p>
												On July 6th, 2024, protests continued for a second day
												across Bangladesh. The situation remained tense as
												demonstrators returned to the streets despite the
												previous day's violence.
											</p>
											<p className="mt-2">
												In Dhaka, police used water cannons and tear gas to
												disperse crowds. A tragic incident occurred in the
												Gulshan area when a vehicle drove through protesters,
												resulting in one fatality.
											</p>
										</>
									)}
									{currentDay === '2024-07-07' && (
										<>
											<p>
												On July 7th, 2024, the protests entered their third day
												with significant incidents at Dhaka University where
												security forces entered the campus, resulting in
												multiple injuries among students.
											</p>
											<p className="mt-2">
												The unrest spread to industrial areas, with port workers
												in Chittagong and factory workers in Narayanganj joining
												the protests. Two port workers were killed when security
												forces attempted to clear a blockade.
											</p>
										</>
									)}
								</div>
							</div>

							{/* Affected areas - dynamically generated from the current day's data */}
							<div className="space-y-3">
								<h3 className="font-medium">Affected Individuals</h3>
								<div className="space-y-2">
									{casualtyData
										.slice(0, showAllCasualties ? casualtyData.length : 5)
										.map((person) => {
											// Check if this person has incomplete data
											const incomplete = hasIncompleteData(person);
											const completeness = calculateCompleteness(person);

											return (
												<div
													key={person.id}
													className={`flex flex-col gap-2 p-3 rounded-md border hover:bg-muted cursor-pointer transition-colors ${
														incomplete
															? 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10'
															: ''
													}`}
													onClick={() =>
														setSelectedIncident(person.id.toString())
													}
												>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<div
																className={`w-2.5 h-2.5 rounded-full ${
																	getBadgeColor(person.type)
																		.replace('bg-', '')
																		.split(' ')[0]
																}`}
															/>
															<div className="font-medium text-sm flex items-center gap-1.5">
																{person.name || 'Unknown'}
																{incomplete && (
																	<span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
																		<Edit className="h-2.5 w-2.5 mr-0.5" /> Edit
																		needed
																	</span>
																)}
															</div>
														</div>
														<div className="text-xs font-medium text-muted-foreground">
															{person.type || 'Unknown'}
														</div>
													</div>

													<div className="text-xs text-muted-foreground flex justify-between">
														<span>
															{person.occupation || 'Unknown occupation'}
															{person.age ? `, ${person.age} years` : ''}
														</span>
														<span>{person.location || 'Unknown location'}</span>
													</div>

													{incomplete && (
														<div className="w-full h-1 bg-muted rounded overflow-hidden">
															<div
																className="h-full bg-amber-500 transition-all"
																style={{ width: `${completeness}%` }}
															></div>
														</div>
													)}
												</div>
											);
										})}

									{casualtyData.length > 5 && (
										<Button
											variant="ghost"
											size="sm"
											className="w-full text-xs text-muted-foreground"
											onClick={() => setShowAllCasualties(!showAllCasualties)}
										>
											{showAllCasualties
												? 'Show fewer casualties'
												: `View all ${casualtyData.length} casualties`}
										</Button>
									)}
								</div>
							</div>

							{/* Instructions */}
							<div className="bg-muted rounded-md p-3">
								<p className="text-sm text-muted-foreground">
									Click on any marker on the map to view detailed information
									about specific individuals. You can edit incomplete
									information by clicking the edit button.
								</p>
							</div>

							{/* News sources - could be day-specific */}
							<div className="space-y-2">
								<h3 className="font-medium">Major News Coverage</h3>
								<ul className="space-y-1 bg-muted/50 p-3 rounded-md">
									{currentDay === '2024-07-03' && (
										<>
											<li>
												<a
													href="https://www.bbc.com/news"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													BBC: Protests begin at Bangladesh universities{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
											<li>
												<a
													href="https://www.thedailystar.net"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													Daily Star: Students begin protests in Dhaka{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
										</>
									)}
									{currentDay === '2024-07-04' && (
										<>
											<li>
												<a
													href="https://www.aljazeera.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													Al Jazeera: First death reported in Bangladesh
													protests <ExternalLink className="h-3 w-3" />
												</a>
											</li>
											<li>
												<a
													href="https://www.reuters.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													Reuters: Protests spread to Bangladesh's port city{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
										</>
									)}
									{currentDay === '2024-07-05' && (
										<>
											<li>
												<a
													href="https://www.bbc.com/news"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													BBC: Violence erupts in Bangladesh protests{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
											<li>
												<a
													href="https://www.aljazeera.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													Al Jazeera: Deadly clashes in Bangladesh{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
										</>
									)}
									{currentDay === '2024-07-06' && (
										<>
											<li>
												<a
													href="https://www.cnn.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													CNN: Protests continue for second day{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
											<li>
												<a
													href="https://www.reuters.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													Reuters: Vehicle drives through protesters in Dhaka{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
										</>
									)}
									{currentDay === '2024-07-07' && (
										<>
											<li>
												<a
													href="https://www.theguardian.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													The Guardian: University campus stormed by security
													forces <ExternalLink className="h-3 w-3" />
												</a>
											</li>
											<li>
												<a
													href="https://www.nytimes.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												>
													New York Times: Port workers join Bangladesh protests{' '}
													<ExternalLink className="h-3 w-3" />
												</a>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
}
