package com.example.TaskFlow.utils;


import com.example.TaskFlow.common.error.ErrorCode;
import com.example.TaskFlow.model.response.common.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;

public class ApiResponseUtil {

    /**
     * 200 OK 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok(
                ApiResponse.<T>builder().status(String.valueOf(HttpStatus.OK.value())).code("-1").data(data).build());
    }

    public static ResponseEntity<ApiResponse<TaskCommonResponse>> ok() {
        return ResponseEntity.ok(
                ApiResponse.<TaskCommonResponse>builder()
                        .status(String.valueOf(HttpStatus.OK.value()))
                        .code("-1")
                        .data(new TaskCommonResponse())
                        .build());
    }

    /**
     * 401 unauthorized 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> unauthorized() {
        UnauthorizedApiResponse response = new UnauthorizedApiResponse();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.<T>builder()
                        .status(response.getStatus())
                        .code(response.getCode())
                        .message(response.getMessage())
                        .build());
    }

    /**
     * 403 forbidden 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> forbidden(String code, String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.FORBIDDEN.value()))
                        .code(code)
                        .message(message)
                        .build());
    }

    /**
     * 404 Not Found 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> notFound(String code, String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.NOT_FOUND.value()))
                        .code(code)
                        .message(message)
                        .build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> notFound(ErrorCode error) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.NOT_FOUND.value()))
                        .code(error.getCode())
                        .message(error.getMessage())
                        .build());
    }

    /**
     * 409 CONFLICT 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> conflict(String code, String message) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.CONFLICT.value()))
                        .code(code)
                        .message(message)
                        .build());
    }

    /**
     * 410 GONE 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> gone() {
        return ResponseEntity.status(HttpStatus.GONE)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.GONE.value()))
                        .build());
    }

    public static ResponseEntity<byte[]> notFoundFileResponse(String code, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = String.format("{\"status\":%d,\"code\":\"%s\",\"message\":\"%s\"}",
                HttpStatus.NOT_FOUND.value(), code, message);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .headers(headers)
                .body(body.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 400 Bad Request 응답
     */
    public static <T> ResponseEntity<ApiResponse<T>> badRequest(String code, String message, T data) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                        .code(code)
                        .message(message)
                        .data(data)
                        .build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> badRequest(ErrorCode code, T data) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.<T>builder()
                        .status(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                        .code(code.getCode())
                        .message(code.getMessage())
                        .data(data)
                        .build());
    }

    public static ResponseEntity<Object> badRequestAsObject(ErrorCode code, ValidationErrorsResponse data) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ValidationFailedApiResponse(code, data));
    }
}
