'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { X, ExternalLink, AlertTriangle, Edit, FileEdit } from 'lucide-react';

import PersonEditForm from './person-edit-form';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import DayNavigation from '@/components/day-navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

import { useDayStore } from '@/lib/day-store';
import { useIncidentStore } from '@/lib/incident-store';
import { useSidebarStore } from '@/lib/sidebar-store';
import { getCasualtyDataByDate } from '@/lib/data';
import { useEditStore, getUpdatedPersonData } from '@/lib/edit-store';
import { FilterControls } from './filter-controls';
import { useFilteredData } from '@/hooks/use-filtered-data';

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

	const filteredData = useFilteredData();

	let selectedPerson = filteredData.find(
		(p) => p.id.toString() === selectedIncidentId,
	);

	// Get updated person data if it exists
	if (selectedPerson) {
		selectedPerson = getUpdatedPersonData(selectedPerson);
	}

	// Calculate totals for the current day
	const totals = filteredData.reduce(
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
		<div className="w-full md:w-[100px] bg-transparent z-40 transition-all duration-300 ease-in-out overflow-hidden">
			{selectedPerson ? (
				<div className="flex flex-col h-[calc(100vh-100px)] absolute">
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

									<div>
										<Badge className={getBadgeColor(selectedPerson.type)}>
											{selectedPerson.type || 'Unknown'}
										</Badge>
									</div>

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
				<div className="flex flex-col h-[calc(100vh-100px)] w-full md:w-[350px]  absolute">
					<FilterControls />

					<ScrollArea className="flex-1">
						<div className="p-4 space-y-6">
							<div>
								<div className="grid grid-cols-2 gap-3 bg-transparent border border-muted-foreground/30 p-4 rounded-2xl backdrop-blur-md">
									<Card className="scale-[1.21] -translate-x-4 -translate-y-4 rounded-2xl shadow-xl shadow-gray-700 border border-muted-foreground/30 bg-secondary-foreground backdrop-blur-md">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-red-600 ">
												{totals['Death'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Deaths
											</div>
										</CardContent>
									</Card>

									<Card className="rounded-2xl  border border-muted-foreground/30 bg-secondary">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-orange-600">
												{totals['Injury'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Injuries
											</div>
										</CardContent>
									</Card>

									<Card className="rounded-2xl border border-muted-foreground/30 bg-secondary">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-purple-600">
												{totals['Multiple Casualties'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												Multiple Casualties
											</div>
										</CardContent>
									</Card>

									<Card className="rounded-2xl border border-muted-foreground/30 bg-secondary">
										<CardContent className="p-3">
											<div className="text-2xl font-bold text-blue-600">
												{totals['No Casualties'] || 0}
											</div>
											<div className="text-xs text-muted-foreground">
												No Casualties
											</div>
										</CardContent>
									</Card>
								</div>
							</div>

							<div className="p-4 space-y-3 bg-transparent backdrop-blur-md border rounded-2xl">
								<h3 className="font-medium">Affected Individuals</h3>
								<div className="space-y-2">
									{filteredData
										.slice(0, showAllCasualties ? filteredData.length : 5)
										.map((person) => {
											// Check if this person has incomplete data
											const incomplete = hasIncompleteData(person);
											const completeness = calculateCompleteness(person);

											return (
												<div
													key={person.id}
													className={`flex flex-col gap-2 p-4 rounded-md border hover:bg-muted cursor-pointer transition-colors`}
													onClick={() =>
														setSelectedIncident(person.id.toString())
													}
												>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<div className="font-medium text-sm flex items-center gap-1.5">
																{person.name || 'Unknown'}
															</div>
														</div>

														<div className="text-xs font-medium text-muted-foreground">
															{person.type || 'Unknown'}
														</div>
													</div>

													<div className="text-xs text-muted-foreground flex flex-col justify-between">
														<span>
															{person.occupation || 'Unknown occupation'}{' '}
															{person.age ? `, ${person.age} years` : ''}
														</span>
														<span>{person.location || 'Unknown location'}</span>
													</div>

													{incomplete && (
														<div className="flex flex-col gap-2">
															{' '}
															<div className="w-full h-1 bg-muted rounded overflow-hidden">
																<div
																	className="h-full bg-primary transition-all"
																	style={{ width: `${completeness}%` }}
																></div>
															</div>
															<span className="w-fit inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300 self-end">
																<Edit className="h-2.5 w-2.5 mr-0.5" /> Edit
																needed
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
											onClick={() => setShowAllCasualties(!showAllCasualties)}
										>
											{showAllCasualties
												? 'Show fewer casualties'
												: `View all ${filteredData.length} casualties`}
										</Button>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="font-medium">Major News Coverage</h3>
								<ul className="space-y-1 bg-muted/50 p-3 rounded-md">
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

									<li>
										<a
											href="https://www.aljazeera.com"
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
										>
											Al Jazeera: First death reported in Bangladesh protests{' '}
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
											Reuters: Protests spread to Bangladesh's port city{' '}
											<ExternalLink className="h-3 w-3" />
										</a>
									</li>

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

									<li>
										<a
											href="https://www.theguardian.com"
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
										>
											The Guardian: University campus stormed by security forces{' '}
											<ExternalLink className="h-3 w-3" />
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
								</ul>
							</div>
						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
}
