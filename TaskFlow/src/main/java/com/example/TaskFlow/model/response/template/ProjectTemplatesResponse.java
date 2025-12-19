package com.example.TaskFlow.model.response.template;

import com.example.TaskFlow.model.response.common.TemplateConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public class ProjectTemplatesResponse {
    @Schema(description = "템플릿 id")
    @JsonProperty("id")
    String id;

    @Schema(description = "템플릿명")
    @JsonProperty("name")
    String name;

    @Schema(description = "템플릿 설명")
    @JsonProperty("description")
    String description;

    @Schema(description = "상태/권한 등 통째로 저장")
    @JsonProperty("config_json")
    TemplateConfig configJson;

    @Schema(description = "업데이트 시간")
    @JsonProperty("updated_at")
    String updatedAt;
}
