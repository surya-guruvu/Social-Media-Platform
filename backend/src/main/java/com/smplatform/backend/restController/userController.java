package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.DTO.UserResponse;
import com.smplatform.backend.client.UserServiceClient;
import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;




@RestController
@RequestMapping("/")
public class userController {

    @Autowired
    UserService userService;

    @Autowired
    UserServiceClient userServiceClient;

    @GetMapping("userUniqueId")
    public UserResponse getMethodName(@RequestHeader("Authorization") String header) {

        System.out.println(header);

        return userServiceClient.getUserInfo(header);
    }
    
}


// class UserResponse {
//     private String username;
//     private String uniqueId;
//     private Boolean oAuthUser;
//     private Boolean emailVerified;
//     private String email;

//     // Getters and setters
//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email= email;
//     }


//     public String getUniqueId() {
//         return uniqueId;
//     }

//     public void setUniqueId(String uniqueId) {
//         this.uniqueId = uniqueId;
//     }

//     public Boolean getOAuthUser() {
//         return oAuthUser;
//     }

//     public void setOAuthUser(Boolean oAuthUser) {
//         this.oAuthUser = oAuthUser;
//     }

//     public Boolean getEmailVerified() {
//         return emailVerified;
//     }

//     public void setEmailVerified(Boolean emailVerified) {
//         this.oAuthUser = emailVerified;
//     }

// }
