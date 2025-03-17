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
