package com.example.user.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class testController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}