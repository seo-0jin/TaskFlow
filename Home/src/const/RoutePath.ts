export const RoutePath = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ISSUES: "/issue",
  UNKNOWN: "",
} as const;

export type PathKey = keyof typeof RoutePath;
export type PathValue = (typeof RoutePath)[PathKey];
