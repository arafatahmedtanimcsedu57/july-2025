'use client';

import { memo } from 'react';
import { CircleMarker, Tooltip } from 'react-leaflet';
import { formatDate } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Separator } from '@/shared/ui/separator';
import { useSelectedPersonStore } from '@/features/effected-people/store/selected-person-store';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { CASUALTY_ITEMS } from '@/constant/casualty-types';
import { GENDERS } from '@/constant/gender-types';
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from '@/constant/casualty-types';

import type { EffectedPerson } from '@/types/data';
import MaleIcon from '@/public/male.png';
import FemaleIcon from '@/public/female.png';

interface EffectedPersonMarkerProps {
	person: EffectedPerson;
}

const EffectedPersonMarker = memo(({ person }: EffectedPersonMarkerProps) => {
	const {
		lat,
		name,
		lng,
		district,
		type,
		id,
		location,
		date,
		gender,
		age,
		occupation,
	} = person;
	if (lat === null || lng === null) return null;

	const { selectedPerson, toggleSelectedPerson } = useSelectedPersonStore();

	const GenderIcon =
		gender === GENDERS.MALE
			? MaleIcon
			: gender === GENDERS.FEMALE
			? FemaleIcon
			: '';
	const _date = date ? new Date(date) : '';
	const _dateString = _date ? formatDate(_date.toLocaleString(), 'dd MMM') : '';
	const markerPosition = [lat, lng] as [number, number];
	const isSelected = selectedPerson && selectedPerson.id === id;
	const deathCircleRadius = 5;
	const injuryCircleRadius = 5;

	const handleMarkerClick = () => toggleSelectedPerson(person);

	const rippleEffect = isSelected ? (
		<>
			<CircleMarker
				center={markerPosition}
				radius={injuryCircleRadius + 5}
				pathOptions={{
					color: '#ee7f01',
					fillColor: 'transparent',
					fillOpacity: 0,
					weight: 1,
					opacity: 0.7,
					dashArray: '5,5',
				}}
				eventHandlers={{ click: handleMarkerClick }}
			/>
			<CircleMarker
				center={markerPosition}
				radius={injuryCircleRadius + 10}
				pathOptions={{
					color: '#ee7f01',
					fillColor: 'transparent',
					fillOpacity: 0,
					weight: 0.75,
					opacity: 0.5,
					dashArray: '3,7',
				}}
				eventHandlers={{ click: handleMarkerClick }}
			/>
		</>
	) : (
		<></>
	);

	const deathCircleMarker = (
		<CircleMarker
			key={district}
			center={markerPosition}
			radius={deathCircleRadius}
			pathOptions={{
				color: '#9c0610',
				fillColor: '#9c0610',
				fillOpacity: 1,
				weight: 0,
				stroke: true,
			}}
			eventHandlers={{ click: handleMarkerClick }}
			className="drop-shadow-[0_0_0.1rem_crimson]"
		>
			{isSelected && (
				<Tooltip permanent={true} direction="top">
					<Card className="bg-transparent border-none shadow-none p-4" key={id}>
						<CardHeader className="space-y-4 p-0">
							<CardTitle className="flex flex-col gap-2">
								<div className="flex justify-between items-center">
									<div className="flex gap-2 items-center">
										{GenderIcon ? (
											<Image
												src={GenderIcon || '/placeholder.svg'}
												alt="gender"
												width={32}
												height={32}
											/>
										) : (
											<></>
										)}
										<div className="flex flex-col">
											<span className="text-xs">{name || 'Unknown'}</span>
											<span className="text-xs font-normal">
												{age || '...'} years, {occupation || '...'}
											</span>
										</div>
									</div>

									{type ? CASUALTY_ITEMS_COLOR_ELEMENTS[type]!() : <></>}
								</div>
							</CardTitle>
							<Separator />
							<CardDescription>
								<div className="flex gap-2 items-center">
									<div>
										<MapPin width={16} />
									</div>
									<span className="text-xs">
										{location || '...'}, {district || '...'}
									</span>
								</div>

								<div className="flex gap-2 items-center">
									<div>
										<Calendar width={16} />
									</div>
									<span className="text-xs">{_dateString || '...'}</span>
								</div>
							</CardDescription>
						</CardHeader>
					</Card>
				</Tooltip>
			)}
		</CircleMarker>
	);

	const injuryCircleMarker = (
		<CircleMarker
			key={`${district}-outer`}
			center={markerPosition}
			radius={injuryCircleRadius}
			pathOptions={{
				color: '#ee7f01',
				fillColor: '#e9a30c',
				fillOpacity: 0.4,
				weight: 0.75,
				stroke: true,
			}}
			eventHandlers={{ click: handleMarkerClick }}
		/>
	);

	return (
		<>
			{rippleEffect}
			{type === CASUALTY_ITEMS.DEATH && deathCircleMarker}
			{type === CASUALTY_ITEMS.INJURY && injuryCircleMarker}
		</>
	);
});

EffectedPersonMarker.displayName = 'EffectedPersonMarker';

export { EffectedPersonMarker };
