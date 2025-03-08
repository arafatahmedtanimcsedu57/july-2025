import type React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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
			<body className="min-h-screen bg-background font-sans antialiased">
				<ThemeProvider defaultTheme="system" storageKey="casualty-map-theme">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
