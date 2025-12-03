export const RoutePath = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  UNKNOWN: "",
} as const;

export type PathKey = keyof typeof RoutePath;
export type PathValue = (typeof RoutePath)[PathKey];
