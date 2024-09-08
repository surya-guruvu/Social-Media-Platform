package com.smplatform.backend.exception;

public class EmailNotSentException extends  RuntimeException{
    public EmailNotSentException (String message) {
        super(message);
    }
}

