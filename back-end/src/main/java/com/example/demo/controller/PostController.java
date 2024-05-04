package com.example.demo.controller;

import com.example.demo.dto.PostDTO;
import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.service.LikesService;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping()
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private LikesService likesService;

    @GetMapping("/allPosts")
    public ResponseEntity<List<PostDTO>> allPosts() {
        List<PostDTO> postDTOList = postService.getAllPosts();
        if (postDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(postDTOList);
        }
    }

    @PostMapping("setPost")
    public ResponseEntity<String> setPost(@RequestParam("userName") String userName,
                                          @RequestParam("post") MultipartFile image,
                                          @RequestParam("description") String description){
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);

            PostEntity postEntity = new PostEntity();
            postEntity.setUserName(userName);
            postEntity.setPost(blobImage);
            postEntity.setDescription(description);
            postService.savePost(postEntity);
            return ResponseEntity.ok().body("successfull");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") int id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the description of a video post
    @PatchMapping("descriptionUpdate/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        postService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated video");
    }

    @DeleteMapping("delete/{name}/{pictureId}")
    public ResponseEntity<String> deleteLike(@PathVariable("name") String name,
                                           @PathVariable("pictureId") int pictureId) {
        if (likesService.isLiked(name, pictureId)) {
            likesService.deleteLike(name, pictureId);
            return ResponseEntity.ok("deleted");
        }
        return ResponseEntity.ok("no liked");
    }

    @PostMapping("setLike")
    public ResponseEntity<String> setPost(@RequestParam("pictureId") int pictureId,
                                          @RequestParam("likerName") String likerName){
        try {
            LikeEntity like = new LikeEntity();
            like.setPictureId(pictureId);
            like.setLikerName(likerName);
            if (!likesService.isLiked(likerName, pictureId)) {
                likesService.saveLike(like);
            }
            return ResponseEntity.ok().body("successfull");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @GetMapping("isLiked/{likerName}/{postId}")
    public ResponseEntity<Boolean> checkLiked(@PathVariable("likerName") String likerName,
                                              @PathVariable("postId") int postId) {
        return ResponseEntity.ok(likesService.isLiked(likerName, postId)) ;
    }

}
