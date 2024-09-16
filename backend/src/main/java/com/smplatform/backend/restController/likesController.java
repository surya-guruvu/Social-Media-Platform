package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.service.ActivityService;
import com.smplatform.backend.service.CommentsService;
import com.smplatform.backend.service.LikesService;
import com.smplatform.backend.service.PostsService;
import com.smplatform.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.smplatform.backend.exception.ActivityNotFoundException;
import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.Activity;
import com.smplatform.backend.model.Like;
import com.smplatform.backend.model.Post;
import com.smplatform.backend.model.User;
import com.smplatform.backend.model.Comment;

import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;



@RestController
@RequestMapping("/")
public class likesController {
    

    @Autowired
    private LikesService likesService;
    @Autowired
    private ActivityService activityService;
    @Autowired
    private PostsService postsService;
    @Autowired
    private CommentsService commentsService;
    @Autowired
    private UserService userService;


    @GetMapping("likeRequest")
    public ResponseEntity<?> getLikes(@RequestParam("activityId") Long activityId) {
        Optional<Activity> optionalActivity = activityService.findById(activityId);
        
        int likeCount = optionalActivity
                        .map(Activity::getLikes)
                        .orElseThrow(() -> new ActivityNotFoundException("Activity not found"));

        return ResponseEntity.ok(likeCount);
    }

    @GetMapping("checkUserLiked")
    public ResponseEntity<?> checkUserLiked(@RequestParam("parentId") Long parentId, @RequestParam("userUniqueId") String userUniqueId) {
        User user = userService.findByUniqueId(userUniqueId);

        if(user == null){
            throw new UserNotPresentException("User Not Valid");
        }

        Long userId = user.getId();

        Like like = likesService.findByParentIdAndUserId(parentId, userId);

        if(like==null){
            return ResponseEntity.ok(false);
        }
        else if(like.getActive()==false){
            return ResponseEntity.ok(false);
        }
        else{
            return ResponseEntity.ok(true);
        }
    }
    



    @PostMapping("likeRequest")
    public ResponseEntity<?> postLikes(@RequestBody LikesRequest likesRequest) {
        Long parentId = likesRequest.getParentId();
        String userUniqueId = likesRequest.getUserUniqueId();
        String type = likesRequest.getType();

        int liked = 0;

        User user = userService.findByUniqueId(userUniqueId);

        if(user==null){
            throw new UserNotPresentException("User is Invalid");
        }

        Long userId = user.getId();

        Like like = likesService.findByParentIdAndUserId(parentId, userId);

        if(like==null){
            like = new Like();
            like.setActive(true);
            like.setParentId(parentId);
            like.setType(type);
            like.setTimeStamp(LocalDateTime.now());
            like.setUserId(userId);
            liked = 1;
        }
        else{
            if(like.getActive()){
                like.setActive(false);
                liked -= 1;
            }
            else{
                like.setActive(true);
                liked += 1;
            }
        }

        Long activityId = (long) -1;
        
        if(type.equals("post")){
            Optional<Post> optionalPost = postsService.findById(parentId);
            Post post = optionalPost.orElseThrow(()-> new ActivityNotFoundException("Post Not Found"));
            activityId = post.getActivityId();
        }

        if(type.equals("comment")){
            Optional<Comment> optionalComment = commentsService.findById(parentId);
            Comment comment = optionalComment.orElseThrow(() -> new ActivityNotFoundException("Comment Not Found"));
            activityId = comment.getActivityId();
        }

        Optional<Activity> optionalActivity = activityService.findById(activityId);
        Activity activity = optionalActivity.orElseThrow(() -> new ActivityNotFoundException("Activity Not Found"));
        
        int curLikes = activity.getLikes();
        curLikes += liked;
        
        activity.setLikes(curLikes);
        activityService.save(activity);
        likesService.save(like); 
        
        return ResponseEntity.ok("Post like is toggled");
    }
}


class LikesRequest {
    private Long parentId;
    private String userUniqueId;
    private String type;

    public Long getParentId(){
        return parentId;
    }

    public void setParentId(Long parentId){
        this.parentId = parentId;
    }

    public void setType(String type){
        this.type = type;
    }

    public String getType(){
        return type;
    }

    public String getUserUniqueId(){
        return userUniqueId;
    }

    public void setUserUniqueId(String userUniqueId){
        this.userUniqueId = userUniqueId;   
    }

}
