package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.response.PositionResponse;
import com.example.TaskFlow.model.response.RoleResponse;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MetaDataDao {
    private static final String NAMESPACE = "MetaDataMapper.";

    private final SqlSessionTemplate sqlSessionTemplate;

    public MetaDataDao(
            SqlSessionTemplate sqlSessionTemplate
    ) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<PositionResponse> findAllPositions() {
        return sqlSessionTemplate.selectList(NAMESPACE + "findAllPositions");
    }

    public List<RoleResponse> findAllRoles() {
        return sqlSessionTemplate.selectList(NAMESPACE + "findAllRoles");
    }
}
