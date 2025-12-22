import styles from "@/scss/base.module.scss";
import Button from "../common/Button";
import type { IssueStatusValue } from "../../const/IssueStatus";
import type { ProjectRoleValue } from "../../const/ProjectRole";

type TemplatePopupProps = {
  open: boolean;
  templateName: string;
  description: string;
  issueStatus: IssueStatusValue[];
  roles: ProjectRoleValue[];
  onClick: () => void;
};

export const AlertPopup = ({ open, onClick }: TemplatePopupProps) => {
  if (!open) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.bg_wrap}></div>
      <div className={`${styles.layerpop} ${styles.pop_small}`}>
        <div className={styles.pophead}>
          <h3 className={styles.pophead_tit}></h3>
        </div>
        <div className={styles.popbody}>
          {/* <p className={styles.pop_desc}>{message}</p> */}
        </div>
        <div className={styles.popfoot}>
          <Button text={"확인"} onClick={onClick}></Button>
        </div>
      </div>
    </div>
  );
};
