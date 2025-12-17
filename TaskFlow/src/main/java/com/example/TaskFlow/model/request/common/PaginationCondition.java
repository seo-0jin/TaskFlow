package com.example.TaskFlow.model.request.common;

import lombok.Data;

@Data
public class PaginationCondition {
    /**
     * 0-base page index
     * 프론트에서 page를 0,1,2... 로 넘겨준다고 가정
     */
    private Integer page;
    private Integer size;
    private Integer offset;
}
