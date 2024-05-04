package com.example.demo.controller;

import com.example.demo.dto.MealPlanDTO;
import com.example.demo.entity.MealPlanEntity;
import com.example.demo.service.MealPlanningService;
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
public class MealPlansController {

    @Autowired
    MealPlanningService mealPlanningService;

    @GetMapping("/allMealPlanes")
    public ResponseEntity<List<MealPlanDTO>> allMealPlans() {
        List<MealPlanDTO> mealPlanDTOList = mealPlanningService.allMealPlanes();
        if (mealPlanDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(mealPlanDTOList);
        }
    }

    @PostMapping("/shareMealPlan")
    public ResponseEntity<String> setPost(@RequestParam("userName") String userName,
                                          @RequestParam("post") MultipartFile image,
                                          @RequestParam("mealName") String mealName,
                                          @RequestParam("description") String description,
                                          @RequestParam("recipe") String recipe,
                                          @RequestParam("portion") String portion,
                                          @RequestParam("mealSchedule") String mealSchedule,
                                          @RequestParam("nutrition") String nutrition,
                                          @RequestParam("vegetarian") boolean vegetarian,
                                          @RequestParam("vegan") boolean vegan,
                                          @RequestParam("glutenFree") boolean glutenFree,
                                          @RequestParam("dairyFree") boolean dairyFree,
                                          @RequestParam("nutFree") boolean nutFree
                                          ){
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);

            MealPlanEntity mealPlanEntity = new MealPlanEntity();

            mealPlanEntity.setUserName(userName);
            mealPlanEntity.setPost(blobImage);
            mealPlanEntity.setMealName(mealName);
            mealPlanEntity.setDescription(description);
            mealPlanEntity.setRecipe(recipe);
            mealPlanEntity.setPortion(portion);
            mealPlanEntity.setSchedule(mealSchedule);
            mealPlanEntity.setNutrition(nutrition);

            mealPlanEntity.setVegetarian(vegetarian);
            mealPlanEntity.setVegan(vegan);
            mealPlanEntity.setGlutenFree(glutenFree);
            mealPlanEntity.setDairyFree(dairyFree);
            mealPlanEntity.setNutFree(nutFree);

            mealPlanningService.saveMealPlan(mealPlanEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @PatchMapping("descriptionUpdateMeal/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        mealPlanningService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated description");
    }

    @PatchMapping("name/{id}/{name}")
    public ResponseEntity<String> updateMealName(@PathVariable("id") int id,
                                                    @PathVariable("name") String newName) {
        mealPlanningService.updateMealName(id, newName);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("recipe/{id}/{recipe}")
    public ResponseEntity<String> updateRecipe(@PathVariable("id") int id,
                                                    @PathVariable("recipe") String newRecipe) {
        mealPlanningService.updateRecipe(id, newRecipe);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("schedule/{id}/{schedule}")
    public ResponseEntity<String> updateSchedule(@PathVariable("id") int id,
                                               @PathVariable("schedule") String schedule) {
        mealPlanningService.updateSchedule(id, schedule);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("nutrition/{id}/{nutrition}")
    public ResponseEntity<String> updateNutrition(@PathVariable("id") int id,
                                                 @PathVariable("nutrition") String nutrition) {
        mealPlanningService.updateNutritionalBenefits(id, nutrition);
        return ResponseEntity.ok("Successfully updated video");
    }

    @DeleteMapping("deleteMeal/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable("id") int id) {
        mealPlanningService.deleteMealPlan(id);
        return ResponseEntity.noContent().build();
    }
}
