// src/components/layout/SidebarLayout.tsx
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

const LayoutWithSidebar = () => {
  return (
    <>
      <SidebarLayout />

      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutWithSidebar;
