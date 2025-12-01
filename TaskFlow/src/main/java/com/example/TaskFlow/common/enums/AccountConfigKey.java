package com.example.TaskFlow.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AccountConfigKey {
    PASSWORD_EXPIRY("passwordExpiry"),
    LOGIN_RETRY_LIMIT("loginRetryLimit"),
    ACCOUNT_STATUS("accountStatus");

    private final String code;

    AccountConfigKey(String code) {
        this.code = code;
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    @JsonCreator
    public static AccountConfigKey fromValue(String value) {
        for (AccountConfigKey key : AccountConfigKey.values()) {
            if (key.code.equalsIgnoreCase(value)) {
                return key;
            }
        }
        return null;
    }
}
