package com.smplatform.backend.exception;

public class ActivityNotFoundException extends RuntimeException{
    public ActivityNotFoundException(String message) {
        super(message);
    }
}

