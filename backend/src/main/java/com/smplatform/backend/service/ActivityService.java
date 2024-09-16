package com.smplatform.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Activity;
import com.smplatform.backend.repository.ActivityRepository;

@Service
public class ActivityService {
    
    @Autowired
    private ActivityRepository activityRepository;

    public Optional<Activity> findById(Long Id){
        return activityRepository.findById(Id);
    }

    public Activity save(Activity activity){
        return activityRepository.save(activity);
    }

}
