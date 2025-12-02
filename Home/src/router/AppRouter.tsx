// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AppLayout from "@/components/layout/AppLayout";
// import LoginPage from "@/pages/auth/LoginPage";
// import DashboardPage from "@/pages/dashboard/DashboardPage";
// import ProjectListPage from "@/pages/projects/ProjectListPage";
// import ProjectDetailPage from "@/pages/projects/ProjectDetailPage";
// import TicketListPage from "@/pages/tickets/TicketListPage";
// import TicketDetailPage from "@/pages/tickets/TicketDetailPage";
// import UserListPage from "@/pages/admin/users/UserListPage";
// import RoleListPage from "@/pages/admin/roles/RoleListPage";
// import ActivityLogPage from "@/pages/admin/logs/ActivityLogPage";
// import MySettingsPage from "@/pages/settings/MySettingsPage";
// import AccessDeniedPage from "@/pages/error/AccessDeniedPage";
// import NotFoundPage from "@/pages/error/NotFoundPage";
// import PrivateRoute from "@/components/auth/PrivateRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 비로그인 */}
        <Route path="/login" element={<LoginView />} />

        {/* 로그인 이후 레이아웃 */}
        <Route
          path="/"
          element={
            <PrivateRoute roles={["USER", "MANAGER", "ADMIN"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Projects */}
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />

          {/* Tickets */}
          <Route path="tickets" element={<TicketListPage />} />
          <Route path="tickets/:ticketId" element={<TicketDetailPage />} />

          {/* Admin */}
          <Route
            path="admin/users"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <UserListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/roles"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <RoleListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/logs"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <ActivityLogPage />
              </PrivateRoute>
            }
          />

          {/* Settings */}
          <Route path="settings" element={<MySettingsPage />} />
        </Route>

        {/* 오류 페이지 */}
        <Route path="/403" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
