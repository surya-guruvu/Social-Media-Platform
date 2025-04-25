package com.smplatform.backend.restController;


import com.smplatform.backend.client.UserServiceClient;
import com.smplatform.backend.model.User;

import feign.FeignException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class RegistrationController {

    @Autowired
    private UserServiceClient userServiceClient;

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
    
        try {
            return userServiceClient.registerUser(user); // 200 OK response
        } catch (FeignException.Conflict ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.contentUTF8()); // 409
        } catch (FeignException ex) {
            return ResponseEntity.status(ex.status()).body(ex.contentUTF8()); // Other errors
        }
    }
        
}
