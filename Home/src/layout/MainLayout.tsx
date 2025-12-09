import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { Outlet } from "react-router-dom";
import styles from "@/scss/base.module.scss";

const MainLayout = () => {
  return (
    <>
      <HeaderLayout />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <FooterLayout />
    </>
  );
};

export default MainLayout;
