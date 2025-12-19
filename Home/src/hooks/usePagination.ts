// src/hooks/usePagination.ts
import { useMemo } from "react";
import type { PageInfo } from "../components/table/Pagination";

export function usePagination<T>(
  data: T[],
  pageInfo: PageInfo
) {
  const pagedData = useMemo(() => {
    const startIndex = (pageInfo.page - 1) * pageInfo.size;
    const endIndex = startIndex + pageInfo.size;
    return data.slice(startIndex, endIndex);
  }, [data, pageInfo.page, pageInfo.size]);

  return pagedData;
}
