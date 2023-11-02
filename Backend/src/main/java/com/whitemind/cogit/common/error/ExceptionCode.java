package com.whitemind.cogit.common.error;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    NOT_EXIST_MEMBER_EXCEPTION(450, "사용자 계정이 존재하지 않습니다."),
    NOT_EXIST_ACCESSTOKEN_EXCEPTION(460, "Access 토큰이 없거나 유효하지 않습니다.");

    private final int errorCode;
    private final String errorMessage;

    ExceptionCode(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    }
