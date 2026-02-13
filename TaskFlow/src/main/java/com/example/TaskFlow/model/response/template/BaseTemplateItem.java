package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "템플릿 구성 요소 기본 아이템")
public class BaseTemplateItem {
    @Schema(description = "id")
    private String id;

    @Schema(description = "명칭")
    private String name;

    @Schema(description = "순위")
    private Integer order;

    @Schema(description = "해당 아이템 컬러")
    private String color;
}
