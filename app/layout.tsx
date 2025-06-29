import type React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { IBM_Plex_Sans } from 'next/font/google';

import { ThemeProvider } from '@/shared/ui/layout/theme-provider';

import '@/app/globals.css';
import Logo from '@/public/logo.png';
import Header from '@/app/header';
import { NavMenu } from '@/shared/ui/layout/nav-menu';

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Bangladesh Casualty Map',
	description:
		'Interactive map showing casualty data from incidents in Bangladesh during July 2024',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`min-h-screen bg-background  antialiased ${ibmPlexSans.className}`}
			>
				<header className="sticky shadow-md bg-background top-0 z-40 w-full p-4 flex flex-wrap justify-between items-center">
					<div className="flex gap-2 text-slate-700">
						<Image
							src={Logo}
							alt="brand"
							width={48}
							height={48}
							className="min-w-[56px] max-h-[64px]"
						/>
						<Header />
					</div>

					<div className=" gap-2 text-white flex">
						<NavMenu />
					</div>
				</header>
				<ThemeProvider defaultTheme="light" storageKey="july-map-theme">
					<main className="flex flex-1 flex-col bg-background h-[calc(100vh-95px)] overflow-hidden">
						<div className="flex h-full">{children}</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
