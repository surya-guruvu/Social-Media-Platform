package com.smplatform.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "user_comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long parentId;

    private Long parentUserId;

    private Long userId; //Comment by user

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime timeStamp;

    private Long activityId;

}
