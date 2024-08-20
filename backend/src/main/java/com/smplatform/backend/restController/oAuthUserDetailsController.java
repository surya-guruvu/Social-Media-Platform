package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.model.User;
import com.smplatform.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/")
public class oAuthUserDetailsController {
    
    @Autowired
    private UserService userService;

    @GetMapping("oAuthVerify")
    public Boolean oAuthVerify(@RequestHeader("Authorization") String header) {
        String identifier = userService.getCurrentUserIdentifier();

        User user = userService.findByIdentifier(identifier);

        if(user.getOAuthUser() == true){
            return true;
        }

        return false;
    }
    
}
