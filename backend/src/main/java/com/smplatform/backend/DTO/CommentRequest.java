package com.smplatform.backend.DTO;

import java.time.LocalDateTime;

public class CommentRequest {
    private String content;
    private Long postId;
    private Long parentCommentId;
    private String userUniqueId;
    private LocalDateTime createdAt;
    

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }
    public String getUserUniqueId() {
        return userUniqueId;
    }
    public void setUserUniqueId(String userUniqueId) {
        this.userUniqueId = userUniqueId;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}