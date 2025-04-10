package com.example.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.user.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    User findByUsernameOrEmail(String username,String email);
    User findByUniqueId(String uniqueId);

    @Query(value = "SELECT u.* FROM app_user u " +
    "LEFT JOIN follow_table f ON f.followee_id = u.id WHERE f.follower_id = :currentUserId ",
    nativeQuery = true)
    List<User> findUsersFollowedByCurrentUser(@Param("currentUserId") Long currentUserId);

    @Query(value = "SELECT u.* FROM app_user u " +
    "LEFT JOIN follow_table f ON f.follower_id = u.id WHERE f.followee_id = :currentUserId ",
    nativeQuery = true)
    List<User> findUsersFollowingCurrentUser(@Param("currentUserId") Long currentUserId);

    @Query(value = "SELECT u.* FROM app_user u " +
    "LEFT JOIN follow_table f ON f.followee_id = u.id AND f.follower_id = :currentUserId " +
    "WHERE f.followee_id IS NULL AND u.id != :currentUserId", 
    nativeQuery = true)
    List<User> findUserNotFollowedByCurrentUser(@Param("currentUserId") Long currentUserId);

}
