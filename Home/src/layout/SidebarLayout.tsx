import styles from "@/scss/layout.module.scss";
import { NavLink } from "react-router-dom";

const SidebarLayout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.sidebar_item} ${isActive ? styles.on : ""}`;

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_box}>
        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>프로젝트</h2>

          <li>
            <NavLink to="/projects/new" className={linkClass}>
              새 프로젝트 생성
            </NavLink>
          </li>

          <li>
            <NavLink to="/issues" className={linkClass}>
              이슈 관리
            </NavLink>
          </li>

          <li>
            <NavLink to="/schedule" className={linkClass}>
              일정 / 진행상황
            </NavLink>
          </li>

          <li>
            <NavLink to="/docs" className={linkClass}>
              문서 / 설명
            </NavLink>
          </li>

          <li>
            <NavLink to="/team" className={linkClass}>
              팀 / 권한
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/projects/update" className={linkClass}>
              프로젝트 설정
            </NavLink>
          </li>
        </ul>

        <div className={styles.sidebar_divider} />

        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>내 설정</h2>

          <li>
            <NavLink to="/me/profile" className={linkClass}>
              개인정보 수정
            </NavLink>
          </li>

          <li>
            <NavLink to="/me/projects" className={linkClass}>
              내 프로젝트
            </NavLink>
          </li>
        </ul>

        <div className={styles.sidebar_divider} />

        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>시스템 관리</h2>

          <li>
            <NavLink to="/system/users" className={linkClass}>
              사용자 관리
            </NavLink>
          </li>

          <li>
            <NavLink to="/system/roles" className={linkClass}>
              역할 / 권한
            </NavLink>
          </li>

          <li>
            <NavLink to="/system/templates" className={linkClass}>
              프로젝트 템플릿
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLayout;
