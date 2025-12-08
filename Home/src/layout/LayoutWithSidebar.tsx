// src/components/layout/SidebarLayout.tsx
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

export default function LayoutWithSidebar() {
  return (
    <div className="page-with-sidebar">
      <SidebarLayout />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
