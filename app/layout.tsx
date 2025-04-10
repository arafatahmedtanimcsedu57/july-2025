import type React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { IBM_Plex_Sans } from 'next/font/google';

import { ThemeProvider } from './theme-provider';

import '@/app/globals.css';

import Logo from '@/public/logo.png';

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`min-h-screen bg-background  antialiased ${ibmPlexSans.className}`}
			>
				<ThemeProvider defaultTheme="system" storageKey="casualty-map-theme">
					<main className="flex flex-1 flex-col bg-background h-[100vh] overflow-hidden">
						<div className="flex h-full">
							<div className="w-[50px] flex flex-col bg-foreground justify-between items-center shadow-2xl z-[100] py-11">
								<Image src={Logo} alt="brand" width={40} height={40} />

								<div></div>
							</div>
							{children}
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
