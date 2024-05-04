package com.example.demo.controller;

import com.example.demo.dto.PostDTO;
import com.example.demo.dto.VideoDTO;
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
}
