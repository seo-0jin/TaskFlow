package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class IssueTypeDef extends BaseTemplateItem {
    @Schema(description = "icon", example = "👌")
    private String icon;
}
