export interface DistrictCasualty {
  district: string;
  verified_injuries: number;
  verified_deaths: number;
  lat: number;
  lng: number;
  total_cases: number;
  total_deaths: number;
  unverified_deaths: number;
  total_injuries: number;
  unverified_injuries: number;
  type: string;
}

const API_ENDPOINT =
  "https://monsoonprotestsarchive.com/api/district-incidents?depth=0&draft=true&limit=1000";

interface ApiResponse {
  docs: {
    id: string;
    district: string;
    verified_injuries: number;
    verified_deaths: number;
    lat: number;
    lng: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

async function fetchData(): Promise<DistrictCasualty[]> {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    const apiResponse: ApiResponse = await response.json();
    return apiResponse.docs.map((item) => ({
      district: item.district,
      verified_injuries: item.verified_injuries,
      verified_deaths: item.verified_deaths,
      lat: item.lat,
      lng: item.lng,
      total_cases: item.verified_injuries + item.verified_deaths, // Added total_cases
      total_deaths: 0,
      unverified_deaths: 0,
      total_injuries: 0,
      unverified_injuries: 0,
      type: "",
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

export const dataDistrictWiseInjuryDeath: () => Promise<
  DistrictCasualty[]
> = async () => {
  return await fetchData();
};

export const getTotalCases = async (): Promise<number> => {
  const data = await dataDistrictWiseInjuryDeath();
  return data.reduce((sum, item) => sum + (item?.total_cases || 0), 0);
};

export const getTotalInjuries = async (): Promise<number> => {
  const data = await dataDistrictWiseInjuryDeath();
  return data.reduce((sum, item) => sum + (item?.verified_injuries || 0), 0);
};

export const getTotalDeaths = async (): Promise<number> => {
  const data = await dataDistrictWiseInjuryDeath();
  return data.reduce((sum, item) => sum + (item?.verified_deaths || 0), 0);
};

export const getTopNCasesByTotalCases = async (
  n = 3
): Promise<DistrictCasualty[]> => {
  const data = await dataDistrictWiseInjuryDeath();
  const sortedData = [...data];

  sortedData.sort((a, b) => (b?.total_cases || 0) - (a?.total_cases || 0));

  return sortedData.slice(0, n);
};
