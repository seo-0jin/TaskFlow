package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.response.account.TaskAccountResponse;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

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

    public boolean getExistsByLoginId(String accountId) {
        return sqlSessionTemplate.selectOne(NAMESPACE.concat("existsByLoginId"), accountId);
    }

    public int insertAccount(TaskAccountResponse accountInfo) {
        Map<String, Object> params = new HashMap<>();
        params.put("loginId", accountInfo.getLoginId());
        params.put("password", accountInfo.getPassword());
        params.put("name", accountInfo.getName());
        params.put("email", accountInfo.getEmail());
        params.put("phone", accountInfo.getPhone());
        params.put("roleCode", accountInfo.getRoleCode());

        return sqlSessionTemplate.insert(NAMESPACE.concat("insertAccount"), params);
    }
}
