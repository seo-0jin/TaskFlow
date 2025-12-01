package com.example.TaskFlow.common.error;

import lombok.Getter;

@Getter
public enum ErrorCode {

    EXPIRED_SESSION("4010300005", "Expired session."),
    INVALID_TOKEN("4010300001", "Invalid token."),
    FORBIDDEN("4030000001", "Access denied."),
    LOGIN_FAILED("4010300002", "Invalid ID or password."),
    USER_NOT_FOUND("4040100001", "User not found.");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
