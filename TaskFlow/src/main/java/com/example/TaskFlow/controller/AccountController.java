package com.example.TaskFlow.controller;

import com.example.TaskFlow.common.conf.PathConf;
import com.example.TaskFlow.define.TaskDefine;
import com.example.TaskFlow.model.request.AuthenticationRequest;
import com.example.TaskFlow.model.request.SignUpRequest;
import com.example.TaskFlow.model.response.account.LoginResponse;
import com.example.TaskFlow.model.response.common.ApiResponse;
import com.example.TaskFlow.service.AccountService;
import com.example.TaskFlow.utils.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(PathConf.API)
public class AccountController {
    public static String DASHBOARD_URL = "";

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
        this.DASHBOARD_URL = TaskDefine.DASHBOARD_URL;
    }

    @Operation(summary = "로그인", description = "로그인. ID/PW를 입력하여 인증한다.")
    @RequestMapping(value = PathConf.LOGIN, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Object>> login(HttpServletRequest request,
                                                     @RequestBody
                                                     AuthenticationRequest loginRequest) {
        try {
            LoginResponse privateLoginResponse = accountService.login(loginRequest);
            // 2. 로그인 성공 시, 세션 생성
            HttpSession existingSession = request.getSession(false);
            if (existingSession != null) {
                existingSession.invalidate();
            }
            HttpSession session = request.getSession(true);

            session.setAttribute("accountId", privateLoginResponse.getLoginId());
            session.setAttribute("role", privateLoginResponse.getRoleCode());
            session.setAttribute(
                    org.springframework.session.FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME,
                    privateLoginResponse.getLoginId()
            );

            return ApiResponseUtil.ok(DASHBOARD_URL);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(summary = "아이디 중복 검사", description = "아이디 중복 검사")
    @RequestMapping(value = PathConf.CHECK_LOGIN_ID, method = RequestMethod.GET)
    public ResponseEntity<?> checkLoginId(@RequestParam String loginId) {
        boolean exists = accountService.existsByLoginId(loginId);

        return ApiResponseUtil.ok(exists);
    }

    @Operation(summary = "회원가입", description = "회원가입")
    @RequestMapping(value = PathConf.SIGNUP, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Object>> signUp(
            @RequestBody
            SignUpRequest signUpRequest) {
        try {
            accountService.signUp(signUpRequest);
            return ApiResponseUtil.ok("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
