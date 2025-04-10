package com.example.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.user.exception.EmailNotPresentException;
import com.example.user.model.User;
import com.example.user.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    //Here, though it names loadByUsername, this actually loads by username for normal login, email for oAuth login
    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(identifier,identifier);
        String password = "oAuthPassword"; //Use some temporary password when login thorugh oAuth

        if (user == null) {
            throw new UsernameNotFoundException("User not found with this identifier");
        }
        if(user.getPassword() != null){
            password = user.getPassword();
        }

        String username = user.getUsername();

        if(username==null){
            username = user.getEmail();
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(username)
                .password(password)
                .roles("USER")  // You can specify roles if needed
                .build();
    }

    public User findByUsername(String username){
        User user = userRepository.findByUsername(username);

        return user;
    }

    public User findByEmail(String email){
        User user = userRepository.findByEmail(email);
        return user;
    }

    public User findByIdentifier(String identifier){
        User user = userRepository.findByUsernameOrEmail(identifier, identifier);

        return user;
    }

    public User findByUniqueId(String userUniqueId){
        User user = userRepository.findByUniqueId(userUniqueId);

        return user;
    }

    public User save(User user){

        if(user.getPassword() != null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        return userRepository.save(user);
    }

    ///////////////////////////////////////////////////////////////////////

    public void sendVerificationEmail(User user,String token) throws EmailNotPresentException{
        String url = "http://localhost:3000/verify?token=" + token;
        String subject = "Email Verification";
        String body = "Click the link to verify your email: " + url;



        emailService.sendEmail(user.getEmail(), subject, body);
    }

    public UserDetails getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
    
    public String getCurrentUserIdentifier() {
        UserDetails userDetails = getCurrentUserDetails();
        return (userDetails != null) ? userDetails.getUsername() : null;
    }

    public List<User> findUserNotFollowedByCurrentUser(Long userId){
        return userRepository.findUserNotFollowedByCurrentUser(userId);
    }

    public List<User> findUsersFollowedByCurrentUser(Long userId){
        return userRepository.findUsersFollowedByCurrentUser(userId);
    }

    public List<User> findUsersFollowingCurrentUser(Long userId){
        return userRepository.findUsersFollowingCurrentUser(userId);
    }

}
