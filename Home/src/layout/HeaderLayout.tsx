import styles from "@/scss/layout.module.scss";
import Button from "../components/common/Button";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const goToDashBoard = () => {
    navigate("/dashboard", { replace: true });
  }

  const user = useAuthStore((s) => s.user);

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <img src="/public/icons/project-pulse-logo.png" alt="" onClick={goToDashBoard}/>
      </div>
      <div className={styles.header_right}>
        <Button
          text="Logout"
          variant="text"
          size="small"
          onClick={handleLogout}
          hidden={!user}
          showArrow
        />
      </div>
    </header>
  );
};

export default HeaderLayout;
