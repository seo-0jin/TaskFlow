package com.example.TaskFlow.controller;

import com.example.TaskFlow.common.conf.PathConf;
import com.example.TaskFlow.define.TaskDefine;
import com.example.TaskFlow.model.request.AuthenticationRequest;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(PathConf.API)
@Tag(name = "계정 관련 API", description = PathConf.LOGIN)
public class AccountController {
    public static String DASHBOARD_URL = "";

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
        this.DASHBOARD_URL = TaskDefine.DASHBOARD_URL;
    }

    @Operation(summary = "관리자용 로그인", description = "관리자용 SDK 로그인. ID/PW를 입력하여 인증한다.")
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
}
