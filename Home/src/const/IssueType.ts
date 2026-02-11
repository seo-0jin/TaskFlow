import type { ItemContent } from "./IssueStatus";

/**
 * 이슈 타입
 */
export const IssueType = {
    BUG: "BUG",
    NOT_BUG: "NOT_BUG",
    FEATURE: "FEATURE",
    IMPROVEMENT: "IMPROVEMENT",

    IN_PROGRESS: "IN_PROGRESS",
    FIXED: "FIXED",

    IMPROVED: "IMPROVED",
    IMPROVEMENT_CANCELED: "IMPROVEMENT_CANCELED",

    REVIEW: "REVIEW",
    REVIEWING: "REVIEWING",
    REVIEW_DONE: "REVIEW_DONE",
} as const;

/**
 * 이슈 타입 한글
 */
export const IssueTypeLabel: Record<IssueTypeValue, string> = {
    BUG: "버그",
    NOT_BUG: "버그 아님",
    FEATURE: "기능",
    IMPROVEMENT: "개선",

    IN_PROGRESS: "수정 중",
    FIXED: "수정 완료",

    IMPROVED: "개선 완료",
    IMPROVEMENT_CANCELED: "개선 취소",

    REVIEW: "검수",
    REVIEWING: "검수 중",
    REVIEW_DONE: "검수 완료",
};

/**
 * 템플릿 생성 시 기본 이슈 타입 프리셋
 */
export const buildDefaultIssueTypeItems = (): ItemContent[] => [
    { id: crypto.randomUUID(), name: IssueTypeLabel.BUG, color: "#EF4444" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.NOT_BUG, color: "#9CA3AF" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.FEATURE, color: "#3B82F6" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.IMPROVED, color: "#F59E0B" },

    { id: crypto.randomUUID(), name: IssueTypeLabel.IN_PROGRESS, color: "#6366F1" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.FIXED, color: "#22C55E" },

    { id: crypto.randomUUID(), name: IssueTypeLabel.IMPROVED, color: "#16A34A" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.IMPROVEMENT_CANCELED, color: "#6B7280" },

    { id: crypto.randomUUID(), name: IssueTypeLabel.REVIEW, color: "#0EA5E9" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.REVIEWING, color: "#8B5CF6" },
    { id: crypto.randomUUID(), name: IssueTypeLabel.REVIEW_DONE, color: "#10B981" },
];

export type IssueTypeKey = keyof typeof IssueType;
export type IssueTypeValue = (typeof IssueType)[IssueTypeKey];
