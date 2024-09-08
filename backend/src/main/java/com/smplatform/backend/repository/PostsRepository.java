package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Posts;
import java.util.List;



public interface PostsRepository extends JpaRepository<Posts,Long>{
    
    List<Posts> findAllByUserId(Long userId);
    
}
