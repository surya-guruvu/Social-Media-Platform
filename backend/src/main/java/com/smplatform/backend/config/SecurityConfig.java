package com.smplatform.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.smplatform.backend.component.CustomSuccessHandler;
import com.smplatform.backend.component.JwtAuthenticationEntryPoint;
import com.smplatform.backend.component.JwtRequestFilter;

/**
 * SecurityConfig
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private CustomSuccessHandler customSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorizeRequests -> 
                authorizeRequests
                    .requestMatchers("/login","/register").permitAll()
                    .anyRequest().authenticated()
            )
            
            .oauth2Login((oauth2Login)->
                oauth2Login.successHandler(customSuccessHandler)
            )

            .exceptionHandling((exception)->exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement((session)-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


}
