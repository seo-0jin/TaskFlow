package com.example.TaskFlow.model.response.common;

import com.example.TaskFlow.model.request.common.PaginationCondition;
import lombok.Builder;

import java.util.List;

public class PaginationResponse<T> {

    private final int page;              // 현재 페이지 (0-base)
    private final int size;              // 페이지 크기
    private final long totals;           // 전체 데이터 개수
    private final List<T> content;       // 데이터 리스트

    @Builder
    public PaginationResponse(int page,
                              int size,
                              long totals,
                              List<T> content) {

        this.page = page;
        this.size = size;
        this.totals = totals;
        this.content = content;
    }

    public static <T> PaginationResponse<T> of(int page,
                                               int size,
                                               long totals,
                                               List<T> content) {

        return PaginationResponse.<T>builder()
                .page(page)
                .size(size)
                .totals(totals)
                .content(content)
                .build();
    }

    /**
     * PaginationCondition 기반으로 자동 생성하는 메서드
     */
    public static <T> PaginationResponse<T> of(PaginationCondition condition,
                                               long totals,
                                               List<T> content) {
        return of(condition.getPage(), condition.getSize(), totals, content);
    }
}
