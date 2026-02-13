package com.example.TaskFlow.service;

import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.common.exception.TaskFlowBadRequestException;
import com.example.TaskFlow.dao.TemplateDao;
import com.example.TaskFlow.model.request.template.ProjectTemplateRequest;
import com.example.TaskFlow.model.response.template.TemplateConfig;
import com.example.TaskFlow.model.response.template.ProjectTemplatesResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateService {
    private final TemplateDao templateDao;

    public TemplateService(TemplateDao templateDao) {
        this.templateDao = templateDao;
    }

    public List<ProjectTemplatesResponse> getTemplateList() {
        return templateDao.findAllTemplates();
    }

    public boolean existsByTemplateName(String templateName) throws TaskFlowBadRequestException {
        return templateDao.getExistsByTemplateName(templateName);
    }

    public void createTemplate(ProjectTemplateRequest request) throws TaskFlowBadRequestException {
        if (existsByTemplateName(request.getName())) {
            throw new TaskFlowBadRequestException(
                    ErrorCode.DUPLICATED_TEMPLATE_NAME,
                    "이미 사용 중인 템플릿명입니다."
            );
        }

        ProjectTemplatesResponse templateInfo = new ProjectTemplatesResponse();
        templateInfo.setName(request.getName());
        templateInfo.setDescription(request.getDescription());
        templateInfo.setConfigJson(request.getConfigJson());
        templateInfo.setCreatedBy(request.getCreatedBy());

        int inserted = templateDao.insertTemplate(templateInfo);

        if (inserted != 1) {
            throw new TaskFlowBadRequestException(
                    ErrorCode.CREATE_TEMPLATE_FAILED,
                    "템플릿 생성 중 오류가 발생했습니다."
            );
        }
    }
}
