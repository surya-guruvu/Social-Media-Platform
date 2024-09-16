package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.Activity;
import com.smplatform.backend.model.Post;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.ActivityService;
import com.smplatform.backend.service.PostsService;
import com.smplatform.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;



@RestController
@RequestMapping("/posts")
public class postController {

    @Autowired
    private PostsService postsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ActivityService activityService;

    @GetMapping("/userUniqueId")
    public ResponseEntity<?> getAllPosts(@RequestParam("userUniqueId") String userUniqueId) {

        User user = userService.findByUniqueId(userUniqueId);

        if(user == null){
            throw new UserNotPresentException("User Not Valid");
        }

        List<Post> posts = postsService.findByUserId(user.getId());

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/userUniqueId")
    public ResponseEntity<?> addPost(@RequestParam("userUniqueId") String userUniqueId,@RequestBody String content) {

        System.out.println(userUniqueId);

        User user = userService.findByUniqueId(userUniqueId);
        if(user == null){
            throw new UserNotPresentException("User Not Valid");
        }

        Activity activity = new Activity();
        activityService.save(activity);

        System.out.println(activity);

        Post post = new Post();
        post.setContent(content);
        post.setUserId(user.getId());
        post.setActivityId(activity.getId());
        post.setTimeStamp(LocalDateTime.now());

        

        postsService.save(post); 

        return ResponseEntity.ok("Post Added");
    }
}
