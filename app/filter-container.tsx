'use client';

import React, { useEffect } from 'react';
import { getDate, format } from 'date-fns';
import { FilterIcon } from 'lucide-react';

import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';

import { useFilterContainerStore } from '@/features/effected-people/store/filter-container-store';
import { useFilterStore } from '@/features/effected-people/store/filter-store';
import { useSelectedPersonStore } from '@/features/effected-people/store/selected-person-store';
import {
	extractAvailableDays,
	extractUniqueDistricts,
} from '@/features/effected-people/lib/data-managers';

import {
	CASUALTY_ITEMS,
	CASUALTY_ITEMS_COLOR_ELEMENTS,
} from '@/constant/casualty-types';

export default function FilterContainer() {
	const { close } = useFilterContainerStore();
	const {
		minAgeFilter,
		maxAgeFilter,
		typeFilter,
		districtFilter,
		setDateFilter,
		setMinAgeFilter,
		setMaxAgeFilter,
		setTypeFilter,
		setDistrictFilter,
	} = useFilterStore();

	const availableDays = extractAvailableDays();
	const availableDistricts = extractUniqueDistricts();
	const { resetSelectedPerson } = useSelectedPersonStore();

	const handleDateSelect = (date: Date | undefined) => {
		resetSelectedPerson();
		setDateFilter(date || null);
	};

	const handleAgeChange = (values: number[]) => {
		resetSelectedPerson();
		setMinAgeFilter(values[0].toString());
		setMaxAgeFilter(values[1].toString());
	};

	const handleTypeFilter = (type: string) => {
		resetSelectedPerson();
		setTypeFilter(type);
	};

	const handleDistrictFilter = (district: string) => {
		resetSelectedPerson();
		setDistrictFilter(district);
	};

	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		};

		window.addEventListener('keydown', handleEscapeKey);
		return () => window.removeEventListener('keydown', handleEscapeKey);
	}, [close]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				close();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [close]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="default"
					className={`
            shadow-lg 
            rounded-e-full
            
            w-[48px]
            aspect-square
            inline-flex
            items-center
            justify-center
            gap-4
            text-lg
            font-semibold
            
            group
            hover:w-[140px]
            transition-all
            duration-100
            ease-in-out
            hover:bg-blue-600`}
				>
					<span className="hidden group-hover:inline-block opacity-0 group-hover:opacity-100 transition-opacity">
						Filter
					</span>{' '}
					<FilterIcon className="text-white font-extrabold" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className=" dark:text-white text-slate-700">
				<SheetHeader className="dark:text-white text-slate-700">
					<SheetTitle className=" dark:!text-white !text-slate-700">
						Filter
					</SheetTitle>
					<SheetDescription>Set filters to modify data</SheetDescription>
				</SheetHeader>
				<div className="my-10 flex flex-col gap-10">
					<div className="grid grid-cols-1 items-center gap-4 ">
						<Label>Casualty Dates</Label>

						<div className="flex flex-wrap gap-2 items-center text-center">
							{availableDays.map((day) => {
								const _date = new Date(day.date);

								return (
									<div
										className="p-4 border cursor-pointer rounded flex flex-col items-center justify-center"
										key={day.date}
										onClick={() => handleDateSelect(new Date(day.date))}
									>
										<div className="text-sm uppercase">
											{format(_date, 'LLL')}
										</div>

										<div className="text-2xl font-extrabold">
											{getDate(_date)}
										</div>

										<div className="flex gap-2 items-center justify-center">
											{Object.entries(CASUALTY_ITEMS).map(([key, value]) =>
												day[value] ? (
													<div
														key={`${key}_${value}`}
														className="flex items-center gap-1"
													>
														{CASUALTY_ITEMS_COLOR_ELEMENTS[value]?.()}
													</div>
												) : (
													<React.Fragment
														key={`empty_${key}_${value}`}
													></React.Fragment>
												),
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className="grid grid-cols-1 items-center gap-4">
						<Label>Age Range</Label>
						<div className="col-span-2 space-y-4">
							<Slider
								defaultValue={[
									minAgeFilter ? Number.parseInt(minAgeFilter) : 0,
									maxAgeFilter ? Number.parseInt(maxAgeFilter) : 100,
								]}
								max={100}
								step={1}
								onValueChange={(values) => handleAgeChange(values)}
								className="my-2"
							/>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>{minAgeFilter || '0'}</span>
								<span>{maxAgeFilter || '100'}</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 items-center gap-4">
						<Label htmlFor="type-filter">Casualty Type</Label>
						<Select
							value={typeFilter}
							onValueChange={(e) => handleTypeFilter(e)}
						>
							<SelectTrigger className="col-span-2 h-8" id="type-filter">
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Casualty Types</SelectItem>

								<SelectItem
									key={CASUALTY_ITEMS.DEATH}
									value={CASUALTY_ITEMS.DEATH}
								>
									{CASUALTY_ITEMS.DEATH}
								</SelectItem>

								<SelectItem
									key={CASUALTY_ITEMS.INJURY}
									value={CASUALTY_ITEMS.INJURY}
								>
									{CASUALTY_ITEMS.INJURY}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-1 items-center gap-4">
						<Label htmlFor="type-filter">Districts</Label>
						<Select
							value={districtFilter}
							onValueChange={(e) => handleDistrictFilter(e)}
						>
							<SelectTrigger className="col-span-2 h-8" id="type-filter">
								<SelectValue placeholder="Select District" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Districts</SelectItem>

								{availableDistricts.map((district) => (
									<SelectItem
										key={district.value as string}
										value={district.value as string}
									>
										{district.name as string}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
