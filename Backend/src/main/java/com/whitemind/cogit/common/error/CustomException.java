package com.whitemind.cogit.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    ExceptionCode exceptionCode;
}
