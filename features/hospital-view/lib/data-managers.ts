import type { HospitalCasualty } from "@/types/data";

const API_ENDPOINT =
  "https://monsoonprotestsarchive.com/api/hospital-incidents?depth=0&draft=true&limit=1000";

interface HospitalIncident {
  id: string;
  name: string;
  verified_injuries: number;
  verified_deaths: number;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchHospitalData = async (): Promise<HospitalCasualty[]> => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();

    if (!data.docs || !Array.isArray(data.docs)) {
      console.error("Invalid API response:", data);
      return [];
    }

    const transformedData: HospitalCasualty[] = data.docs.map(
      (item: HospitalIncident) => ({
        facility: item.name,
        verified_injuries: item.verified_injuries,
        verified_deaths: item.verified_deaths,
        total_verified_cases: item.verified_injuries + item.verified_deaths,
        lat: item.lat,
        lng: item.lng,
      })
    );

    return transformedData;
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    return [];
  }
};

export const getTotalCases = async (): Promise<number> => {
  const data = await fetchHospitalData();
  return data.reduce(
    (sum: number, item: HospitalCasualty) =>
      sum + (item?.total_verified_cases || 0),
    0
  );
};

export const getTotalInjuries = async (): Promise<number> => {
  const data = await fetchHospitalData();
  return data.reduce(
    (sum: number, item: HospitalCasualty) =>
      sum + (item?.verified_injuries || 0),
    0
  );
};

export const getTotalDeaths = async (): Promise<number> => {
  const data = await fetchHospitalData();
  return data.reduce(
    (sum: number, item: HospitalCasualty) => sum + (item?.verified_deaths || 0),
    0
  );
};

export const getTopNCasesByTotalCases = async (
  n = 3
): Promise<HospitalCasualty[]> => {
  const data = await fetchHospitalData();
  const sortedData = [...data];

  sortedData.sort(
    (a, b) => (b?.total_verified_cases || 0) - (a?.total_verified_cases || 0)
  );

  return sortedData.slice(0, n);
};
