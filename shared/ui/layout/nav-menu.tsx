'use client';
import { useState, useRef, useEffect } from 'react';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '../navigation-menu';
import Link from 'next/link';
import Methodology from '@/app/methodology';
import { cn } from '@/lib/utils';

const navigationItems = [
	{
		title: 'Quick Look',
		href: '/quick-view',
		description: 'Organized by Districts.',
	},
	{
		title: 'Hospital View',
		href: '/hospital-view',
		description: 'Organized by Hospitals',
	},
	{
		title: 'Incidents',
		href: '/effected-people',
		description: 'Analyzed Incidents',
	},
];

export function NavMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const dropdown = dropdownRef.current.querySelector(
				'div[class*="absolute"]',
			);
			if (dropdown) {
				const rect = dropdown.getBoundingClientRect();
				const viewportWidth = window.innerWidth;

				if (rect.right > viewportWidth) {
					(dropdown as HTMLElement).style.right = '0';
					(dropdown as HTMLElement).style.left = 'auto';
				} else {
					(dropdown as HTMLElement).style.right = 'auto';
					(dropdown as HTMLElement).style.left = '';
				}
			}
		}
	}, [isOpen]);

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							Home
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={cn(
							navigationMenuTriggerStyle(),
							'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
						)}
					>
						<div className="flex items-center gap-2">
							<SquareArrowOutUpRightIcon size={16} />
							Map View
						</div>
					</NavigationMenuTrigger>

					<NavigationMenuContent>
						<ul className="grid gap-1 md:w-[200px]  max-h-[80vh] overflow-y-auto">
							{navigationItems.map((item) => (
								<li key={item.href}>
									<NavigationMenuLink asChild>
										<a
											href={item.href}
											className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										>
											<div className="text-sm font-medium leading-none">
												{item.title}
											</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												{item.description}
											</p>
										</a>
									</NavigationMenuLink>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/investigations" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							Investigation
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/methodology" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							Methodology
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/articles" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							Media
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/timeline" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							Timeline
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/team" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent',
							)}
						>
							About
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
