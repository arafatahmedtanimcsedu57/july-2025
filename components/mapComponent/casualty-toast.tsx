'use client';

import type React from 'react';
import { formatDate } from 'date-fns';
import { CalendarIcon as Calendar1Icon, MapPinIcon } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import { Separator } from '@/components/ui/separator';
import { ToastClose } from '@/components/ui/toast';

import { useFilterStore } from '@/lib/filter-store';

import {
	CASUALTY_ITEMS_COLOR_ELEMENTS,
	CASUALTY_TYPES,
} from '@/constant/casualty-types';
import { GENDERS } from '@/constant/gender-types';

import type { CasualtyPerson } from '@/types/data';
import FemaleIcon from '@/public/female.png';
import MaleIcon from '@/public/male.png';

interface CasualtyToastProps {
	casualty: CasualtyPerson;
	onClose: () => void;
	onSwipeEnd: () => void;
}

export const CasualtyToast: React.FC<CasualtyToastProps> = ({
	casualty,
	onClose,
}) => {
	if (!casualty) return null;

	const { casualtyTypeFilter } = useFilterStore();

	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;
	const {
		name,
		type,
		occupation,
		age,
		location,
		date,
		gender,
		district,
		total_injuries,
		total_deaths,
		total_cases,
	} = casualty;

	let genderIcon: StaticImageData | string = '';
	if (gender && gender.toLowerCase() === GENDERS.MALE) genderIcon = MaleIcon;
	if (gender && gender.toLowerCase() === GENDERS.FEMALE)
		genderIcon = FemaleIcon;

	return (
		<div className="">
			<ToastClose onClick={onClose} />

			<div className="flex items-center flex-row gap-2">
				{genderIcon ? (
					<div>
						<Image
							src={genderIcon || '/placeholder.svg'}
							alt={gender || 'gender'}
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
							{isMultipleCasualties ? district : name || 'Unknown'}
						</div>

						{type && CASUALTY_ITEMS_COLOR_ELEMENTS[type]
							? CASUALTY_ITEMS_COLOR_ELEMENTS[type]()
							: null}
					</div>
					{!isMultipleCasualties && (occupation || age) ? (
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
					) : (
						<></>
					)}

					{isMultipleCasualties && (total_injuries || total_deaths) ? (
						<div className="text-xs flex flex-row gap-2">
							{total_cases ? (
								<div>
									<span>Total Cases:</span>{' '}
									<span className="text-muted-foreground">{total_cases}</span>
								</div>
							) : (
								<></>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>

			<Separator className="my-4" />

			{!isMultipleCasualties ? (
				<div className="text-xs flex flex-col">
					{location ? (
						<span className="text-xs text-blue-500 flex items-center gap-2">
							<MapPinIcon size={12} /> {location}
						</span>
					) : (
						<></>
					)}
					{date ? (
						<span className="text-xs flex items-center gap-2">
							<Calendar1Icon size={12} />
							{formatDate(new Date(date), 'do LLL')}
						</span>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}

			{isMultipleCasualties && (total_injuries || total_deaths) ? (
				<div className="text-xs flex flex-row gap-2">
					{total_injuries ? (
						<div>
							<span>Injuries:</span>{' '}
							<span className="text-muted-foreground">{total_injuries}</span>
						</div>
					) : (
						<></>
					)}

					{total_deaths ? (
						<div>
							<span>Deaths:</span>{' '}
							<span className="text-muted-foreground">{total_deaths}</span>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
