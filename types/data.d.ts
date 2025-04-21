export type CasualtyType =
  | "Injury"
  | "No Casualties"
  | "Multiple Casualties"
  | "Death";

export interface NewsLink {
  title: string;
  url: string;
}

export interface EffectedPerson {
  id: number;
  date: number | null;
  name: string | null;
  age: number | null;
  occupation: string | null;
  type: string | null;
  location: string | null;
  district: string | null;
  locationCoordinates: string | null;
  lat: number | null;
  lng: number | null;
  gender: string | null;
  graphicLevel: string | null;
  summary: string | null;
  mediaLinks: string[] | [];
}

export interface Casualty {
  district: string;
  total_cases: number;
  total_deaths: number;
  verified_deaths: number;
  unverified_deaths: number;
  total_injuries: number;
  verified_injuries: number;
  unverified_injuries: number;
  lat: number;
  lng: number;
  type: string;
}

export interface HospitalCasualty {
  total_deaths: number;
  verified_deaths: number;
  total_injuries: number;
  verified_injuries: number;
  lat: number | null;
  lng: number | null;
  total_cases: number;
  total_verified_cases: number;
  facility: string;
}
