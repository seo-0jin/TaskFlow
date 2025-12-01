package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.response.account.TaskAccountResponse;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDao {
    private static final String NAMESPACE = "TaskFlowAccountMapper.";

    private final SqlSessionTemplate sqlSessionTemplate;

    public AccountDao(
            SqlSessionTemplate sqlSessionTemplate
    ) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public TaskAccountResponse getAccountInfo(String accountId) {
        return sqlSessionTemplate.selectOne(NAMESPACE.concat("selectAccountById"), accountId);
    }
}
