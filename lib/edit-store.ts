import { create } from 'zustand';
import type { CasualtyPerson } from '@/lib/data';

interface EditState {
	isEditing: boolean;
	editedData: Record<string, Partial<CasualtyPerson>>;
	isSelectingLocation: boolean;
	personIdForLocation: string | null;
	startEditing: () => void;
	cancelEditing: () => void;
	saveEdit: (id: string | number, data: Partial<CasualtyPerson>) => void;
	startLocationSelection: (id: string) => void;
	cancelLocationSelection: () => void;
	saveLocationSelection: (lat: number, lng: number) => void;
}

export const useEditStore = create<EditState>((set, get) => ({
	isEditing: false,
	editedData: {},
	isSelectingLocation: false,
	personIdForLocation: null,

	startEditing: () => set({ isEditing: true }),

	cancelEditing: () => set({ isEditing: false }),

	saveEdit: (id, data) => {
		set((state) => ({
			isEditing: false,
			editedData: {
				...state.editedData,
				[id.toString()]: {
					...(state.editedData[id.toString()] || {}),
					...data,
				},
			},
		}));
	},

	startLocationSelection: (id) =>
		set({
			isSelectingLocation: true,
			personIdForLocation: id,
		}),

	cancelLocationSelection: () =>
		set({
			isSelectingLocation: false,
			personIdForLocation: null,
		}),

	saveLocationSelection: (lat, lng) => {
		const { personIdForLocation } = get();
		if (personIdForLocation) {
			set((state) => ({
				isSelectingLocation: false,
				personIdForLocation: null,
				editedData: {
					...state.editedData,
					[personIdForLocation]: {
						...(state.editedData[personIdForLocation] || {}),
						lat: Number.parseFloat(lat.toFixed(6)),
						lng: Number.parseFloat(lng.toFixed(6)),
					},
				},
			}));
		}
	},
}));

// Helper function to get updated person data
export function getUpdatedPersonData(person: CasualtyPerson): CasualtyPerson {
	const { editedData } = useEditStore.getState();
	const personEdits = editedData[person.id.toString()];

	if (personEdits) {
		return {
			...person,
			...personEdits,
		};
	}

	return person;
}
