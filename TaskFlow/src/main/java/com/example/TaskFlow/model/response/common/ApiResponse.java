package com.example.TaskFlow.model.response.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder(builderClassName = "Builder")
@Schema(description = "Rest API 공통 Response")
public class ApiResponse<T> {
    @Schema(description = "Rest API 응답 코드", example = "200")
    private String status;
    @Schema(description = "Rest API 응답 에러코드", example = "1000100001")
    private String code;
    @Schema(description = "Rest API 응답 에러메시지", example = "No account exists")
    private String message;
    @Schema(description = "Rest API 응답 Body")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public ApiResponse(String status, String code, String message, T data) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
