package com.example.TaskFlow.model.request.template;

import com.example.TaskFlow.model.response.template.TemplateConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ProjectTemplateRequest {
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

    @Schema(description = "작성 시간")
    @JsonProperty("created_at")
    String createdAt;

    @Schema(description = "템플릿 생성한 사람")
    @JsonProperty("created_by")
    String createdBy;

    @Schema(description = "업데이트 시간")
    @JsonProperty("updated_at")
    String updatedAt;
}
