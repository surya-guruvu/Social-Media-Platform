package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Like;
import java.util.List;




public interface LikesRepository extends JpaRepository<Like,Long>{

    List<Like> findAllByParentId(Long parentId);
    List<Like> findAllByUserId(Long userId);
    List<Like> findByParentIdAndUserId(Long parentId, Long userId);
    
}
