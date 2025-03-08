'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { CasualtyPerson } from '@/lib/data';
import { useEditStore } from '@/lib/edit-store';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Save, X } from 'lucide-react';

interface PersonEditFormProps {
	person: CasualtyPerson;
	onCancel: () => void;
}

export default function PersonEditForm({
	person,
	onCancel,
}: PersonEditFormProps) {
	const { saveEdit, startLocationSelection } = useEditStore();
	const [formData, setFormData] = useState<Partial<CasualtyPerson>>({
		name: person.name || '',
		age: person.age || null,
		occupation: person.occupation || '',
		type: person.type || null,
		location: person.location || '',
		description: person.description || '',
		incidentDetails: person.incidentDetails || '',
		lat: person.lat || null,
		lng: person.lng || null,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === 'lat' || name === 'lng') {
			// Use parseFloat for coordinates to handle decimal places
			setFormData((prev) => ({
				...prev,
				[name]: value ? Number.parseFloat(value) : null,
			}));
		} else {
			// Use parseInt for other numeric fields like age
			setFormData((prev) => ({
				...prev,
				[name]: value ? Number.parseInt(value, 10) : null,
			}));
		}
	};

	const handleTypeChange = (value: string) => {
		// Ensure the value is a valid CasualtyType
		const casualtyType = value as
			| 'Injury'
			| 'No Casualties'
			| 'Multiple Casualties'
			| 'Death'
			| null;
		setFormData((prev) => ({ ...prev, type: casualtyType }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		saveEdit(person.id, formData);
	};

	// Listen for changes to the person's data (especially lat/lng from map selection)
	useEffect(() => {
		const { editedData } = useEditStore.getState();
		const personEdits = editedData[person.id.toString()];

		if (personEdits) {
			// Update form data with any edited values, especially coordinates
			setFormData((prev) => ({
				...prev,
				...personEdits,
			}));
		}
	}, [person.id, useEditStore]);

	return (
		<Card className="border-primary/20 shadow-lg">
			<CardHeader className="bg-muted/50 pb-3">
				<CardTitle className="text-base flex items-center gap-2">
					<div className="bg-primary/10 text-primary rounded-full p-1">
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
							<path d="M12 20h9"></path>
							<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
						</svg>
					</div>
					Edit Person Information
				</CardTitle>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4 pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="text-xs font-medium">
								Name
							</Label>
							<Input
								id="name"
								name="name"
								value={formData.name as string}
								onChange={handleChange}
								placeholder="Enter name"
								className="h-9"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="age" className="text-xs font-medium">
								Age
							</Label>
							<Input
								id="age"
								name="age"
								type="number"
								value={formData.age || ''}
								onChange={handleNumberChange}
								placeholder="Enter age"
								className="h-9"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="occupation" className="text-xs font-medium">
								Occupation
							</Label>
							<Input
								id="occupation"
								name="occupation"
								value={formData.occupation as string}
								onChange={handleChange}
								placeholder="Enter occupation"
								className="h-9"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="type" className="text-xs font-medium">
								Casualty Type
							</Label>
							<Select
								value={(formData.type as string) || ''}
								onValueChange={handleTypeChange}
							>
								<SelectTrigger id="type" className="h-9">
									<SelectValue placeholder="Select casualty type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										value="Death"
										className="text-red-500 font-medium"
									>
										Death
									</SelectItem>
									<SelectItem
										value="Injury"
										className="text-orange-500 font-medium"
									>
										Injury
									</SelectItem>
									<SelectItem
										value="Multiple Casualties"
										className="text-purple-500 font-medium"
									>
										Multiple Casualties
									</SelectItem>
									<SelectItem
										value="No Casualties"
										className="text-blue-500 font-medium"
									>
										No Casualties
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="location" className="text-xs font-medium">
							Location
						</Label>
						<Input
							id="location"
							name="location"
							value={formData.location as string}
							onChange={handleChange}
							placeholder="Enter location"
							className="h-9"
						/>
					</div>

					{/* Coordinates section */}
					<div className="space-y-2">
						<Label className="text-xs font-medium">Coordinates</Label>
						<div className="grid grid-cols-2 gap-3 mt-2">
							<div className="space-y-1">
								<Label htmlFor="lat" className="text-xs">
									Latitude
								</Label>
								<Input
									id="lat"
									name="lat"
									type="number"
									step="any"
									value={formData.lat !== null ? formData.lat : ''}
									onChange={handleNumberChange}
									placeholder="Latitude"
									className="h-8 text-sm"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="lng" className="text-xs">
									Longitude
								</Label>
								<Input
									id="lng"
									name="lng"
									type="number"
									step="any"
									value={formData.lng !== null ? formData.lng : ''}
									onChange={handleNumberChange}
									placeholder="Longitude"
									className="h-8 text-sm"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description" className="text-xs font-medium">
							Description
						</Label>
						<Textarea
							id="description"
							name="description"
							value={formData.description as string}
							onChange={handleChange}
							placeholder="Enter description"
							rows={3}
							className="resize-none"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="incidentDetails" className="text-xs font-medium">
							Incident Details
						</Label>
						<Textarea
							id="incidentDetails"
							name="incidentDetails"
							value={formData.incidentDetails as string}
							onChange={handleChange}
							placeholder="Enter incident details"
							rows={3}
							className="resize-none"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-3">
					<Button
						variant="outline"
						type="button"
						onClick={onCancel}
						size="sm"
						className="gap-1.5"
					>
						<X className="h-3.5 w-3.5" /> Cancel
					</Button>
					<Button type="submit" size="sm" className="gap-1.5">
						<Save className="h-3.5 w-3.5" /> Save Changes
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
