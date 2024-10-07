package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@RestController
@RequestMapping("/")
public class recommendationController {
    

    @Autowired
    private UserService userService;


    @GetMapping("getRecommendations")
    public ResponseEntity<?> getRecommendations(@RequestParam("userUniqueId") String userUniqueId) {
       User user = userService.findByUniqueId(userUniqueId);


        if(user==null){
            throw new UserNotPresentException("User Not Valid");
        }

       Long userId = user.getId();

       List<User> recommendations =  userService.findUserNotFollowedByCurrentUser(userId);

       return ResponseEntity.ok(recommendations);
    }
    
}
