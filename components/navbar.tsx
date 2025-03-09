'use client';

import { Menu, X, MapPin, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/lib/sidebar-store';
import { ThemeToggle } from '@/components/theme-toggle';
import { useEditStore } from '@/lib/edit-store';

export default function Navbar() {
	const { isOpen, toggle } = useSidebarStore();
	const { editedData } = useEditStore();
	const editedCount = Object.keys(editedData).length;

	return (
		<header className="sticky top-0 z-50 w-full bg-background">
			<div className="m-auto container flex items-center justify-between">
				<div className="flex gap-2 items-center py-4 px-2">
					<div className="relative">
						<MapPin className="h-9 w-9" />
						{editedCount > 0 && (
							<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
								{editedCount}
							</span>
						)}
					</div>
					<div className="flex flex-col">
						<h5 className="text-lg font-bold">July Memorial Map</h5>
						<p className="text-xs text-muted-foreground">
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
					<Button
						variant="ghost"
						size="icon"
						onClick={toggle}
						aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
					>
						{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</Button>
				</div>
			</div>
		</header>
	);
}
