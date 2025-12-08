package com.example.TaskFlow.common.exception;

import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.model.response.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TaskFlowBadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleTaskFlowBadRequest(TaskFlowBadRequestException ex) {

        ErrorCode errorCode = ex.getErrorCode();
        HttpStatus status = HttpStatus.BAD_REQUEST; // 예외에 따라 변경 가능

        ApiResponse<Object> body = new ApiResponse<>(
                String.valueOf(status.value()),
                errorCode.getCode(),
                ex.getMessage(),
                null
        );

        return ResponseEntity.status(status).body(body);
    }

}
