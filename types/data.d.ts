export type CasualtyType =
  | "Injury"
  | "No Casualties"
  | "Multiple Casualties"
  | "Death";

export interface NewsLink {
  title: string;
  url: string;
}

export interface CasualtyPerson {
  id: number;
  date: number | null; // Epoch timestamp can be null
  name: string | null;
  age: number | null;
  occupation: string | null;
  type: CasualtyType | null;
  location: string | null;
  "Location Coordinates"?: string | null;
  lat: number | null;
  lng: number | null;
  description?: string | null;
  incidentDetails?: string | null;
  extendedDetails?: string | null;
  newsLinks?: NewsLink[] | null;
  image?: string | null;
  gender?: string | null;
}
