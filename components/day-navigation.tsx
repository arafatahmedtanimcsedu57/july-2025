'use client';

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { cn } from '@/lib/utils';
import { useDayStore } from '@/lib/day-store';

export default function DayNavigation() {
	const { currentDay, nextDay, prevDay, availableDays, setDay } = useDayStore();
	const [date, setDate] = useState<Date | undefined>(parseISO(currentDay));
	const [open, setOpen] = useState(false);

	const currentIndex = availableDays.indexOf(currentDay);
	const isFirstDay = currentIndex === 0;
	const isLastDay = currentIndex === availableDays.length - 1;

	const formattedDate = format(parseISO(currentDay), 'MMMM d, yyyy');

	// Convert available days to Date objects for the calendar
	const availableDates = availableDays.map((day) => parseISO(day));

	// Function to check if a date is available
	const isDateAvailable = (date: Date) => {
		return availableDays.includes(format(date, 'yyyy-MM-dd'));
	};

	// Keep the calendar date in sync with the store
	useEffect(() => {
		setDate(parseISO(currentDay));
	}, [currentDay]);

	// Handle date selection from calendar
	const handleSelect = (newDate: Date | undefined) => {
		if (newDate) {
			const dateStr = format(newDate, 'yyyy-MM-dd');
			if (isDateAvailable(newDate)) {
				setDay(dateStr);
				setDate(newDate);
				setOpen(false);
			}
		}
	};

	return (
		<div className="p-4">
			<div className="flex items-center justify-between p-4 bg-transparent border border-muted-foreground/30 rounded-2xl">
				<Button
					variant="ghost"
					size="sm"
					onClick={prevDay}
					disabled={isFirstDay}
					className="h-7 px-2 shadow-2xl rounded-xl"
				>
					<ChevronLeft className="h-4 w-4 mr-1" />
				</Button>

				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild className="border-0">
						<Button
							variant="outline"
							className={cn(
								'h-7 justify-start text-left font-normal bg-background/70 dark:bg-background/30',
								!currentDay && 'text-muted-foreground',
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{formattedDate}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleSelect}
							disabled={(date) => !isDateAvailable(date)}
							modifiers={{
								available: availableDates,
							}}
							modifiersStyles={{
								available: {
									fontWeight: 'bold',
									textDecoration: 'underline',
								},
							}}
							defaultMonth={date}
							initialFocus
						/>
					</PopoverContent>
				</Popover>

				<Button
					variant="ghost"
					size="sm"
					onClick={nextDay}
					disabled={isLastDay}
					className="h-7 px-2 shadow-2xl rounded-xl"
				>
					<ChevronRight className="h-4 w-4 ml-1" />
				</Button>
			</div>
		</div>
	);
}
