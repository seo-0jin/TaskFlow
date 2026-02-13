package com.example.TaskFlow.dao;

import com.example.TaskFlow.model.request.template.ProjectTemplateRequest;
import com.example.TaskFlow.model.response.template.ProjectTemplatesResponse;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateDao {
    private static final String NAMESPACE = "TemplateMapper.";

    private final SqlSessionTemplate sqlSessionTemplate;

    public TemplateDao(
            SqlSessionTemplate sqlSessionTemplate
    ) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<ProjectTemplatesResponse> findAllTemplates() {
        return sqlSessionTemplate.selectList(NAMESPACE.concat("findAllTemplate"));
    }

    public boolean getExistsByTemplateName(String templateName) {
        return sqlSessionTemplate.selectOne(NAMESPACE.concat("countByTemplate"), templateName);
    }

    public int insertTemplate(ProjectTemplatesResponse request) {
        return sqlSessionTemplate.insert(NAMESPACE.concat("insertTemplate"), request);
    }
}
