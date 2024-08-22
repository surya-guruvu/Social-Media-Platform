package com.smplatform.backend.exception;

public class UserNotPresentException extends  RuntimeException{
    public UserNotPresentException(String message) {
        super(message);
    }
}

