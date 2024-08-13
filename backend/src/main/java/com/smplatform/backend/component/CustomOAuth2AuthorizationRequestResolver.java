// package com.smplatform.backend.component;


// import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
// import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
// import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationFilter;
// import org.springframework.security.web.util.matcher.RequestMatcher;
// import org.springframework.stereotype.Component;

// import jakarta.servlet.http.HttpServletRequest;

// import java.util.Map;
// // 

// public class CustomOAuth2AuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {

//     private final OAuth2AuthorizationRequestResolver defaultResolver;

//     public CustomOAuth2AuthorizationRequestResolver(OAuth2AuthorizationRequestResolver defaultResolver) {
//         this.defaultResolver = defaultResolver;
//     }

//     @Override
//     public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
//         OAuth2AuthorizationRequest authorizationRequest = defaultResolver.resolve(request);

//         if (authorizationRequest != null) {
//             Map<String, Object> additionalParameters = authorizationRequest.getAdditionalParameters();
//             additionalParameters.put("prompt", "select_account");
//             authorizationRequest = OAuth2AuthorizationRequest.from(authorizationRequest)
//                 .additionalParameters(additionalParameters)
//                 .build();
//         }

//         return authorizationRequest;
//     }

//     @Override
//     public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String registrationId) {
//         OAuth2AuthorizationRequest authorizationRequest = defaultResolver.resolve(request, registrationId);

//         if (authorizationRequest != null) {
//             Map<String, Object> additionalParameters = authorizationRequest.getAdditionalParameters();
//             additionalParameters.put("prompt", "select_account");
//             authorizationRequest = OAuth2AuthorizationRequest.from(authorizationRequest)
//                 .additionalParameters(additionalParameters)
//                 .build();
//         }

//         return authorizationRequest;
//     }
// }
