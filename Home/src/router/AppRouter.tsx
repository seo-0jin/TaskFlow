// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import DashboardPage from "../pages/DashboardPage";
import { useAuth } from "../hooks/useAuth";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

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
