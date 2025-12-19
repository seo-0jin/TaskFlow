// src/hooks/useAuth.ts
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  return {
    user,
    loading: false,
  };
};
