import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import styles from "@/scss/layout.module.scss";

const LayoutWithSidebar = () => {
  return (
    <>
      <SidebarLayout />

      <main className={styles.content_area}>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutWithSidebar;
