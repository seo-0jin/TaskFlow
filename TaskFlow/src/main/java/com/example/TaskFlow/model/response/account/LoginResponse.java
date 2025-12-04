package com.example.TaskFlow.model.response.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Schema(description = "로그인 정보 응답")
@Data
public class LoginResponse extends TaskAccountResponse{
    @Schema(description = "JWT 인증 토큰")
    @JsonProperty("token")
    private String token;

    @Schema(description = "세션 UUID")
    @JsonProperty("session_id")
    private String sessionId;

    @Schema(description = "마지막 로그인 시간")
    @JsonProperty("last_login_date")
    private Long lastLoginDate;

    @Schema(description = "Client Ip Addr")
    @JsonProperty("client_ip")
    private String clientIp;
}
