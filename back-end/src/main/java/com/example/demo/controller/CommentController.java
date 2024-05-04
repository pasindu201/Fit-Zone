package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentsService commentsService;

    @GetMapping("/numberOfComments/{pictureId}")
    public ResponseEntity<Integer> numberOfComments(@PathVariable("pictureId") int pictureId) {
        int numberOfComments = commentsService.numberOfComments(pictureId);
        if (numberOfComments >= 0) {
            return ResponseEntity.ok(numberOfComments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allComments/{pictureId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable("pictureId") int pictureId) {
        List<CommentDTO> commentDTOList = commentsService.getComments(pictureId);
        if (commentDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(commentDTOList);
        }
    }

    @PostMapping("/saveComment")
    public ResponseEntity<String> saveComment(@RequestParam("pictureId") int pictureId,
                                              @RequestParam("commenterName") String commenterName,
                                              @RequestParam("comment") String comment) {
        try {
            CommentEntity commentEntity = new CommentEntity();
            commentEntity.setPictureId(pictureId);
            commentEntity.setCommenterName(commenterName);
            commentEntity.setComment(comment);
            commentsService.saveComment(commentEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }

    }
}
