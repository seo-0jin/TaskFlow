package com.example.TaskFlow.model.response.template;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class RoleDef {
    @Schema(example = "PM")
    private String code;

    @Schema(example = "PM")
    private String name;

    @Schema(example = "1")
    private Integer order;
}
