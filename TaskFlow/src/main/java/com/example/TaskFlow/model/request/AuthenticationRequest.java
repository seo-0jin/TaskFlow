package com.example.TaskFlow.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "로그인 요청 정보")
public class AuthenticationRequest {
    @Schema(description = "로그인 아이디")
    private String id;
    @Schema(description = "로그인 비밀번호")
    private String password;
}
