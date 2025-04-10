package com.smplatform.backend.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.smplatform.backend.DTO.UserResponse;

@FeignClient(name = "user-service", url = "http://127.0.0.1:8083/")
public interface UserServiceClient {
    @GetMapping("/userUniqueId/")
    UserResponse getUserInfo(@RequestHeader("Authorization") String token);

}



