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
		<header className="sticky top-0 z-50 border-dashed border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="border-dashed border-x m-auto container flex items-center justify-between">
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
					<Button
						variant="ghost"
						size="sm"
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
