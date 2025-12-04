// src/store/useAuthStore.ts
import { create } from "zustand";
import type { LoginResponse } from "../data/response/LoginResponse";
import { clearUser, loadToken, loadUser, saveUser } from "../utils/AuthStorage";

interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  login: (user: LoginResponse) => void;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  // 로그인 시 — 상태 + storage에 저장
  login: (user) => {
    saveUser(user); // sessionStorage 저장
    set({ user, token: user.token });
  },

  // 로그아웃 시 — 상태 + storage 삭제
  logout: () => {
    clearUser();
    set({ user: null, token: null });
  },

  // 새로고침 시 — storage → store 복원
  restore: () => {
    const storedUser = loadUser();
    const storedToken = loadToken();
    set({ user: storedUser, token: storedToken });
  },
}));
