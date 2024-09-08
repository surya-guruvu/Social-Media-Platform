package com.smplatform.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "user_likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    
    private Boolean active;

    private String type; //Like for Post/Comment

    private Long parentId; //Post or Comment

    private Long parentUserId;

    private Long userId; // user who liked

    private LocalDateTime timeStamp;

}
