package com.example.demo.controller;

import com.example.demo.dto.PostDTO;
import com.example.demo.dto.VideoDTO;
import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.VideoLikeEntity;
import com.example.demo.service.VideoLikeService;
import com.example.demo.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    VideoLikeService videoLikeService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideoPost(@RequestParam("video") MultipartFile video,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("userName") String userName) {
        try {

            byte[] videoBytes = video.getBytes();

            Blob blobVideo = new SerialBlob(videoBytes);

            videoService.uploadVideo(blobVideo, description, userName);

            return ResponseEntity.ok("Successfully uploaded video");
        } catch (IOException | SQLException e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload video");
        }
    }

    // Endpoint to delete a video post by ID
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteVideoPost(@PathVariable("id") int id) {
        videoService.deleteVideoPost(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the description of a video post
    @PatchMapping("descriptionUpdate/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        videoService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated video");
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<VideoDTO>> getAllVideos() {
        List<VideoDTO> videoDTOList = videoService.getAllVideos();
        if (videoDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(videoDTOList);
        }
    }

    @DeleteMapping("delete/{name}/{videoId}")
    public ResponseEntity<String> deleteLike(@PathVariable("name") String name,
                                             @PathVariable("videoId") int videoId) {
        if (videoLikeService.isLiked(name, videoId)) {
            videoLikeService.deleteLike(name, videoId);
            return ResponseEntity.ok("deleted");
        }
        return ResponseEntity.ok("no liked");
    }

    @PostMapping("setLike")
    public ResponseEntity<String> setPost(@RequestParam("videoId") int videoId,
                                          @RequestParam("likerName") String likerName){
        try {
            VideoLikeEntity like = new VideoLikeEntity();
            like.setVideoId(videoId);
            like.setLikerName(likerName);
            if (!videoLikeService.isLiked(likerName, videoId)) {
                videoLikeService.saveLike(like);
            }
            return ResponseEntity.ok().body("successfull");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @GetMapping("isLiked/{likerName}/{videoId}")
    public ResponseEntity<Boolean> checkLiked(@PathVariable("likerName") String likerName,
                                              @PathVariable("videoId") int videoId) {
        return ResponseEntity.ok(videoLikeService.isLiked(likerName, videoId)) ;
    }
}
