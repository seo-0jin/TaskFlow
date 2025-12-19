import styles from "@/scss/layout.module.scss";

const SidebarLayout = () => {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_box}>
        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>프로젝트</h2>
          <li className={styles.sidebar_item}>새 프로젝트 생성</li>
          <li className={styles.sidebar_item}>이슈 관리</li>
          <li className={styles.sidebar_item}>일정 / 진행상황</li>
          <li className={styles.sidebar_item}>문서 / 설명</li>
          <li className={styles.sidebar_item}>팀 / 권한</li>
        </ul>
        <div className={styles.sidebar_divider}></div>
        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>내 설정</h2>
          <li className={styles.sidebar_item}>개인정보 수정</li>
          <li className={styles.sidebar_item}>내 프로젝트</li>
        </ul>
        <div className={styles.sidebar_divider}></div>
        <ul className={styles.sidebar_subgroup}>
          <h2 className={styles.sidebar_subheader}>시스템 관리</h2>
          <li className={styles.sidebar_item}>사용자 관리</li>
          <li className={styles.sidebar_item}>역할 / 권한</li>
          <li className={styles.sidebar_item}>프로젝트 템플릿</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLayout;
