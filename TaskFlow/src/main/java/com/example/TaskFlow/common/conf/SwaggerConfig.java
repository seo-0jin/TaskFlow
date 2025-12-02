package com.example.TaskFlow.common.conf;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI taskFlowOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TaskFlow API")
                        .description("TaskFlow 프로젝트의 프로젝트/티켓/사용자 관리 API 문서입니다.")
                        .version("v1.0.0"));
    }

    @Bean
    public GroupedOpenApi taskApi() {
        return GroupedOpenApi.builder()
                .group("taskapi")
                .pathsToMatch("/api/**")   // 예: /api/** 아래 API만 이 그룹으로
                .build();
    }
}
