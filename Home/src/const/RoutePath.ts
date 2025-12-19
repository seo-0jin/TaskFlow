export const RoutePath = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",

  ISSUES: "/issue",

  // 시스템 관리
  system_TEMPLATE: "/system/templates",
  UNKNOWN: "",
} as const;

export type PathKey = keyof typeof RoutePath;
export type PathValue = (typeof RoutePath)[PathKey];
