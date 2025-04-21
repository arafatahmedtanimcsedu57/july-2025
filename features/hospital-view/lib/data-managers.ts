import data from "@/features/hospital-view/data/hospital_wise_data.json";
import type { HospitalCasualty } from "@/types/data";

export const dataHospitalWiseInjuryDeath: HospitalCasualty[] =
  data.data_hospital_wise;

export const getTotalCases = (): number => {
  return dataHospitalWiseInjuryDeath.reduce(
    (sum, item) => sum + (item?.total_verified_cases || 0),
    0
  );
};

export const getTotalInjuries = (): number => {
  return dataHospitalWiseInjuryDeath.reduce(
    (sum, item) => sum + (item?.verified_injuries || 0),
    0
  );
};

export const getTotalDeaths = (): number => {
  return dataHospitalWiseInjuryDeath.reduce(
    (sum, item) => sum + (item?.verified_deaths || 0),
    0
  );
};

export const getTopNCasesByTotalCases = (n = 3) => {
  const sortedData = [...dataHospitalWiseInjuryDeath];

  sortedData.sort(
    (a, b) => (b?.total_verified_cases || 0) - (a?.total_verified_cases || 0)
  );

  return sortedData.slice(0, n);
};
