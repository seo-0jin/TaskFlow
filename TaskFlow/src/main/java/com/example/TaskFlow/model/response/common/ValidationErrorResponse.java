package com.example.TaskFlow.model.response.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(description = "유효성 검증 실패 필드 정보")
public class ValidationErrorResponse {
    @Schema(description = "검증 실패 필드명", example = "campaign_name")
    private String field;
    @Schema(description = "검증 실패 메시지", example = "캠페인명은 필수입니다.")
    private String message;
}
