package com.example.TaskFlow.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "회원가입 요청 정보")
public class SignUpRequest {
    private String loginId;   // 아이디
    private String password;  // 비밀번호
    private String name;      // 이름
    private String email;      // 이메일
    private String phone;     // 전화번호
    private String roleCode;  // ROLE_USER / ROLE_ADMIN 등 (기본값 ROLE_USER로 줄 수도 있음)
}
