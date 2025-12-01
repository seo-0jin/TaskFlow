package com.example.TaskFlow.common.exception;

import com.example.TaskFlow.common.error.ErrorCode;

public class TaskFlowBadRequestException extends RuntimeException {

    private final ErrorCode errorCode;
    private final String detail;  // 개발용/로그용 상세 메시지

    public TaskFlowBadRequestException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.detail = null;
    }

    public TaskFlowBadRequestException(ErrorCode errorCode, String message) {
        super(message); // 이 message가 클라이언트에게 보여줄 메시지
        this.errorCode = errorCode;
        this.detail = null;
    }

    public TaskFlowBadRequestException(ErrorCode errorCode, String message, String detail) {
        super(message);
        this.errorCode = errorCode;
        this.detail = detail;
    }

    public TaskFlowBadRequestException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.detail = cause.getMessage();
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public String getDetail() {
        return detail;
    }
}
