package com.smplatform.backend.service;

// import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
// import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
// import org.springframework.security.oauth2.core.oidc.user.OidcUser;
// import org.springframework.stereotype.Service;

// @Service
// public class OAuth2TokenService {

//     private final OAuth2AuthorizedClientService authorizedClientService;

//     public OAuth2TokenService(OAuth2AuthorizedClientService authorizedClientService) {
//         this.authorizedClientService = authorizedClientService;
//     }

//     public String getAccessToken(OidcUser user) {
//         OAuth2AuthorizedClient authorizedClient = this.authorizedClientService.loadAuthorizedClient(
//             user.getAuthorizedClientRegistrationId(), user.getName());
//         return authorizedClient.getAccessToken().getTokenValue();
//     }
// }
