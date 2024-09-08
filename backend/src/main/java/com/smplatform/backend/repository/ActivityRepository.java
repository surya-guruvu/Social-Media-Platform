package com.smplatform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smplatform.backend.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity,Long>{

}
