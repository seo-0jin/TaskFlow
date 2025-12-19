import styles from "@/scss/base.module.scss";

export interface TableColumn<T> {
  key: string;
  title: string;
  width?: number | string;
  align?: "left" | "center" | "right";

  render?: (row: T) => React.ReactNode;
}

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
};

const TableComp = <T,>({ columns, data, rowKey }: TableProps<T>) => {
  return (
    <div className={styles.table_wrap}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>데이터가 없습니다.</td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComp;
