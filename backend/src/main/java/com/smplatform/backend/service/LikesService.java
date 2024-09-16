package com.smplatform.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.Like;
import com.smplatform.backend.repository.LikesRepository;


@Service
public class LikesService {
    
    @Autowired
    private LikesRepository likesRepository;


    public Optional<Like> findById(Long Id){
        return likesRepository.findById(Id);
    }

    public List<Like> findByParentId(Long Id){
        return likesRepository.findAllByParentId(Id);
    }

    public List<Like> findByUserId(Long Id){
        return likesRepository.findAllByUserId(Id);
    }

    public Like findByParentIdAndUserId(Long parentId,Long userId){
        List<Like> likesList = likesRepository.findByParentIdAndUserId(parentId, userId);

        if(likesList.size()==0){
            return null;
        }
        return likesList.get(0);
    }

    public void save(Like like){
        likesRepository.save(like);
    }




    
}
