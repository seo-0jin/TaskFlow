import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginViewModel } from "../viewmodels/userLoginViewModel";
import AuthLayout from "../layout/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state, setLoginId, setPassword, submit } = useLoginViewModel();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = await submit();

    if (user) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="login-wrapper">
        <h2>로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={state.loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={state.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {state.error && <p className="error">{state.error}</p>}

        <button type="submit" disabled={state.loading}>
          {state.loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
