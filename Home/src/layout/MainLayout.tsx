import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <HeaderLayout />
      <main>
        <Outlet />
      </main>
      <FooterLayout />
    </>
  );
};

export default MainLayout;
