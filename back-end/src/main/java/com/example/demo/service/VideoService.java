package com.example.demo.service;

import com.example.demo.dto.VideoDTO;
import com.example.demo.entity.VideoEntity;
import com.example.demo.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {
    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private VideoLikeService videoLikeService;

    @Autowired
    private VideoCommentService videoCommentService;

    public VideoEntity uploadVideo(Blob video, String description, String userName) {
        VideoEntity videoPost = new VideoEntity();
        videoPost.setVideo(video);
        videoPost.setDescription(description);
        videoPost.setUserName(userName);
        return videoRepository.save(videoPost);
    }
    public static String encodeToString(Blob videoBlob) {
        try {
            // Retrieve the video data as a byte array from the blob
            byte[] videoBytes = videoBlob.getBytes(1, (int) videoBlob.length());

            // Encode the byte array to a base64-encoded string
            return Base64.getEncoder().encodeToString(videoBytes);
        } catch (SQLException e) {
            // Handle SQL exception (e.g., when retrieving bytes from blob fails)
            e.printStackTrace();
            return null;
        }
    }

    public void deleteVideoPost(int id) {
        videoRepository.deleteById(id);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<VideoEntity> optionalVideoPost = videoRepository.findById(id);
        if (optionalVideoPost.isPresent()) {
            VideoEntity videoPost = optionalVideoPost.get();
            videoPost.setDescription(newDescription);
            videoRepository.save(videoPost);
        }
    }

    // Method to get all video posts
    public List<VideoDTO> getAllVideos() {
        List<VideoEntity> videoEntities = videoRepository.findAll();
        int length = videoEntities.size();
        List<VideoDTO> videos = new ArrayList<>(length);
        for (VideoEntity videoEntity : videoEntities) {
            VideoDTO video = new VideoDTO();
            int videoId = videoEntity.getId();
            video.setId(videoId);
            video.setDescription(videoEntity.getDescription());
            String userName = videoEntity.getUserName();
            video.setUserName(userName);
            Blob videoBlob = videoEntity.getVideo();
            String videoStr = encodeToString(videoBlob);
            video.setVideo(videoStr);

            int likes = videoLikeService.numberOfLikes(videoId);
            video.setLikes(likes);

            int comments = videoCommentService.numberOfComments(videoId);
            video.setComments(comments);

            String profilePhoto = userService.getProfilePhoto(userName);

            video.setProfilePicture(profilePhoto);
            videos.add(video);
        }
        return videos;
    }
}
