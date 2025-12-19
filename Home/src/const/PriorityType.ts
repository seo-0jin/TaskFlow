export const PriorityType = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    UNKNOWN: "",
} as const;

export type PriorityKey = keyof typeof PriorityType;
export type PriorityValue = (typeof PriorityType)[PriorityKey];
