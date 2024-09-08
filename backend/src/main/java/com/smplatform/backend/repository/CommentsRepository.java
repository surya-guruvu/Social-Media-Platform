package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Comments;
import java.util.List;


public interface CommentsRepository extends JpaRepository<Comments,Long>{

    List<Comments> findAllByParentId(Long parentId);
    List<Comments> findByUserId(Long userId);
}
