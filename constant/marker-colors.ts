import { CASUALTY_ITEMS } from "./casualty-types";

export const MARKER_COLORS: Record<
  string,
  { color: string; fillColor: string }
> = {
  [CASUALTY_ITEMS.DEATH]: { color: "#ef4444", fillColor: "#ef4444" }, // red
  [CASUALTY_ITEMS.INJURY]: { color: "#efc985", fillColor: "#efc985" }, // orange
  [CASUALTY_ITEMS.MULTIPLE_CASUALTIES]: {
    color: "#ef4444",
    fillColor: "#ef4444",
  }, // purple
  [CASUALTY_ITEMS.NO_CASUALTIES]: {
    color: "#e7700d00",
    fillColor: "#e7700d00",
  }, // blue
  default: { color: "#6b7280", fillColor: "#6b7280" }, // gray as default
};
