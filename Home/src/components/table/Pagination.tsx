import styles from "@/scss/base.module.scss";

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

type PaginationProps = {
  pageInfo: PageInfo;
  onChangePage: (page: number) => void;
  onChangeSize: (size: number) => void;
};

const PAGE_SIZES = [10, 20, 50];

const Pagination = ({
  pageInfo,
  onChangePage,
  onChangeSize,
}: PaginationProps) => {
  const { page, totalPages, size } = pageInfo;

  // 현재 페이지 기준 앞/뒤 4개
  const pageNumbers = getPageRangeAround(page, totalPages, 4);

  return (
    <div className={styles.pagination_container}>
      <div className={styles.pagination}>
        {/* page size */}
        <select
          value={size}
          onChange={(e) => onChangeSize(Number(e.target.value))}
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}개씩
            </option>
          ))}
        </select>

        {/* 이전 */}
        <button disabled={page === 1} onClick={() => onChangePage(page - 1)}>
          이전
        </button>

        {/* 페이지 번호 */}
        <div className={styles.page_numbers}>
          {pageNumbers.map((p) => (
            <button
              key={p}
              className={p === page ? styles.active : ""}
              onClick={() => onChangePage(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* 다음 */}
        <button
          disabled={page === totalPages}
          onClick={() => onChangePage(page + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const getPageRangeAround = (
  currentPage: number,
  totalPages: number,
  range = 4
) => {
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export default Pagination;
