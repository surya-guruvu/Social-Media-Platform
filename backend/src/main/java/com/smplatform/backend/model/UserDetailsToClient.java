package com.smplatform.backend.model;

import lombok.Data;

@Data
public class UserDetailsToClient {

    private Long Id;

    private String uniqueId;

    private String username;

    private String name;

    private Boolean followedByLoggedInUser = false;

    
}
