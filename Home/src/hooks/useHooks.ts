import { useEffect, useState } from "react";

// user 예시:
// {
//   id: 1,
//   name: "홍길동",
//   role: "ADMIN",
//   token: "...""
// }

interface User {
  id: number;
  name: string;
  role: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 사용자 정보 복원
    const savedUser = localStorage.getItem("taskflow_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  return { user, loading };
}
