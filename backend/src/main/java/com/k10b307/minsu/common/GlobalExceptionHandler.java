package com.k10b307.minsu.common;

import com.k10b307.minsu.common.exception.UserException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<String> handleMemberException(UserException e) {
        return new ResponseEntity<>(e.getMessage(), e.getStatus());
    }
}
