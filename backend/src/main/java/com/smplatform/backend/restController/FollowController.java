package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.model.Follow;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.FollowService;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;



@RestController
@RequestMapping("/follow")
public class FollowController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @GetMapping("getfollowers")
    public ResponseEntity<?> getFollowers(@RequestParam("userUniqueId") String userUniqueId) {
        User user = userService.findByUniqueId(userUniqueId);
        Long userId = user.getId();

        List<User> followersList = userService.findUsersFollowingCurrentUser(userId);

        return ResponseEntity.ok(followersList);
    }

    @GetMapping("getfollowing")
    public ResponseEntity<?> getFollowing(@RequestParam("userUniqueId") String userUniqueId) {
        User user = userService.findByUniqueId(userUniqueId);
        Long userId = user.getId();

        List<User> followingList = userService.findUsersFollowedByCurrentUser(userId);

        return ResponseEntity.ok(followingList);
    }

    @GetMapping("removeFollower")
    public ResponseEntity<?> removeFollower(@RequestHeader("Authorization") String header,@RequestParam("userUniqueId") String userUniqueId) {
        String jwt = header.substring(7);
        String identifier = JwtUtil.extractIdentifier(jwt);

        User followee = userService.findByIdentifier(identifier);
        User follower = userService.findByUniqueId(userUniqueId);

        Follow follow = followService.findByFolloweeIdAndFollowerId(followee.getId(), follower.getId());

        followService.deleteById(follow.getId());

        return ResponseEntity.ok("Removed follower");
    }
    

    @PostMapping("addFollower")
    public ResponseEntity<?> addFollower(@RequestBody FollowRequest followRequest) {
        String followeeUniqueId = followRequest.getFolloweeUniqueId();
        String followerUniqueId = followRequest.getFollowerUniqueId();

        User followee = userService.findByUniqueId(followeeUniqueId);
        User follower = userService.findByUniqueId(followerUniqueId);

        Follow existingFollow = followService.findByFolloweeIdAndFollowerId(followee.getId(), follower.getId());

        if(existingFollow != null){
            return ResponseEntity.ok("User already being followed");
        }

        Follow follow = new Follow();
        follow.setFolloweeId(followee.getId());
        follow.setFollowerId(follower.getId());

        followService.save(follow);

        return ResponseEntity.ok("Follower Added");
    }

    @GetMapping("unFollow")
    public ResponseEntity<?> unFollow(@RequestHeader("Authorization") String header,@RequestParam("userUniqueId") String userUniqueId) {

        String jwt = header.substring(7);
        String identifier = JwtUtil.extractIdentifier(jwt);

        User follower = userService.findByIdentifier(identifier);
        User followee = userService.findByUniqueId(userUniqueId);

        Follow follow = followService.findByFolloweeIdAndFollowerId(followee.getId(), follower.getId());

        followService.deleteById(follow.getId());

        return ResponseEntity.ok("Unfollowed user");
    }
    

}

class FollowRequest{
    private String followeeUniqueId;
    private String followerUniqueId;

    public String getFolloweeUniqueId(){
        return followeeUniqueId;
    }

    public String getFollowerUniqueId(){
        return followerUniqueId;
    }

    public void setFolloweeUniqueId(String followeeUniqueId){
        this.followeeUniqueId = followeeUniqueId;
    }

    public void setFollowerUniqueId(String followerUniqueId){
        this.followerUniqueId = followerUniqueId;
    }

}