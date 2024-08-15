package com.smplatform.backend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // // Allow credentials (e.g., cookies, HTTP authentication)
                .allowedOrigins("http://localhost:3000/") // Frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*") // Allow any header
                .allowCredentials(true); // Allow credentials (e.g., cookies, HTTP authentication)
    }
}

