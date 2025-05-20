package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Comment;
import com.smplatform.backend.model.Post;

import java.util.List;


public interface CommentsRepository extends JpaRepository<Comment,Long>{

    List<Comment> findByPostAndParentCommentIsNullOrderByTimeStampAsc(Post post);

    List<Comment> findByParentCommentOrderByTimeStampAsc(Comment parentComment);

}
