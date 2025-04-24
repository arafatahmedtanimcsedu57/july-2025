import { format } from "date-fns";

import data from "@/features/effected-people/data/data_effected_people.json";
import { CASUALTY_ITEMS } from "@/constant/casualty-types";
import type { EffectedPerson } from "@/types/data";

export const getTotalEffectedPeople = (data = dataEffectedPeople) => {
  return data.reduce((sum) => sum + 1, 0);
};

export const getTotalDeadPeople = (data = dataEffectedPeople) => {
  return (
    data.filter((person) => person.type === CASUALTY_ITEMS.DEATH).length || 0
  );
};

export const getTotalInjuredPeople = (data = dataEffectedPeople) => {
  return (
    data.filter((person) => person.type === CASUALTY_ITEMS.INJURY).length || 0
  );
};

export const getGroupedByDateData = (data = dataEffectedPeople) => {
  return data.reduce((acc, person) => {
    if (!person.date) return acc;

    const dateStr = format(new Date(person.date), "yyyy-MM-dd");

    if (!acc[dateStr]) {
      acc[dateStr] = {
        date: dateStr,
        displayDate: format(new Date(person.date), "MMM d"),
        timestamp: person.date,
        deaths: 0,
        injuries: 0,
      };
    }

    if (person.type === CASUALTY_ITEMS.DEATH) acc[dateStr].deaths += 1;
    else if (person.type === CASUALTY_ITEMS.INJURY) acc[dateStr].injuries += 1;

    return acc;
  }, {} as Record<string, { date: string; displayDate: string; timestamp: number; deaths: number; injuries: number }>);
};

export const extractAvailableDays = (): {
  date: string;
  [CASUALTY_ITEMS.DEATH]: boolean;
  [CASUALTY_ITEMS.INJURY]: boolean;
  [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
}[] => {
  const dateMap = new Map<
    string,
    {
      [CASUALTY_ITEMS.DEATH]: boolean;
      [CASUALTY_ITEMS.INJURY]: boolean;
      [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: boolean;
    }
  >();

  dataEffectedPeople.forEach((person) => {
    if (person.date) {
      const date = new Date(person.date);
      const dateStr = date.toLocaleDateString().split("T")[0];

      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, {
          [CASUALTY_ITEMS.DEATH]: false,
          [CASUALTY_ITEMS.INJURY]: false,
          [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: false,
        });
      }

      // Get the existing entry and update flags
      const entry = dateMap.get(dateStr)!;
      if (person.type === CASUALTY_ITEMS.DEATH)
        entry[CASUALTY_ITEMS.DEATH] = true;
      if (person.type === CASUALTY_ITEMS.INJURY)
        entry[CASUALTY_ITEMS.INJURY] = true;
      if (person.type === CASUALTY_ITEMS.MULTIPLE_CASUALTIES)
        entry[CASUALTY_ITEMS.MULTIPLE_CASUALTIES] = true;
    }
  });

  // Convert to an array and sort by date
  return Array.from(dateMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const extractUniqueDistricts = () => {
  // Use a Set to automatically handle uniqueness
  const uniqueDistricts = new Set();

  // Iterate through the data and add each district to the Set
  dataEffectedPeople.forEach((person) => {
    if (person.district) {
      uniqueDistricts.add(person.district);
    }
  });

  // Convert Set back to Array for easier handling
  return Array.from(uniqueDistricts)
    .sort()
    .map((item) => ({
      name: item,
      value: item,
    }));
};

export const dataEffectedPeople: EffectedPerson[] = data.data_effected_people;
