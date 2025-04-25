package com.smplatform.backend.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.smplatform.backend.DTO.UserResponse;
import com.smplatform.backend.model.User;

@FeignClient(name = "user-service", url = "http://127.0.0.1:8083/")
public interface UserServiceClient {
    @GetMapping("/userUniqueId/")
    UserResponse getUserInfo(@RequestHeader("Authorization") String token);

    @PostMapping("register")
    ResponseEntity<String> registerUser(@RequestBody User user);
}



