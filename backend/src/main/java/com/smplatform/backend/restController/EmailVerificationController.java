package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.exception.EmailNotPresentException;
import com.smplatform.backend.exception.EmailNotSendException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.repository.UserRepository;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/")
public class EmailVerificationController {


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("addOrUpdateEmail")
    public String addOrUpdateEmail(@RequestBody EmailClass emailRequest, @RequestHeader("Authorization") String header) {

        String email = emailRequest.getEmailAddress();

        String jwt = header.substring(7);
        String identifier = JwtUtil.extractIdentifier(jwt);
        
        User user = userService.findByIdentifier(identifier);
        user.setEmail(email);
        user.setEmailVerified(false);
        userRepository.save(user);

        try{
            String token = JwtUtil.generateToken(email);
            userService.sendVerificationEmail(user, token);
        }
        catch(Exception e){
            throw new EmailNotSendException("Email Updated, But not able to send verification email");
        }

        return "Request was successful";
        
    }
    

    @GetMapping("sendVerficationEmail")
    public String sendVerificationEmail(@RequestHeader("Authorization") String header) {
        String jwt = header.substring(7);
        String identifier = JwtUtil.extractIdentifier(jwt);

        User user = userService.findByIdentifier(identifier);

        String token = JwtUtil.generateToken(user.getEmail());

        if(user.getEmail()==null){
            throw new EmailNotPresentException("Please add email");
        }

        userService.sendVerificationEmail(user, token);

        return "Verification mail is sent to registered mail";
    }
        
    

    @GetMapping("verifyEmail")
    public String verifyAccount(@RequestParam("token") String token){

        String identifier = "";

        try{
            identifier = JwtUtil.extractIdentifier(token);
        }
        catch(Exception e){
            System.out.println(e);
        }

        if(JwtUtil.isTokenExpired(token)){
            return "Token is Expired";
        }

        User user = userService.findByIdentifier(identifier);
        user.setEmailVerified(true);
        userRepository.save(user);
        
        return "Email Verified Successfully";
    }
}

/**
 * InnerEmailVerificationController
 */
class EmailClass {
    private String emailAddress;

    public String getEmailAddress(){
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress){
        this.emailAddress = emailAddress;
    }
}
