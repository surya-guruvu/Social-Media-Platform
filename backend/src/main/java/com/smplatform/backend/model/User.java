package com.smplatform.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = true, unique = true) // Username is optional and unique for username/password auth
    private String username;

    @Column(nullable = true) // Nullable for OAuth2 users
    private String password;

    @Column(nullable = true, unique = true) // Email is used as the unique identifier for OAuth2
    private String email;

    private String name; // Optional, could be populated from OAuth2 or other sources

    private Boolean emailVerified = false;

    private Boolean oAuthUser = false;

    // Default constructor
    public User() {
    }

    public User(String username,String password){
        this.username = username;
        this.password = password;
    }
    public User(String username, String password, String email, String name) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }

}
