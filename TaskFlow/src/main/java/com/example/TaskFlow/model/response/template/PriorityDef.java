package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class PriorityDef extends BaseTemplateItem{
    @Schema(description = "레벨", example = "3")
    private Integer level;
}
