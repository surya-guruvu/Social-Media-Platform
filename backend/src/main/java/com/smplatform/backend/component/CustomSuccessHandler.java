package com.smplatform.backend.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
// import org.springframework.security.crypto.codec.Utf8;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;

import jakarta.servlet.ServletException;
// import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
// import java.net.URLEncoder;
import java.util.Base64;

@Component


public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    private final OAuth2AuthorizedClientService authorizedClientService;

    public CustomSuccessHandler(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                         Authentication authentication) throws IOException, ServletException {

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

            System.out.println(oauthToken);

            // Retrieve the OAuth2AuthorizedClient
            // Loads Authorized Client object associated with current session, and gets AccessToken from that.
            OAuth2AuthorizedClient authorizedClient = this.authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

            // Get the access token
            String accessToken = authorizedClient.getAccessToken().getTokenValue();
            
            // Store the access token in the session
            request.getSession().setAttribute("accessToken", accessToken);

            User user = fetchUserDetailsFromProvider(accessToken);

            String jwt = "";

            if(user !=null){
                User existingUser = userService.findByUsername(user.getUsername());

                if(existingUser == null){
                    userService.save(user);
                }
                else{
                    existingUser.setEmail(user.getEmail());
                    existingUser.setName(user.getName());
                    userService.save(existingUser);
                }
            }

            jwt = JwtUtil.generateToken(user.getEmail());

            // Cookie cookie = new Cookie("jwtToken", jwt);
            // cookie.setHttpOnly(true); // Prevent client-side JavaScript from accessing the cookie
            // // cookie.setSecure(true); // Use this only if you are using HTTPS
            // cookie.setPath("/"); // Set the path as needed

            // response.addCookie(cookie);
            // Redirect to frontend

            String encodedToken =  Base64.getEncoder().encodeToString(jwt.getBytes());

            String targetUrl = "http://localhost:3000/login/oauth2/redirect#token=" + encodedToken;

            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } 
        
        else {
            // Handle cases where the authentication token is not OAuth2
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }

    private User fetchUserDetailsFromProvider(String accessToken) {

        String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, JsonNode.class);
        JsonNode userInfo = response.getBody();

        if(userInfo != null){
            String email = userInfo.get("email").asText();
            String name  = userInfo.get("name").asText();

            return new User(null,null,email,name);
        }

        return null;
    }

}