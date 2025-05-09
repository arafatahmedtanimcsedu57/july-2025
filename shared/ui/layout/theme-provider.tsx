'use client';

import type React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: 'light',
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'july-map-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	useEffect(() => {
		const savedTheme = localStorage.getItem(storageKey) as Theme | null;

		if (savedTheme) {
			setTheme('light');
		} else if (defaultTheme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'light'
				: 'light';
			setTheme(systemTheme);
		}
	}, [defaultTheme, storageKey]);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'light');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'light'
				: 'light';
			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}

		localStorage.setItem(storageKey, theme);
	}, [theme, storageKey]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};
