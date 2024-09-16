package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Comment;
import java.util.List;


public interface CommentsRepository extends JpaRepository<Comment,Long>{

    List<Comment> findAllByParentId(Long parentId);
    List<Comment> findAllByUserId(Long userId);
}
