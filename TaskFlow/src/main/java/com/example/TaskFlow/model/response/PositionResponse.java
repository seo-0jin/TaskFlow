package com.example.TaskFlow.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "직위 정보")
public class PositionResponse {
    private String positionCode;
    private String nameKo;
    private String descrition;
    private int level;
}
