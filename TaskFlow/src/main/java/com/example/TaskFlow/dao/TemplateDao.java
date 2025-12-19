package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.request.template.CreateProjectTemplateRequest;
import com.example.TaskFlow.model.response.template.ProjectTemplatesResponse;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateDao {
    private static final String NAMESPACE = "TemplateMapper";

    private final SqlSessionTemplate sqlSessionTemplate;

    public TemplateDao(
            SqlSessionTemplate sqlSessionTemplate
    ) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<ProjectTemplatesResponse> findAllTemplates() {
        return sqlSessionTemplate.selectList(NAMESPACE + "findAllTemplate");
    }

    public void insertTemplate(CreateProjectTemplateRequest createProjectTemplateRequest) {
        sqlSessionTemplate.insert(NAMESPACE + "insertTemplate");
    }
}
