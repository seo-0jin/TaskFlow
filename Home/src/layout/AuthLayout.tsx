import type { ReactNode } from "react";
import styles from "../scss/authLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles["auth-layout"]}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: 380,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
