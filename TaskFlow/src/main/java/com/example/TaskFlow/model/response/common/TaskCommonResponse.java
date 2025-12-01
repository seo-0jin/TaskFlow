package com.example.TaskFlow.model.response.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "API 기본 응답")
@Data
public class TaskCommonResponse {
    @Schema(description = "설명")
    String description = "OK";
}
