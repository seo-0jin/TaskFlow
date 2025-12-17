package com.example.TaskFlow.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {
    private static final String NAMESPACE = "TaskFlowUserMapper.";

    private final SqlSessionTemplate sqlSessionTemplate;

    public UserDao(
            SqlSessionTemplate sqlSessionTemplate
    ) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
