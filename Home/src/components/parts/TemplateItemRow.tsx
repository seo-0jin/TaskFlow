import type { JSX } from 'react';
import type { ItemContent } from "../../const/IssueStatus";
import styles from "@/scss/base.module.scss";

type TemplateItemRowProps = {
  item: ItemContent;
  onChangeName?: (id: string, name: string) => void;
  onChangeColor?: (id: string, color: string) => void;
  onDelete?: (id: string) => void;
};

const TemplateItemRow = ({
  item,
  onChangeName,
  onChangeColor,
  onDelete,
}: TemplateItemRowProps): JSX.Element => {
  return (
    <div className={styles.item_list}>
      <div className={styles.item_content}>
        <input
          type="text"
          className={styles.item_input}
          value={item.name}
          placeholder="상태 이름"
          onChange={(e) => onChangeName?.(item.id, e.target.value)}
        />
        <input
          type="color"
          className={styles.item_color}
          value={item.color}
          onChange={(e) => onChangeColor?.(item.id, e.target.value)}
        />
      </div>
      <button
        type="button"
        className={styles.item_delete}
        onClick={() => onDelete?.(item.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TemplateItemRow;
