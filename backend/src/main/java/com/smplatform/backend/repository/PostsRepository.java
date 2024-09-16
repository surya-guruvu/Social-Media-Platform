package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Post;
import java.util.List;



public interface PostsRepository extends JpaRepository<Post,Long>{
    
    List<Post> findAllByUserId(Long userId);
    
}
