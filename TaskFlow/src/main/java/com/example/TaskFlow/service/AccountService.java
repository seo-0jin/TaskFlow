package com.example.TaskFlow.service;

import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.common.exception.TaskFlowBadRequestException;
import com.example.TaskFlow.dao.AccountDao;
import com.example.TaskFlow.model.request.AuthenticationRequest;
import com.example.TaskFlow.model.response.account.LoginResponse;
import com.example.TaskFlow.model.response.account.TaskAccountResponse;
import com.example.TaskFlow.utils.ApiResponseUtil;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountDao accountDao;

    public AccountService(AccountDao accountDao) {
        this.accountDao = accountDao;
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
}
