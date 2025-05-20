package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smplatform.backend.DTO.CommentRequest;
import com.smplatform.backend.DTO.CommentResponse;
import com.smplatform.backend.exception.PostNotFoundException;
import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.Activity;
import com.smplatform.backend.model.Comment;
import com.smplatform.backend.model.Post;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.ActivityService;
import com.smplatform.backend.service.CommentsService;
import com.smplatform.backend.service.PostsService;
import com.smplatform.backend.service.UserService;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/comments/")
public class commentsController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostsService postsService;

    @Autowired
    private CommentsService commentsService;

    @Autowired
    private ActivityService activityService;
    
    @PostMapping("/addComment/")
    public ResponseEntity<?> postComment(@RequestBody CommentRequest commentRequest, @RequestHeader("Authorization") String header) {
        String userUniqueId = commentRequest.getUserUniqueId();
        User user = userService.findByUniqueId(userUniqueId);

        if(user==null){
            throw new UserNotPresentException("Post Comment: User Not Valid");
        }

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setUser(user);
        

        if(commentRequest.getPostId() != null) {
            Post post = postsService.findById(commentRequest.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post not found"));
            comment.setPost(post);
        }

        if(commentRequest.getParentCommentId() != null) {
            Comment parentComment = commentsService.findById(commentRequest.getParentCommentId())
                .orElseThrow(() -> new PostNotFoundException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }

        Activity activity = new Activity();
        activityService.save(activity);
        comment.setActivityId(activity.getId());

        comment.setTimeStamp(commentRequest.getCreatedAt());

        commentsService.save(comment);

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(comment.getId());
        commentResponse.setUserUniqueId(comment.getUser().getUniqueId());
        commentResponse.setContent(comment.getContent());
        commentResponse.setUsername(comment.getUser().getUsername());
        commentResponse.setTimeStamp(comment.getTimeStamp());
        commentResponse.setReplyCount(activity.getComments());

        return ResponseEntity.ok(commentResponse);
    }

    @GetMapping("/post/")
    public ResponseEntity<?> getTopLevelComments(@RequestParam("postId") Long postId) {
        Post post = postsService.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("Post not found"));

        List<Comment> comments = commentsService.findByPostAndParentCommentIsNullOrderByTimeStampAsc(post);

        List<CommentResponse> commentResponses = comments.stream().map(
            comment -> {
                int replyCount = activityService.findById(comment.getActivityId())
                    .map(Activity::getComments)
                    .orElse(0);

                CommentResponse commentResponse = new CommentResponse();
                commentResponse.setId(comment.getId());
                commentResponse.setUserUniqueId(comment.getUser().getUniqueId());
                commentResponse.setContent(comment.getContent());
                commentResponse.setUsername(comment.getUser().getUsername());
                commentResponse.setTimeStamp(comment.getTimeStamp());
                commentResponse.setReplyCount(replyCount);
                return commentResponse;
            }
        ).toList();

        return ResponseEntity.ok(commentResponses);
    }

    @GetMapping("/comment/")
    public ResponseEntity<?> getReplies(@RequestParam("commentId") Long commentId) {
        Comment comment = commentsService.findById(commentId)
            .orElseThrow(() -> new PostNotFoundException("Comment not found"));

        List<Comment> replies = commentsService.findByParentCommentOrderByTimeStampAsc(comment);

        List<CommentResponse> replyResponses = replies.stream().map(
            reply -> {
                int replyCount = activityService.findById(reply.getActivityId())
                    .map(Activity::getComments)
                    .orElse(0);

                CommentResponse replyResponse = new CommentResponse();
                replyResponse.setId(reply.getId());
                replyResponse.setUserUniqueId(reply.getUser().getUniqueId());
                replyResponse.setContent(reply.getContent());
                replyResponse.setUsername(reply.getUser().getUsername());
                replyResponse.setTimeStamp(reply.getTimeStamp());
                replyResponse.setReplyCount(replyCount);
                return replyResponse;
            }
        ).toList();
        return ResponseEntity.ok(replyResponses);
    }
}

