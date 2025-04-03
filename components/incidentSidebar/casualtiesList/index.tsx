'use client';

import React, { useState, useRef, useEffect } from 'react';
import { formatDate } from 'date-fns';
import { Calendar1Icon, MapPinIcon } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import { SingleCasualty } from './single-casualty';
import { MultipleCasualty } from './multiple-casualties';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useToast } from '@/hooks/use-toast';
import { useFilteredData } from '@/hooks/use-filtered-data';
import { useFilterStore } from '@/lib/filter-store';
import { useIncidentStore } from '@/lib/incident-store';

import {
	CASUALTY_ITEMS_COLORS,
	CASUALTY_TYPES,
} from '@/constant/casualty-types';

import MaleIcon from '@/public/male.png';
import FemaleIcon from '@/public/female.png';

const CasualtiesList = React.memo(() => {
	const { toast } = useToast();

	const [showAll, setShowAll] = useState(true);
	const filteredData = useFilteredData();
	const { casualtyTypeFilter } = useFilterStore();
	const { selectedIncident, setSelectedIncident } = useIncidentStore();

	const casualtyRefs = useRef<Record<string | number, HTMLDivElement | null>>(
		{},
	);

	const CASUALTY_COUNT = filteredData.length;
	const MIN_CASUALTY_INITIAL_LOAD = 5;

	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

	useEffect(() => {
		if (selectedIncident && casualtyRefs.current[selectedIncident.id]) {
			setTimeout(() => {
				casualtyRefs.current[selectedIncident.id]?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center',
				});
			}, 100);
		}

		if (selectedIncident) {
			const { name, type, occupation, age, location, date, gender } =
				selectedIncident;
			let genderIcon: StaticImageData | string = '';

			if (gender && gender.toLowerCase() === 'male') genderIcon = MaleIcon;
			if (gender && gender.toLowerCase() === 'female') genderIcon = FemaleIcon;
			toast({
				description: (
					<div className="">
						<div className="flex items-center flex-row gap-2">
							{genderIcon ? (
								<div>
									<Image
										src={genderIcon}
										alt="male"
										width={32}
										height={32}
										className="rounded border"
									/>
								</div>
							) : (
								<></>
							)}
							<div className="flex flex-col">
								<div className="flex gap-4 items-center ">
									<div className="flex items-center gap-2 font-medium text-sm">
										{name || 'Unknown'}
									</div>

									{type && CASUALTY_ITEMS_COLORS[type]
										? CASUALTY_ITEMS_COLORS[type]()
										: null}
								</div>

								<div className="text-xs text-muted-foreground flex flex-row gap-2">
									{occupation ? (
										<div>
											<span>{occupation}</span> <span>,</span>{' '}
										</div>
									) : (
										<></>
									)}

									{age ? <span>{age} years</span> : <></>}
								</div>
							</div>
						</div>

						<Separator className="my-4" />

						<div className="text-xs  flex flex-col">
							{location ? (
								<span className="text-xs text-blue-500 flex items-center gap-2">
									<MapPinIcon size={12} /> {location}
								</span>
							) : (
								<></>
							)}
							{date ? (
								<span className="text-xs  flex items-center gap-2">
									<Calendar1Icon size={12} />
									{formatDate(new Date(date), 'do LLL')}
								</span>
							) : (
								<></>
							)}
						</div>
					</div>
				),
				duration: 500000,
			});
		}
	}, [selectedIncident]);

	return (
		<div className="p-4">
			<h3 className="text-sm font-medium mb-4">
				{isMultipleCasualties ? 'Multiple Casualties' : 'Affected Individuals'}
			</h3>
			<div className="flex flex-col gap-2">
				{filteredData
					.slice(0, showAll ? CASUALTY_COUNT : MIN_CASUALTY_INITIAL_LOAD)
					.map((person) => {
						return (
							<div
								key={person.id}
								ref={(el) => {
									casualtyRefs.current[person.id] = el;
								}}
								className={`flex flex-col gap-2 p-4 rounded-md border hover:bg-muted cursor-pointer transition-colors ${
									selectedIncident?.id === person.id ? 'bg-muted' : ''
								}`}
								onClick={() => setSelectedIncident(person)}
							>
								{!isMultipleCasualties ? (
									<SingleCasualty person={person} />
								) : (
									<MultipleCasualty person={person} />
								)}
							</div>
						);
					})}
				{CASUALTY_COUNT > MIN_CASUALTY_INITIAL_LOAD && (
					<Button
						variant="ghost"
						size="sm"
						className="w-full text-xs text-muted-foreground"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll
							? 'Show fewer casualties'
							: `View all ${CASUALTY_COUNT} casualties`}
					</Button>
				)}
			</div>
		</div>
	);
});

export { CasualtiesList };
