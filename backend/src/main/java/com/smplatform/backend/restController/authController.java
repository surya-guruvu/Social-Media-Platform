package com.smplatform.backend.restController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/")
public class authController {

    @Autowired
    private AuthenticationManager authManager;
    
    @Autowired
    private UserService userService;

    @Autowired
    public JwtUtil jwtUtil;

    @PostMapping("login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{

        
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }
        catch (BadCredentialsException e){
            throw new Exception("Incorrect Username or Password:",e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(username);

        final String jwt = JwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }

    @PostMapping("updatePassword")
    public ResponseEntity<?>  updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {

        String identifier = updatePasswordRequest.getIdentifier();
        String password = updatePasswordRequest.getPassword();

        User user = userService.findByIdentifier(identifier);

        if(user==null){
            throw new UserNotPresentException("These user details are not registered");
        }

        user.setPassword(password);
        
        userService.save(user);

        return ResponseEntity.ok("Password update mail is sent to your registered email address");
    }

}


class AuthenticationRequest {
    private String username;
    private String password;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


class AuthenticationResponse {
    private final String jwt;

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}


class UpdatePasswordRequest {
    private String identifier;
    private String password;

    // Getters and setters
    public String getIdentifier() {
        return identifier;
    }

    public void setUsername(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}