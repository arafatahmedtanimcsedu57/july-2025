'use client';

import type { ReactNode } from 'react';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { ThemeProvider } from '@/shared/ui/layout/theme-provider';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';
import { MainContent } from './main-content';

interface RootLayoutProps {
	children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
	return (
		<ThemeProvider defaultTheme="system" storageKey="map-theme">
			<SidebarProvider defaultOpen={true}>
				<div className="flex min-h-screen flex-col">
					<AppHeader />
					<div className="flex flex-1 overflow-hidden w-full">
						<AppSidebar />
						<MainContent>{children}</MainContent>
					</div>
				</div>
			</SidebarProvider>
		</ThemeProvider>
	);
}
