package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.response.account.TaskAccountResponse;

public class AccountDao {

    public TaskAccountResponse getAccountInfo(String accountId) {
        private static final String NAMESPACE = "TaskFlowAccountMapper.";



        return sqlSessionTemplate.selectOne(NAMESPACE.concat("selectAccountById"), accountId);
    }
}
