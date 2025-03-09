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
		<div className="p-4">
			<div className="flex items-center justify-between p-4 bg-transparent backdrop-blur-md shadow-2xl border border-muted-foreground/30 rounded-2xl">
				<Button
					variant="ghost"
					size="sm"
					onClick={prevDay}
					disabled={isFirstDay}
					className="h-7 px-2 shadow-2xl rounded-xl"
				>
					<ChevronLeft className="h-4 w-4 mr-1" />
				</Button>

				<div className="flex items-center px-2 py-1 rounded-md shadow-2xl text-slate-600">
					<Calendar className="h-4 w-4 mr-2" />
					<span className="text-sm font-medium ">{formattedDate}</span>
				</div>

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
