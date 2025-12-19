export const IssueStatus = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
    OVERDUE: "OVERDUE",
    ON_HOLD: "ON_HOLD"
} as const;

// 사용 예시 > {IssueStatusLabel[TODO]}
export const IssueStatusLabel: Record<IssueStatusValue, string> = {
    TODO: "할 일",
    IN_PROGRESS: "진행 중",
    DONE: "완료",
    OVERDUE: "지연",
    ON_HOLD: "보류"
};

// 사용 예시 > {IssueStatusColor[TODO]}
export const IssueStatusColor: Record<IssueStatusValue, string> = {
    TODO: "#64748B",
    IN_PROGRESS: "#3B82F6",
    DONE: "#22C55E",
    OVERDUE: "#EF4444",
    ON_HOLD: "#F59E0B"
};

export type IssueStatusKey = keyof typeof IssueStatus;
export type IssueStatusValue = (typeof IssueStatus)[IssueStatusKey];