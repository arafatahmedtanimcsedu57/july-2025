'use client';

import { X, MapPin, FileEdit, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

import { useSidebarStore } from '@/lib/sidebar-store';
import { useEditStore } from '@/lib/edit-store';
import { useFullScreenStore } from '@/lib/full-screen-store';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/lib/filter-store';

import { CASUALTY_TYPES } from '@/constant/casualty-types';

export default function Navbar() {
	const { isFullScreen } = useFullScreenStore();
	const { isOpen, toggle } = useSidebarStore();
	const { editedData } = useEditStore();
	const { casualtyTypeFilter } = useFilterStore();

	const editedCount = Object.keys(editedData).length;
	const isMultipleCasualties = casualtyTypeFilter === CASUALTY_TYPES.MULTIPLE;

	return (
		<header className="sticky top-0 z-50 border-dashed border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div
				className={cn(
					'border-dashed border-x flex items-center justify-between',
					!isFullScreen ? 'm-auto container' : '',
				)}
			>
				<div className="flex items-center">
					<div className="relative border-r border-dashed w-[50px] h-[60px] flex items-center justify-center">
						<MapPin className="h-[36px] w-6" />
					</div>
					<div className="flex items-center gap-4 flex-wrap p-4">
						<h5 className="text-lg font-bold">July Memorial</h5>
						<p className="hidden md:block text-xs font-light">
							Remembering July 2024
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{editedCount > 0 && (
						<div className="hidden md:flex items-center gap-2 mr-2 px-2 py-1 bg-primary-foreground/10 rounded-md text-xs">
							<FileEdit className="h-3.5 w-3.5" />
							<span>
								{editedCount} record{editedCount > 1 ? 's' : ''} edited
							</span>
						</div>
					)}
					<ThemeToggle />
					{!isMultipleCasualties ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={toggle}
							aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<>
									<Filter className="mr-2 h-5 w-5" />
									Filters
								</>
							)}
						</Button>
					) : (
						<></>
					)}
				</div>
			</div>
		</header>
	);
}
