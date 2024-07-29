package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.User;


public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
}
