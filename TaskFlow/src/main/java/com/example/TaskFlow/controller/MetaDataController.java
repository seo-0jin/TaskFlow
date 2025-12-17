package com.example.TaskFlow.controller;

import com.example.TaskFlow.common.conf.PathConf;
import com.example.TaskFlow.model.response.PositionResponse;
import com.example.TaskFlow.model.response.RoleResponse;
import com.example.TaskFlow.model.response.common.ApiResponse;
import com.example.TaskFlow.service.MetaDataService;
import com.example.TaskFlow.utils.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(PathConf.API)
public class MetaDataController {
    private final MetaDataService metaDataService;

    public MetaDataController(MetaDataService metaDataService) {
        this.metaDataService = metaDataService;
    }

    @Operation(summary = "직위 목록", description = "직위 목록")
    @RequestMapping(value = PathConf.POSITIONS, method = RequestMethod.GET)
    public ResponseEntity<ApiResponse<List<PositionResponse>>> positions() {
        List<PositionResponse> positions = metaDataService.getPositionList();

        return ApiResponseUtil.ok(positions);
    }

    @Operation(summary = "권한 목록", description = "권한 목록")
    @RequestMapping(value = PathConf.ROLES, method = RequestMethod.GET)
    public ResponseEntity<ApiResponse<List<RoleResponse>>> roles() {
        List<RoleResponse> roles = metaDataService.getRolesList();

        return ApiResponseUtil.ok(roles);
    }
}
