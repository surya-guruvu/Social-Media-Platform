package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;


@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping
    public String loadForm() {
        return "loginPage"; // This should match the name of your HTML template
    }
}
