// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RoutePath } from "../const/RoutePath";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route
          path={RoutePath.LOGIN}
          element={
            user ? <Navigate to={RoutePath.DASHBOARD} replace /> : <LoginPage />
          }
        />
        {/* 회원가입 페이지 */}
        <Route path={RoutePath.SIGNUP} element={<SignUpPage />} />

        {/* 보호된 페이지 (로그인 필요) */}
        {/* <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        /> */}
        {/* 기본 루트 처리 */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
