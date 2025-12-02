import React from "react";
import type { LoginFormState } from "../viewmodels/userLoginViewModel";

interface LoginViewProps {
  state: LoginFormState;
  onChangeLoginId: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginView = ({
  state,
  onChangeLoginId,
  onChangePassword,
  onSubmit,
}: LoginViewProps) => {
  const { loginId, password, loading, error } = state;

  return (
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h2 style={{ marginBottom: 24 }}>TaskFlow 로그인</h2>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            아이디
            <input
              type="text"
              value={loginId}
              onChange={(e) => onChangeLoginId(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 8,
          }}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

export default LoginView;