package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TemplateConfig {
    @Schema(description = "이슈 상태 목록")
    private List<IssueStatusDef> issueStatuses;

    @Schema(description = "이슈 타입 목록")
    private List<IssueTypeDef> issueTypes;

    @Schema(description = "우선순위 목록")
    private List<PriorityDef> priorities;

    @Schema(description = "프로젝트 역할 목록")
    private List<RoleDef> roles;

    @Schema(description = "권한/역할 등")
    private Map<PermissionCode, List<String>> permissions;
}
