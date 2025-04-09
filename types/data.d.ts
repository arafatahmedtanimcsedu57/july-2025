export type CasualtyType =
	| 'Injury'
	| 'No Casualties'
	| 'Multiple Casualties'
	| 'Death';

export interface NewsLink {
	title: string;
	url: string;
}

export interface CasualtyPerson {
	id?: number;
	date?: number | null; // Epoch timestamp can be null
	name?: string | null;
	age?: number | null;
	occupation?: string | null;
	type: CasualtyType | null;
	location?: string | null;
	'Location Coordinates'?: string | null;
	lat: number | null;
	lng: number | null;
	desciption?: string | null;
	incidentDetails?: string | null;
	extendedDetails?: string | null;
	newsLinks?: NewsLink[] | null;
	image?: string | null;
	gender?: string | null;

	district?: string | null;

	total_cases?: number | null;

	total_deaths?: number | null;

	verified_deaths?: number | null;

	unverified_deaths?: number | null;

	total_injuries?: number | null;
	verified_injuries?: number | null;
	unverified_injuries?: number | null;
}


export interface Casualty {
	district: string,
	total_cases: number,
	total_deaths: number,
	verified_deaths: number,
	unverified_deaths: number,
	total_injuries: number,
	verified_injuries: number,
	unverified_injuries: number,
	lat: number,
	lng: number,
	type: string,
}