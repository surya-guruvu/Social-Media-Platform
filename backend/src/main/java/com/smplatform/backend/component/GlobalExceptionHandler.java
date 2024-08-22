package com.smplatform.backend.component;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.smplatform.backend.exception.DuplicateUsernameException;
import com.smplatform.backend.exception.EmailNotPresentException;
import com.smplatform.backend.exception.EmailNotSendException;
import com.smplatform.backend.exception.UserNotPresentException;

import io.jsonwebtoken.MalformedJwtException;

import java.lang.NullPointerException;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<String> handleRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<String> handleDuplicateUsernameException(DuplicateUsernameException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<String> handleMalformedJwtException(MalformedJwtException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("JWT Malformed: " + ex.getMessage());
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("ResourceNotFound: " + ex.getMessage());
    }

    @ExceptionHandler(EmailNotPresentException.class)
    public ResponseEntity<String> handleEmailNotPresentException(EmailNotPresentException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotPresentException.class)
    public ResponseEntity<String> handleUserNotPresentException(UserNotPresentException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

    @ExceptionHandler(EmailNotSendException.class)
    public ResponseEntity<String> handleEmailNotSendException(EmailNotSendException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(ex.getMessage());
    }

}
