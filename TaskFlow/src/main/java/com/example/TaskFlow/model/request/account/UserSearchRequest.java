package com.example.TaskFlow.model.request.account;

import com.example.TaskFlow.model.request.common.PaginationCondition;
import lombok.Data;

@Data
public class UserSearchRequest extends PaginationCondition {
    private String loginId;
    private String name;
    private String roleCode;
}
