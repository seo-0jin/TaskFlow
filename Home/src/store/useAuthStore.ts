// src/store/useAuthStore.ts
import { create } from "zustand";
import type { LoginResponse } from "../data/response/LoginResponse";
import { clearUser, loadToken, loadUser, saveUser } from "../utils/AuthStorage";
import { loginService } from "../service/LoginService";

interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  hydrated: boolean;

  login: (user: LoginResponse) => void;
  logout: () => Promise<void>;
  restore: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(),
  token: loadToken(),
  hydrated: false, // 아직 초기화 안 됨

  hydrate: () => {
    set({
      user: loadUser(),
      token: loadToken(),
      hydrated: true,
    });
  },


  // 로그인 시 — 상태 + storage에 저장
  login: (user) => {
    saveUser(user); // sessionStorage 저장
    set({ user, token: user.token });
  },

  // 로그아웃 시 — 상태 + storage 삭제
  logout: async () => {
    try {
      await loginService.logout();
    } catch (e) {
      console.warn("logout api failed", e);
    } finally {
      clearUser();
      set({ user: null, token: null });
    }

  },

  // 새로고침 시 — storage → store 복원
  restore: () => {
    set({ user: loadUser(), token: loadToken() });
  },
}));
