package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class IssueStatusDef extends BaseTemplateItem{
    @Schema(description = "기본 상태 여부", example = "true")
    private Boolean isDefault;
}
