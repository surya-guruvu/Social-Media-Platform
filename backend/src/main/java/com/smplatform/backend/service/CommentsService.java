package com.smplatform.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Comment;
import com.smplatform.backend.repository.CommentsRepository;


@Service
public class CommentsService {
    
    @Autowired
    private CommentsRepository commentsRepository;

    public Optional<Comment> findById(Long Id){
        return commentsRepository.findById(Id);
    }

    public List<Comment> findByParentId(Long Id){
        return commentsRepository.findAllByParentId(Id);
    }

    public List<Comment> findByUserId(Long Id){
        return commentsRepository.findAllByUserId(Id);
    }

    public void save(Comment comment){
        commentsRepository.save(comment);
    }
}
