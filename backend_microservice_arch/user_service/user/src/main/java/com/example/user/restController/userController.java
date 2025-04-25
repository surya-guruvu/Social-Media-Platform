package com.example.user.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.exception.UserNotPresentException;
import com.example.user.model.User;
import com.example.user.service.JwtUtil;
import com.example.user.service.UserService;

@RestController
@RequestMapping("/userUniqueId")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public UserResponse getMethodName(@RequestHeader("Authorization") String header) {
        String jwt = header.substring(7);
        String identifier = JwtUtil.extractIdentifier(jwt);

        User user = userService.findByIdentifier(identifier);

        if(user==null){
            throw new UserNotPresentException("User Not Valid");
        }

        

        UserResponse userResponse = new UserResponse();
        if(user.getUsername()!=null){
            userResponse.setUsername(user.getUsername());
        }
        else{
            userResponse.setUsername(user.getName());
        }
        
        userResponse.setUniqueId(user.getUniqueId());
        userResponse.setOAuthUser(user.getOAuthUser());
        userResponse.setEmailVerified(user.getEmailVerified());

        if(user.getEmailVerified()){
            userResponse.setEmail(user.getEmail());
        }
        else{
            userResponse.setEmail(null);
        }

        return userResponse;
    }

}

class UserResponse {
    private String username;
    private String uniqueId;
    private Boolean oAuthUser;
    private Boolean emailVerified;
    private String email;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email= email;
    }


    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Boolean getOAuthUser() {
        return oAuthUser;
    }

    public void setOAuthUser(Boolean oAuthUser) {
        this.oAuthUser = oAuthUser;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.oAuthUser = emailVerified;
    }

}

