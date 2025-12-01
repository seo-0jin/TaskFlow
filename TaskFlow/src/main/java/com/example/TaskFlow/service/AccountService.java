package com.example.TaskFlow.service;

import com.example.TaskFlow.common.exception.TaskFlowBadRequestException;
import com.example.TaskFlow.model.request.AuthenticationRequest;
import com.example.TaskFlow.model.response.account.LoginResponse;

public class AccountService {
    public LoginResponse login(AuthenticationRequest loginRequest) throws TaskFlowBadRequestException {
        String id = loginRequest.getId();
        String password = loginRequest.getPassword();


    }
}
