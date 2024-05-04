package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.SupplementCommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.SupplementCommentEntity;
import com.example.demo.service.CommentsService;
import com.example.demo.service.SupplementCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/supplement-comments")
public class SupplementCommentController {

    @Autowired
    private SupplementCommentService commentsService;

    @GetMapping("/numberOfComments/{supplementId}")
    public ResponseEntity<Integer> numberOfComments(@PathVariable("supplementId") int supplementId) {
        int numberOfComments = commentsService.numberOfComments(supplementId);
        if (numberOfComments >= 0) {
            return ResponseEntity.ok(numberOfComments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allComments/{supplementId}")
    public ResponseEntity<List<SupplementCommentDTO>> getComments(@PathVariable("supplementId") int supplementId) {
        List<SupplementCommentDTO> commentDTOList = commentsService.findCommentsBySupplementId(supplementId);
        if (commentDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(commentDTOList);
        }
    }

    @PostMapping("/saveComment")
    public ResponseEntity<String> saveComment(@RequestParam("supplementId") int supplementId,
                                              @RequestParam("commenterName") String commenterName,
                                              @RequestParam("comment") String comment) {
        try {
            SupplementCommentEntity commentEntity = new SupplementCommentEntity();
            commentEntity.setSupplementId(supplementId);
            commentEntity.setCommenterName(commenterName);
            commentEntity.setComment(comment);
            commentsService.saveComment(commentEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }

    }
}
