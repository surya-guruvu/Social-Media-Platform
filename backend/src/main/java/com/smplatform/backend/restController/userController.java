package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.DTO.UserResponse;
import com.smplatform.backend.client.UserServiceClient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;




@RestController
@RequestMapping("/")
public class userController {

    @Autowired
    UserServiceClient userServiceClient;

    @GetMapping("userUniqueId")
    public UserResponse getMethodName(@RequestHeader("Authorization") String header) {
        return userServiceClient.getUserInfo(header);
    }
    
}
