package com.smplatform.backend.DTO;

import java.time.LocalDateTime;

public class CommentResponse{
    private Long id;
    private String userUniqueId;
    private String content;
    private String username;
    private LocalDateTime timeStamp;
    private int replyCount;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUserUniqueId() {
        return userUniqueId;
    }
    public void setUserUniqueId(String userUniqueId) {
        this.userUniqueId = userUniqueId;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }
    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }
    public int getReplyCount() {
        return replyCount;
    }
    public void setReplyCount(int replyCount) {
        this.replyCount = replyCount;
    }
} 