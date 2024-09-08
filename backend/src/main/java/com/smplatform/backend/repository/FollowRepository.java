package com.smplatform.backend.repository;

import com.smplatform.backend.model.Follow;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface FollowRepository extends JpaRepository<Follow,Long> {
    
    List<Follow> findAllByFolloweeId(Long followeeId);
    List<Follow> findAllByFollowerId(Long followerId);
    
}
