package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.MealPlanCommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.MealPlanCommentEntity;
import com.example.demo.repository.MealPlanCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealPlanCommentService {

    @Autowired
    private MealPlanCommentRepository mealPlanCommentRepository;

    @Autowired
    private UserService userService;

    public int numberOfComments(int mealPlanId) {
        List<MealPlanCommentEntity> commentEntityList = mealPlanCommentRepository.findCommentByMealPlanId(mealPlanId);
        int length = commentEntityList.size(); // number of comments
        return length;
    }

    public void saveComment(MealPlanCommentEntity mealPlanComment) {
        mealPlanCommentRepository.save(mealPlanComment);
    }

    public List<MealPlanCommentDTO> getComments(int mealPlanId) {
        // get all the comments of the mealPan by mealPlan id.
        List<MealPlanCommentEntity> commentEntityList = mealPlanCommentRepository.findCommentByMealPlanId(mealPlanId);
        int length = commentEntityList.size(); // number of comments

        // initiate a commentDTO list
        List<MealPlanCommentDTO> commentsList = new ArrayList<>(length);
        for (MealPlanCommentEntity commentEntity : commentEntityList) {
            MealPlanCommentDTO comment = new MealPlanCommentDTO();
            comment.setId(commentEntity.getId());
            String commenterName = commentEntity.getCommenterName(); // Corrected line
            comment.setCommenterName(commenterName);

            // get profile picture of commenter.
            String profilePicture = userService.getProfilePhoto(commenterName);
            comment.setProfilePic(profilePicture);
            comment.setComment(commentEntity.getComment()); // Corrected line
            commentsList.add(comment);
        }
        return commentsList;
    }

    public void deleteComment(int commentId) {
        mealPlanCommentRepository.deleteById(commentId);
    }
}
