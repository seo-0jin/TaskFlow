import styles from "@/scss/layout.module.scss";
import Button from "../components/common/Button";

const HeaderLayout = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <img src="/public/icons/project-pulse-logo.png" alt="" />
      </div>
      <div>
        <Button text="로그아웃" size="small"></Button>
      </div>
    </header>
  );
};

export default HeaderLayout;
