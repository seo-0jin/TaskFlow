import type { LoginResponse } from "../data/response/LoginResponse";

const USER_KEY = "user";
const TOKEN_KEY = "token";

export const saveUser = (user: LoginResponse) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionStorage.setItem(TOKEN_KEY, user.token);
}

export const loadUser = (): LoginResponse | null => {
  const savedUser = sessionStorage.getItem(USER_KEY);
  if (!savedUser) return null;
  try {
    return JSON.parse(savedUser) as LoginResponse;
  } catch {
    return null;
  }
}

export const loadToken = (): string | null => {
  const savedToken = sessionStorage.getItem(TOKEN_KEY);
  return savedToken ?? null;
}

export const clearUser = () => {
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}
