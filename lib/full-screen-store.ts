'use client';

import { create } from 'zustand';

interface FullScreenState {
	isFullScreen: boolean;
	toggle: () => void;
}

export const useFullScreenStore = create<FullScreenState>((set) => ({
	isFullScreen: false,
	toggle: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
}));
