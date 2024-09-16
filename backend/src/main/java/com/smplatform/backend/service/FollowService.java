package com.smplatform.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Follow;
import com.smplatform.backend.repository.FollowRepository;


@Service
public class FollowService {
    
    @Autowired
    private FollowRepository followRepository;

    public List<Follow> findByFolloweeId(Long Id){
        return followRepository.findAllByFolloweeId(Id);
    }

    public List<Follow> findByFollowerId(Long Id){
        return followRepository.findAllByFollowerId(Id);
    }

}
