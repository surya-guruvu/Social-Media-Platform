package com.example.user.exception;

public class EmailNotPresentException extends  RuntimeException{
    public EmailNotPresentException(String message) {
        super(message);
    }
}

