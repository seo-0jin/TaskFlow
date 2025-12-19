// const/ProjectRole.ts
export const ProjectRoleLabel = {
  OWNER: "관리자",
  PM: "PM",
  DEV: "개발자",
  QA: "QA",
  VIEWER: "조회",
} as const;

export const ProjectRoleColor = {
  OWNER: "#7C3AED",
  PM: "#2563EB",
  DEV: "#16A34A",
  QA: "#EA580C",
  VIEWER: "#64748B",
} as const;

export type ProjectRoleValue = keyof typeof ProjectRoleLabel;
