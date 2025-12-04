// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RoutePath } from "../const/RoutePath";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import DashBoardPage from "../pages/DashBoardPage";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path={RoutePath.LOGIN} element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path={RoutePath.SIGNUP} element={<SignUpPage />} />

        {/* 보호된 페이지 (로그인 필요) */}
        {/* 대시보드 */}
        <Route
          path={RoutePath.DASHBOARD}
          element={
            <PrivateRoute>
              <DashBoardPage />
            </PrivateRoute>
          }
        />
        {/* ADMIN만 접근 가능한 예시 */}
        {/* <Route
          path={RoutePath.ADMIN}
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          }
        /> */}
        {/* 기본 루트 처리 */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <LoginPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
