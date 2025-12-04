package com.example.TaskFlow.model.response.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "유저 정보")
@Data
public class TaskAccountResponse {
    @Schema(description = "계정 id")
    @JsonProperty("login_id")
    private String loginId;

    @Schema(description = "계정 password")
    @JsonProperty("password")
    private String password;

    @Schema(description = "사용자 이름")
    @JsonProperty("name")
    private String name;

    @Schema(description = "사용자 핸드폰")
    @JsonProperty("phone")
    private String phone;

    @Schema(description = "사용자 권한")
    @JsonProperty("role_code")
    private String roleCode;

    @Schema(description = "계정 상태", example = "ACTIVE | INACTIVE | WITHDRAWN")
    @JsonProperty("status")
    private String status;

    @Schema(description = "계정 생성 시간")
    @JsonProperty("created_at")
    private String createdAt;

    @Schema(description = "계정 수정 시간")
    @JsonProperty("updated_at")
    private String updatedAt;
}
