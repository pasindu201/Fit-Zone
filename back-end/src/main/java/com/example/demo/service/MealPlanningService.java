package com.example.demo.service;

import com.example.demo.dto.MealPlanDTO;
import com.example.demo.entity.MealPlanCommentEntity;
import com.example.demo.entity.MealPlanEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.repository.MealPlanCommentRepository;
import com.example.demo.repository.MealPlaningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class MealPlanningService {

    @Autowired
    private MealPlaningRepository mealPlaningRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MealPlanCommentService mealPlanCommentService;

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }


    public List<MealPlanDTO> allMealPlanes() {
        List<MealPlanEntity> mealPlanEntities = mealPlaningRepository.findAll();
        int length = mealPlanEntities.size();

        List<MealPlanDTO> mealPlanDTOS = new ArrayList<>(length);

        for (MealPlanEntity mealPlan : mealPlanEntities) {
            MealPlanDTO mealPlanDTO = new MealPlanDTO();

            String userName = mealPlan.getUserName();
            int mealPlanId = mealPlan.getId();

            mealPlanDTO.setUserName(userName);
            mealPlanDTO.setMealName(mealPlan.getMealName());
            mealPlanDTO.setDescription(mealPlan.getDescription());
            mealPlanDTO.setNutrition(mealPlan.getNutrition());
            mealPlanDTO.setRecipe(mealPlan.getRecipe());
            mealPlanDTO.setId(mealPlanId);
            mealPlanDTO.setPortion(mealPlan.getPortion());
            mealPlanDTO.setSchedule(mealPlan.getSchedule());

            mealPlanDTO.setVegetarian(mealPlan.isVegetarian());
            mealPlanDTO.setVegan(mealPlan.isVegan());
            mealPlanDTO.setGlutenFree(mealPlan.isGlutenFree());
            mealPlanDTO.setDairyFree(mealPlan.isDairyFree());
            mealPlanDTO.setNutFree(mealPlan.isNutFree());

            String userProfilePicture = userService.getProfilePhoto(userName);
            mealPlanDTO.setUserProfilePicture(userProfilePicture);

            int comments = mealPlanCommentService.numberOfComments(mealPlanId);
            mealPlanDTO.setComments(comments);

            Blob post = mealPlan.getPost();
            String image = encodeToString(post);
            mealPlanDTO.setPost(image);

            mealPlanDTOS.add(mealPlanDTO);
        }
        return mealPlanDTOS;
    }

    public void saveMealPlan(MealPlanEntity mealPlanEntity) {
        mealPlaningRepository.save(mealPlanEntity);
    }

    public void deleteMealPlan(int id) {
        mealPlaningRepository.deleteById(id);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<MealPlanEntity> optionalMealPlan = mealPlaningRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlanEntity mealPlan = optionalMealPlan.get();
            mealPlan.setDescription(newDescription);
            mealPlaningRepository.save(mealPlan);
        }
    }
    public void updateRecipe(int id, String newRecipe) {
        Optional<MealPlanEntity> optionalMealPlan = mealPlaningRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlanEntity mealPlan = optionalMealPlan.get();
            mealPlan.setRecipe(newRecipe);
            mealPlaningRepository.save(mealPlan);
        }
    }
    public void updateMealName(int id, String newName) {
        Optional<MealPlanEntity> optionalMealPlan = mealPlaningRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlanEntity mealPlan = optionalMealPlan.get();
            mealPlan.setMealName(newName);
            mealPlaningRepository.save(mealPlan);
        }
    }

    public void updateNutritionalBenefits(int id, String newNutrition) {
        Optional<MealPlanEntity> optionalMealPlan = mealPlaningRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlanEntity mealPlan = optionalMealPlan.get();
            mealPlan.setNutrition(newNutrition);
            mealPlaningRepository.save(mealPlan);
        }
    }
    public void updateSchedule(int id, String newSchedule) {
        Optional<MealPlanEntity> optionalMealPlan = mealPlaningRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlanEntity mealPlan = optionalMealPlan.get();
            mealPlan.setSchedule(newSchedule);
            mealPlaningRepository.save(mealPlan);
        }
    }
}
