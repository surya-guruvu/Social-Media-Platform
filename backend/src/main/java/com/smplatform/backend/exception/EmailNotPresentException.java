package com.smplatform.backend.exception;

public class EmailNotPresentException extends  RuntimeException{
    public EmailNotPresentException(String message) {
        super(message);
    }
}
