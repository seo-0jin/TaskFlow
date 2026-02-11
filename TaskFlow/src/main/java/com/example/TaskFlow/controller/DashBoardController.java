package com.example.TaskFlow.controller;

import com.example.TaskFlow.common.conf.PathConf;
import com.example.TaskFlow.model.response.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(PathConf.API)
public class DashBoardController {
//
//    @Operation(summary = "대시보드", description = "대시보드")
//    @RequestMapping(value = PathConf.DASHBOARD_PROJECT_INFO, method = RequestMethod.GET)
//    public ResponseEntity<ApiResponse<Object>> dashBoardInfo(@RequestParam String test) {
//
//    }
}
