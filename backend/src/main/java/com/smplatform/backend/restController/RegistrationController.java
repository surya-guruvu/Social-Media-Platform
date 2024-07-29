package com.smplatform.backend.restController;


import com.smplatform.backend.model.User;
import com.smplatform.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private UserService userService;


    @GetMapping
    public String register() {
        return "register";
    }
    @PostMapping
    public void registerUser(@RequestBody User user) {
        userService.save(user);
    }
}
