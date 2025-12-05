package com.example.TaskFlow.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "권한 정보")
public class RoleResponse {
    private String roleCode;
    private String nameKo;
    private String description;
}
