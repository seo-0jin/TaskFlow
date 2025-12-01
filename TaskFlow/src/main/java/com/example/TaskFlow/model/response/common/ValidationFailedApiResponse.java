package com.example.TaskFlow.model.response.common;

import com.example.TaskFlow.common.error.ErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.HttpStatus;

@Schema(description = "Validation 실패 응답")
public class ValidationFailedApiResponse extends ApiResponse<ValidationErrorsResponse>{
    @Schema(description = "Rest API 응답 코드", example = "400")
    protected String status;

    @Schema(description = "Rest API 응답 에러코드", example = "4000100001")
    protected String code;

    @Schema(description = "Rest API 응답 에러메시지", example = "Validation failed for one or more fields.")
    protected String message;

    public ValidationFailedApiResponse(ErrorCode code, ValidationErrorsResponse data) {
        // @formatter:off
        super(
                String.valueOf(HttpStatus.BAD_REQUEST.value()),
                code.getCode(),
                code.getMessage(),
                data
        );
        // @formatter:on
    }
}
