import { GitCommitVerticalIcon, GitCompareIcon } from "lucide-react";

export const CASUALTY_TYPES = {
  INDIVIDUAL: "INDIVIDUAL",
  MULTIPLE: "MULTIPLE",
};

export const CASUALTY = [
  {
    name: "Individual Casualty",
    value: CASUALTY_TYPES.INDIVIDUAL,
    icon: GitCommitVerticalIcon,
  },
  {
    name: "Multiple Casualties",
    value: CASUALTY_TYPES.MULTIPLE,
    icon: GitCompareIcon,
  },
];

export const CASUALTY_ITEMS = {
  DEATH: "Death",
  INJURY: "Injury",
  MULTIPLE_CASUALTIES: "Multiple Casualties",
  NO_CASUALTIES: "No Casualties",
};

export const CASUALTY_ITEMS_COLOR_ELEMENTS = {
  [CASUALTY_ITEMS.DEATH]: () => (
    <div className="w-1 h-1 rounded-full bg-[#9c0610]"></div>
  ),
  [CASUALTY_ITEMS.INJURY]: () => (
    <div className="w-1 h-1 rounded-full bg-[#ee7f01]"></div>
  ),
  [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: () => null,
  [CASUALTY_ITEMS.NO_CASUALTIES]: () => null,
} as const;

export const CASUALTY_ITEMS_COLORS = {
  [CASUALTY_ITEMS.DEATH]: () => "red",
  [CASUALTY_ITEMS.INJURY]: () => "orange",
  [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: () => "#9f0510",
  [CASUALTY_ITEMS.NO_CASUALTIES]: () => "slate",
};
