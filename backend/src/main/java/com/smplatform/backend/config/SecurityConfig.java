package com.smplatform.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.smplatform.backend.component.CustomSuccessHandler;
import com.smplatform.backend.component.JwtAuthenticationEntryPoint;
import com.smplatform.backend.component.JwtRequestFilter;

import java.util.function.Consumer;

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

	@Autowired
	private ClientRegistrationRepository clientRegistrationRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorizeRequests -> 
                authorizeRequests
                    .requestMatchers("/login","/register","/verifyEmail","/updatePassword").permitAll()
                    .anyRequest().authenticated()
            )
            
            .oauth2Login((oauth2Login)->
                oauth2Login.successHandler(customSuccessHandler)
				.authorizationEndpoint(authorization -> authorization
					.authorizationRequestResolver(
						authorizationRequestResolver(this.clientRegistrationRepository)
					)
				)
            )

            .exceptionHandling((exception)->exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement((session)-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

	private OAuth2AuthorizationRequestResolver authorizationRequestResolver(
			ClientRegistrationRepository clientRegistrationRepository) {

		DefaultOAuth2AuthorizationRequestResolver authorizationRequestResolver =
				new DefaultOAuth2AuthorizationRequestResolver(
						clientRegistrationRepository, "/oauth2/authorization");
		authorizationRequestResolver.setAuthorizationRequestCustomizer(
				authorizationRequestCustomizer());

		return  authorizationRequestResolver;
	}

	private Consumer<OAuth2AuthorizationRequest.Builder> authorizationRequestCustomizer() {
		return customizer -> customizer
					.additionalParameters(params -> params.put("prompt", "select_account"));
	}


}
