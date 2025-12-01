package com.example.TaskFlow.model.response.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "필드 유효성 검증 실패 응답")
public class ValidationErrorsResponse {
    @Schema(description = "유효성 검증 실패 필드 목록")
    private List<ValidationErrorResponse> errors;
}
