package com.whitemind.cogit.common.error;

import com.whitemind.cogit.common.response.ResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.tripick.mz")
public class ExceptionController {
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e) {
        log.info("Error : {}", e.getClass());
        log.info("Error Message : {}", e.getExceptionCode());
        return ErrorResponseEntity.toResponseEntity(e.getExceptionCode());
    }
}