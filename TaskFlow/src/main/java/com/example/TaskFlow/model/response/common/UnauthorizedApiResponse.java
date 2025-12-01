package com.example.TaskFlow.model.response.common;

import com.example.TaskFlow.common.error.ErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.HttpStatus;

@Schema(description = "로그인 계정 확인 실패 응답", allOf = {ApiResponse.class})
public class UnauthorizedApiResponse extends ApiResponse<Object> {
    @Schema(description = "Rest API 응답 코드", example = "401")
    protected String status;

    @Schema(description = "Rest API 응답 에러코드", example = "4010300005")
    protected String code;

    @Schema(description = "Rest API 응답 에러메시지", example = "Expired session.")
    protected String message;

    public UnauthorizedApiResponse() {
        // @formatter:off
        super(
                String.valueOf(HttpStatus.UNAUTHORIZED.value()),
                ErrorCode.EXPIRED_SESSION.getCode(),
                ErrorCode.EXPIRED_SESSION.getMessage(),
                null
        );
        // @formatter:on
    }
}
