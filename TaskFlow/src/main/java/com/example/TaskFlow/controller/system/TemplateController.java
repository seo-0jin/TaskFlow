package com.example.TaskFlow.controller.system;

import com.example.TaskFlow.common.conf.PathConf;
import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.model.request.template.ProjectTemplateRequest;
import com.example.TaskFlow.model.response.common.ApiResponse;
import com.example.TaskFlow.model.response.template.ProjectTemplatesResponse;
import com.example.TaskFlow.service.TemplateService;
import com.example.TaskFlow.utils.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(PathConf.API + PathConf.PROJECT_TEMPLATE)
public class TemplateController {
    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @Operation(summary = "템플릿 목록", description = "템플릿 목록")
    @RequestMapping(value = PathConf.TEMPLATE_LIST, method = RequestMethod.GET)
    public ResponseEntity<ApiResponse<List<ProjectTemplatesResponse>>> templateList() {
        log.info("[Template] templateList called");

        List<ProjectTemplatesResponse> templateList = templateService.getTemplateList();

        return ApiResponseUtil.ok(templateList);
    }

    @Operation(summary = "템플릿 생성", description = "템플릿 생성")
    @RequestMapping(value = PathConf.CREATE_TEMPLATE, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Void>> createTemplate(
            @RequestBody
            ProjectTemplateRequest request) {
        log.info("[Template] createTemplate called. name={}", request.getName());
        log.info("[Template request getConfigJson().getClass()] createTemplate called. {}", request.getConfigJson().getClass());

        templateService.createTemplate(request);

        ApiResponse<Void> body = ApiResponse.<Void>builder()
                .status(String.valueOf(HttpStatus.OK.value()))
                .code(ErrorCode.SUCCESS.getCode())
                .message("템플릿이 생성되었습니다.")
                .data(null)
                .build();

        return ResponseEntity.ok(body);
    }
}
