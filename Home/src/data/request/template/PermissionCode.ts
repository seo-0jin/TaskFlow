export const permissionLabel = [
  { code: "PROJECT_EDIT", label: "프로젝트 설정 수정" },
  { code: "MEMBER_MANAGE", label: "멤버 초대/삭제" },
  { code: "ISSUE_CREATE", label: "이슈 생성" },
  { code: "ISSUE_EDIT", label: "이슈 수정" },
  { code: "ISSUE_DELETE", label: "이슈 삭제" },
  { code: "COMMENT_WRITE", label: "코멘트 작성" },
] as const;

export const buildDefaultPermissions = (): PermissionMap => ({
  PROJECT_EDIT: ["OWNER", "PM"],
  MEMBER_MANAGE: ["OWNER", "PM"],
  ISSUE_CREATE: ["OWNER", "PM", "DEV", "QA"],
  ISSUE_EDIT: ["OWNER", "PM", "DEV", "QA"],
  ISSUE_DELETE: ["OWNER", "PM"],
  COMMENT_WRITE: ["OWNER", "PM", "DEV", "QA", "MEMBER"],
});

export type PermissionCode = typeof permissionLabel[number]["code"];
export type PermissionMap = Record<PermissionCode, string[]>;
