package com.whitemind.cogit.common.error;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    NOT_EXIST_MEMBER_EXCEPTION(404, "사용자 계정이 존재하지 않습니다."),
    NOT_EXIST_ALGORITHM_PLATFORM_EXCEPTION(404, "잘못된 플랫폼입니다."),
    NOT_EXIST_TEAM_EXCEPTION(404, "스터디가 존재하지 않습니다.");

    private final int errorCode;
    private final String errorMessage;

    ExceptionCode(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
