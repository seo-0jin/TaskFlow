export const SummaryType = {
  DUE_TODAY: "DUE_TODAY",
  IN_PROGRESS: "IN_PROGRESS",
  UNASSIGNED: "UNASSIGNED",
  DONE_7D: "DONE_7D",
  UNKNOWN: "",
} as const;

export type SummaryKey = keyof typeof SummaryType;
export type SummaryValue = (typeof SummaryType)[SummaryKey];
