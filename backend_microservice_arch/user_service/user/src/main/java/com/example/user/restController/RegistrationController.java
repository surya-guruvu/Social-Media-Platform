package com.example.user.restController;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.exception.DuplicateUsernameException;
import com.example.user.model.User;
import com.example.user.service.UserService;

@RestController
@RequestMapping("/")
public class RegistrationController {

   @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        String username = user.getUsername();

        User existingUser = userService.findByUsername(username);

        if(existingUser != null){
            throw new DuplicateUsernameException("This username already exists");
        }

        user.setUniqueId(UUID.randomUUID().toString());

        userService.save(user);

        return ResponseEntity.ok("User has been registered successfully");

    }
    
}
