package com.smplatform.backend.exception;

public class EmailNotSendException extends  RuntimeException{
    public EmailNotSendException (String message) {
        super(message);
    }
}

