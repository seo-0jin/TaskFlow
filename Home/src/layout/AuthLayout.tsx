import type { ReactNode } from "react";
import styles from "../scss/authLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className={styles["auth-layout"]}>{children}</div>;
};

export default AuthLayout;
