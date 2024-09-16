package com.smplatform.backend.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Post;
import com.smplatform.backend.repository.PostsRepository;


@Service
public class PostsService {
    
    @Autowired
    PostsRepository postsRepository;

    public Optional<Post> findById(Long Id){
        return postsRepository.findById(Id);
    }

    public List<Post> findByUserId(Long userId){
        return postsRepository.findAllByUserId(userId);
    }

    public Post save(Post post){
        return postsRepository.save(post);
    }
}
