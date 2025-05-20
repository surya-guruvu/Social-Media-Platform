package com.smplatform.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Comment;
import com.smplatform.backend.model.Post;
import com.smplatform.backend.repository.CommentsRepository;


@Service
public class CommentsService {
    
    @Autowired
    private CommentsRepository commentsRepository;

    public Optional<Comment> findById(Long Id){
        return commentsRepository.findById(Id);
    }

    public List<Comment> findByPostAndParentCommentIsNullOrderByTimeStampAsc(Post post){
        return commentsRepository.findByPostAndParentCommentIsNullOrderByTimeStampAsc(post);
    }

    public List<Comment> findByParentCommentOrderByTimeStampAsc(Comment parentComment){
        return commentsRepository.findByParentCommentOrderByTimeStampAsc(parentComment);
    }
    
    public void save(Comment comment){
        commentsRepository.save(comment);
    }
}
