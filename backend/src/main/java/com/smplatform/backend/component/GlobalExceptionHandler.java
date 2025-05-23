package com.smplatform.backend.component;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.smplatform.backend.exception.ActivityNotFoundException;
import com.smplatform.backend.exception.DuplicateEmailException;
import com.smplatform.backend.exception.DuplicateUsernameException;
import com.smplatform.backend.exception.EmailNotPresentException;
import com.smplatform.backend.exception.EmailNotSentException;
import com.smplatform.backend.exception.PostNotFoundException;
import com.smplatform.backend.exception.UserNotPresentException;

import io.jsonwebtoken.MalformedJwtException;

import java.lang.NullPointerException;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<String> handleRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        logger.error("Method not allowed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<String> handleDuplicateUsernameException(DuplicateUsernameException ex) {
        logger.error("Duplicate username: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<String> handleDuplicateEmailException(DuplicateEmailException ex) {
        logger.error("Duplicate email: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<String> handleMalformedJwtException(MalformedJwtException ex) {
        logger.error("Malformed JWT: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JWT Malformed: " + ex.getMessage());
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        logger.error("Null pointer exception: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ResourceNotFound: " + ex.getMessage());
    }

    @ExceptionHandler(EmailNotPresentException.class)
    public ResponseEntity<String> handleEmailNotPresentException(EmailNotPresentException ex) {
        logger.error("Email not present: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotPresentException.class)
    public ResponseEntity<String> handleUserNotPresentException(UserNotPresentException ex) {
        logger.error("User not present: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(ActivityNotFoundException.class)
    public ResponseEntity<String> handleActivityNotFoundException(ActivityNotFoundException ex) {
        logger.error("Activity not present: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<String> handlePostyNotFoundException(ActivityNotFoundException ex) {
        logger.error("Post not present: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(EmailNotSentException.class)
    public ResponseEntity<String> handleEmailNotSentException(EmailNotSentException ex) {
        logger.error("Email not sent: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception ex) {
        logger.error("Unhandled exception: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
    }

}
