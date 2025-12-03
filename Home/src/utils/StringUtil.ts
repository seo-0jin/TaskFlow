/**
 * 값이 비었는지 확인
 * null, undefined, 빈 문자열, 공백 문자열 모두 true
 */
export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value !== "string") return false;
    return value.trim().length === 0;
};

/**
 * 문자열 좌우 공백 제거 (null/undefined 안전 처리)
 */
export const trim = (value: unknown): string => {
    if (typeof value !== "string") return "";
    return value.trim();
};