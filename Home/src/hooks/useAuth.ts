// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { loadUser } from "../utils/AuthStorage";
import type { LoginResponse } from "../data/response/LoginResponse";

export const useAuth = () => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = loadUser();
    if (saved) {
      setUser(saved);
    }
    setLoading(false);
  }, []);

  return { user, loading, setUser };
}
