package com.example.TaskFlow.model.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public class CreateProjectTemplateParam {
    @Schema(description = "템플릿명")
    @JsonProperty("name")
    private String name;

    @Schema(description = "템플릿 설명")
    @JsonProperty("description")
    private String description;

    @Schema(description = "템플릿 상태, 권한 등")
    @JsonProperty("config_json")
    private String configJson;   // JSON 문자열

    @Schema(description = "템플릿 생성자")
    @JsonProperty("created_by")
    private Long createdBy;
}
