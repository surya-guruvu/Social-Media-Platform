package com.example.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // allow all requests
            )
            .csrf(csrf -> csrf.disable())  // disable CSRF
            .headers(headers -> headers.frameOptions().disable()) // allow H2 console (optional)
            .httpBasic(basic -> basic.disable())  // disable basic auth
            .formLogin(form -> form.disable()); // disable form login

        return http.build();
    }
}
