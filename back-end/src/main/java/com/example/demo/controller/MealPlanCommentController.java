package com.example.demo.controller;

import com.example.demo.dto.MealPlanCommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.MealPlanCommentEntity;
import com.example.demo.service.MealPlanCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mealPlanComments")
public class MealPlanCommentController {
    @Autowired
    private MealPlanCommentService commentsService;

    @GetMapping("/numberOfComments/{mealPlanId}")
    public ResponseEntity<Integer> numberOfComments(@PathVariable("mealPlanId") int mealPlanId) {
        int numberOfComments = commentsService.numberOfComments(mealPlanId);
        if (numberOfComments >= 0) {
            return ResponseEntity.ok(numberOfComments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allComments/{mealPlanId}")
    public ResponseEntity<List<MealPlanCommentDTO>> getComments(@PathVariable("mealPlanId") int mealPlanId) {
        List<MealPlanCommentDTO> commentDTOList = commentsService.getComments(mealPlanId);
        if (commentDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(commentDTOList);
        }
    }

    @PostMapping("/saveComment")
    public ResponseEntity<String> saveComment(@RequestParam("mealPlanId") int mealPlanId,
                                              @RequestParam("commenterName") String commenterName,
                                              @RequestParam("comment") String comment) {
        try {
            MealPlanCommentEntity commentEntity = new MealPlanCommentEntity();
            commentEntity.setMealPlanId(mealPlanId);
            commentEntity.setCommenterName(commenterName);
            commentEntity.setComment(comment);
            commentsService.saveComment(commentEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }

    }
}
