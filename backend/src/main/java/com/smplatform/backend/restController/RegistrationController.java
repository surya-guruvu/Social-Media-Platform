package com.smplatform.backend.restController;


import com.smplatform.backend.exception.DuplicateUsernameException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        userService.save(user);

        return ResponseEntity.ok("User has been registered successfully");
    }


}
