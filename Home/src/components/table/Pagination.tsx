import styles from '@/scss/base.module.scss';

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
const MAX_PAGE_BUTTONS = 11;

const Pagination = ({ pageInfo, onChangePage, onChangeSize }: PaginationProps) => {
  const { page, totalPages, size, totalElements } = pageInfo;

  // 현재 페이지 기준 앞/뒤 4개
  const pageNumbers = getCenteredPageRange(page, totalPages, MAX_PAGE_BUTTONS);

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <div className={styles.pagination_container}>
      <div className={styles.pagination}>
        <span>총 {totalElements}</span>

        {/* 맨앞 */}
        <button disabled={isFirst} onClick={() => onChangePage(1)}>
          «
        </button>

        {/* 이전 */}
        <button disabled={page === 1} onClick={() => onChangePage(page - 1)}>
          ‹
        </button>

        {/* 페이지 번호 */}
        <div className={styles.page_numbers}>
          {pageNumbers.map((p) => (
            <button key={p} className={p === page ? styles.active : ''} onClick={() => onChangePage(p)}>
              {p}
            </button>
          ))}
        </div>

        {/* 다음 */}
        <button disabled={page === totalPages} onClick={() => onChangePage(page + 1)}>
          ›
        </button>

        {/* 맨끝 */}
        <button disabled={isLast} onClick={() => onChangePage(totalPages)}>
          »
        </button>
      </div>
      
      {/* page size */}
      <select className={styles.select_size} value={size} onChange={(e) => onChangeSize(Number(e.target.value))}>
        {PAGE_SIZES.map((s) => (
          <option key={s} value={s}>
            {s}개씩
          </option>
        ))}
      </select>
    </div>
  );
};

const getCenteredPageRange = (currentPage: number, totalPages: number, maxButtons = 11) => {
  if (totalPages <= 0) return [];
  if (maxButtons <= 0) return [];

  const count = Math.min(totalPages, maxButtons);
  const half = Math.floor(count / 2);

  let start = currentPage - half;
  let end = currentPage + half;

  // count가 짝수일 때(혹시) 균형 맞추기
  if (count % 2 === 0) end = currentPage + half - 1;

  // start/end 보정
  if (start < 1) {
    start = 1;
    end = start + count - 1;
  }
  if (end > totalPages) {
    end = totalPages;
    start = end - count + 1;
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export default Pagination;
