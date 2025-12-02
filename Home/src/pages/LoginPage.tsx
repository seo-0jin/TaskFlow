// src/pages/LoginPage.tsx
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginView from "../view/LoginView";
import { useLoginViewModel } from "../viewmodels/userLoginViewModel";
import AuthLayout from "../layout/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state, setLoginId, setPassword, submit } = useLoginViewModel();

  // 이미 로그인 상태면 대시보드로
  if (user) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loggedInUser = await submit();
    if (loggedInUser) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout>
      <LoginView
        state={state}
        onChangeLoginId={setLoginId}
        onChangePassword={setPassword}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default LoginPage;
