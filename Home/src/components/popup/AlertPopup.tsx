import styles from "@/scss/base.module.scss";
import Button from "../common/Button";

type AlertPopupProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
};

export const AlertPopup = ({ open, message, onConfirm }: AlertPopupProps) => {
  if (!open) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.bg_wrap}></div>
      <div className={`${styles.layerpop} ${styles.pop_small}`}>
        <div className={styles.pophead}>
          <h3 className={styles.pophead_tit}></h3>
        </div>
        <div className={styles.popbody}>
          <p className={styles.pop_desc}>{message}</p>
        </div>
        <div className={styles.popfoot}>
          <Button text={"확인"} onConfirm={onConfirm}></Button>
        </div>
      </div>
    </div>
  );
};
