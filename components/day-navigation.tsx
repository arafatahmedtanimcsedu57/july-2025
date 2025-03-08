'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useDayStore } from '@/lib/day-store';
import { format, parseISO } from 'date-fns';

export default function DayNavigation() {
	const { currentDay, nextDay, prevDay, availableDays } = useDayStore();

	const currentIndex = availableDays.indexOf(currentDay);
	const isFirstDay = currentIndex === 0;
	const isLastDay = currentIndex === availableDays.length - 1;

	const formattedDate = format(parseISO(currentDay), 'MMMM d, yyyy');

	return (
		<div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 dark:bg-muted/10">
			<Button
				variant="outline"
				size="sm"
				onClick={prevDay}
				disabled={isFirstDay}
				className="h-7 px-2 shadow-sm"
			>
				<ChevronLeft className="h-4 w-4 mr-1" />
				Prev Day
			</Button>

			<div className="flex items-center bg-background/70 dark:bg-background/30 px-2 py-1 rounded-md shadow-sm">
				<Calendar className="h-4 w-4 mr-2 text-primary" />
				<span className="text-sm font-medium">{formattedDate}</span>
			</div>

			<Button
				variant="outline"
				size="sm"
				onClick={nextDay}
				disabled={isLastDay}
				className="h-7 px-2 shadow-sm"
			>
				Next Day
				<ChevronRight className="h-4 w-4 ml-1" />
			</Button>
		</div>
	);
}
