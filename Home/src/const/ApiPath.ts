export const ApiPath = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  CHECK_LOGIN_ID: "/check-login-id",
  UNKNOWN: "",
} as const;

export type PathKey = keyof typeof ApiPath;
export type PathValue = (typeof ApiPath)[PathKey];
