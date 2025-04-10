package com.smplatform.backend.DTO;

public class UserResponse {
    private String username;
    private String uniqueId;
    private Boolean oAuthUser;
    private Boolean emailVerified;
    private String email;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email= email;
    }


    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Boolean getOAuthUser() {
        return oAuthUser;
    }

    public void setOAuthUser(Boolean oAuthUser) {
        this.oAuthUser = oAuthUser;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.oAuthUser = emailVerified;
    }

}