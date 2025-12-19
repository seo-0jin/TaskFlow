// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RoutePath } from "../const/RoutePath";
import AuthPage from "../pages/AuthPage";
import PrivateRoute from "./PrivateRoute";
import DashBoardPage from "../pages/DashBoardPage";
import MainLayout from "../layout/MainLayout";
import LayoutWithSidebar from "../layout/LayoutWithSidebar";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export default function AppRouter() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return <div>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<Navigate to={RoutePath.LOGIN} replace />} /> */}
          <Route
            index
            element={
              hydrated ? (
                <Navigate to={RoutePath.DASHBOARD} replace />
              ) : (
                <Navigate to={RoutePath.LOGIN} replace />
              )
            }
          />

          {/* 로그인 페이지 */}
          <Route path={RoutePath.LOGIN} element={<AuthPage />} />

          {/* 대시보드 */}
          <Route path={RoutePath.DASHBOARD} element={<DashBoardPage />} />
          {/* 사이드바 포함 보호 영역 */}
          <Route
            element={
              <PrivateRoute>
                <LayoutWithSidebar />
              </PrivateRoute>
            }
          >
            {/* 추후 페이지들 여기로 */}
            {/* <Route path={RoutePath.ISSUES} element={<IssueListPage />} /> */}
          </Route>

          {/* 보호된 페이지 (로그인 필요) */}
          {/* 대시보드 */}
          {/* ADMIN만 접근 가능한 예시 */}
          {/* <Route
          path={RoutePath.ADMIN}
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          }
        /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
