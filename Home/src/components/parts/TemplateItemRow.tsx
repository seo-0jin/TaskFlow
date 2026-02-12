import type { JSX } from 'react';
import styles from "@/scss/base.module.scss";
import type { BaseItem } from '../../const/ItemContent';

type TemplateItemRowProps = {
  item: BaseItem;
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
        {item.color && (
          <span
            className={styles.color_dot}
            style={{ backgroundColor: item.color }}
          />
        )}
        <input
          type="text"
          className={styles.item_input}
          value={item.name}
          placeholder="상태 이름"
          onChange={(e) => onChangeName?.(item.id, e.target.value)}
        />
        {onChangeColor && (
          <input
            type="color"
            value={item.color ?? "#475569"}
            onChange={(e) => onChangeColor?.(item.id, e.target.value)}
          />
        )}
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
