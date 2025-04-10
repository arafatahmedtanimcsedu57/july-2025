import data from "@/features/effected-people/data/data_effected_people.json";
import type { EffectedPerson } from "@/types/data";

// export const getCasualtyDataByDate = (dateStr: string): CasualtyPerson[] => {
//   if (!dateStr) return allCasualtyData;

//   const targetDate = new Date(dateStr);
//   const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)).getTime();
//   const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)).getTime();

//   return allCasualtyData.filter((person) => {
//     const personDate = person?.date;
//     if (typeof personDate !== "number") return false;
//     return personDate >= startOfDay && personDate <= endOfDay;
//   });
// };

export const getTotalEffectedPeople = () => {
  return dataEffectedPeople.reduce((sum) => sum + 1, 0);
};

export const dataEffectedPeople: EffectedPerson[] = data.data_effected_people;

// export const uniqueTypes = [
//   ...new Set(allCasualtyData.map((item) => item.type)),
// ];
