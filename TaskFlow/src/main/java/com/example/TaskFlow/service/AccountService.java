package com.example.TaskFlow.service;

import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.common.exception.TaskFlowBadRequestException;
import com.example.TaskFlow.dao.AccountDao;
import com.example.TaskFlow.model.request.AuthenticationRequest;
import com.example.TaskFlow.model.request.SignUpRequest;
import com.example.TaskFlow.model.response.account.LoginResponse;
import com.example.TaskFlow.model.response.account.TaskAccountResponse;
import com.example.TaskFlow.utils.ApiResponseUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountDao accountDao;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountDao accountDao, PasswordEncoder passwordEncoder) {
        this.accountDao = accountDao;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(AuthenticationRequest loginRequest) throws TaskFlowBadRequestException {
        String id = loginRequest.getLoginId();
        String password = loginRequest.getPassword();

        TaskAccountResponse accountInfo = accountDao.getAccountInfo(id);

        if (accountInfo == null) {
            throw new TaskFlowBadRequestException(ErrorCode.LOGIN_FAILED,
                    "아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        if (!password.equals(accountInfo.getPassword())) {
            throw new TaskFlowBadRequestException(
                    ErrorCode.LOGIN_FAILED,
                    "아이디 또는 비밀번호가 일치하지 않습니다."
            );
        }

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setLoginId(accountInfo.getLoginId());
        loginResponse.setName(accountInfo.getName());
        loginResponse.setPhone(accountInfo.getPhone());
        loginResponse.setRoleCode(accountInfo.getRoleCode());
        loginResponse.setStatus(accountInfo.getStatus());
        loginResponse.setLastLoginAt(accountInfo.getLastLoginAt());
        loginResponse.setCreatedAt(accountInfo.getCreatedAt());
        loginResponse.setUpdatedAt(accountInfo.getUpdatedAt());

        return loginResponse;
    }

    // 회원가입 중복 검사
    public boolean existsByLoginId(String loginId) throws TaskFlowBadRequestException {
        return accountDao.getExistsByLoginId(loginId);
    }

    public void signUp(SignUpRequest request) throws TaskFlowBadRequestException {
        String loginId = request.getLoginId();

        if (existsByLoginId(loginId)) {
            throw new TaskFlowBadRequestException(
                    ErrorCode.DUPLICATED_LOGIN_ID,
                    "이미 사용 중인 아이디입니다."
            );
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        TaskAccountResponse accountInfo = new TaskAccountResponse();
        accountInfo.setLoginId(loginId);
        accountInfo.setPassword(encodedPassword);
        accountInfo.setName(request.getName());
        accountInfo.setPhone(request.getPhone());
        accountInfo.setRoleCode(request.getRoleCode() != null ? request.getRoleCode() : "USER");

        int inserted = accountDao.insertAccount(accountInfo);

        if (inserted != 1) {
            throw new TaskFlowBadRequestException(
                    ErrorCode.SIGNUP_FAILED,
                    "회원가입 처리 중 오류가 발생했습니다."
            );
        }
    }
}
