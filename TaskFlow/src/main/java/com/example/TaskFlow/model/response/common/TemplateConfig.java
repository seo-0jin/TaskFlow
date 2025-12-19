package com.example.TaskFlow.model.response.common;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public class TemplateConfig {
    @Schema(description = "이슈 상태 목록")
    private List<String> issueStatuses;

    @Schema(description = "프로젝트 역할 목록")
    private List<String> projectRoles;

    @Schema(description = "이슈 타입 목록")
    private List<String> issueTypes;

    @Schema(description = "우선순위 목록")
    private List<String> priorities;
}
