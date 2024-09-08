package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Likes;
import java.util.List;




public interface LikesRepository extends JpaRepository<Likes,Long>{

    List<Likes> findAllByParentId(Long parentId);
    List<Likes> findAllByUserId(Long userId);
    
}
