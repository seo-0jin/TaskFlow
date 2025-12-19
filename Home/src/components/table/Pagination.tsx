export interface PageInfo {
  page: number;        // 현재 페이지 (1-base)
  size: number;        // 페이지당 건수
  totalElements: number;
  totalPages: number;
}

type PaginationProps = {
  pageInfo: PageInfo;
  onChangePage: (page: number) => void;
  onChangeSize: (size: number) => void;
};

const PAGE_SIZES = [10, 20, 50];

export default function Pagination({
  pageInfo,
  onChangePage,
  onChangeSize,
}: PaginationProps) {
  const { page, totalPages, size } = pageInfo;

  return (
    <div className="pagination">
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

      {/* page buttons */}
      <button disabled={page === 1} onClick={() => onChangePage(page - 1)}>
        이전
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        다음
      </button>
    </div>
  );
}
