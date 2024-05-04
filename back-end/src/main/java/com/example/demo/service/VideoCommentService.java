package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.VideoCommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VideoCommentEntity;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VideoCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class VideoCommentService {
    @Autowired
    private VideoCommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public List<VideoCommentDTO> getComments(int videoId) {
        // get all the comments of the picture by picture id.
        List<VideoCommentEntity> commentEntityList = commentRepository.findCommentsByVideoId(videoId);
        int length = commentEntityList.size(); // number of comments

        // initiate a commentDTO list
        List<VideoCommentDTO> commentsList = new ArrayList<>(length);
        for (VideoCommentEntity commentEntity : commentEntityList) {
            VideoCommentDTO comment = new VideoCommentDTO();
            String commenterName = commentEntity.getCommenterName(); // Corrected line
            comment.setCommenterName(commenterName);
            comment.setId(commentEntity.getId());
            // get profile picture of commenter.
            String profilePicture = userService.getProfilePhoto(commenterName);
            comment.setProfilePicture(profilePicture);
            comment.setComment(commentEntity.getComment()); // Corrected line
            commentsList.add(comment);
        }
        return commentsList;
    }

    public int numberOfComments(int videoId) {
        List<VideoCommentEntity> commentEntityList = commentRepository.findCommentsByVideoId(videoId);
        int length = commentEntityList.size(); // number of comments
        return length;
    }

    public void saveComment(VideoCommentEntity comment) {
        commentRepository.save(comment);
    }

    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
