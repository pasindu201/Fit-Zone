package com.example.demo.controller;

import com.example.demo.dto.WorkOutPlanDTO;
import com.example.demo.entity.ExerciseEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.WorkoutDescriptionEntity;
import com.example.demo.service.ExerciseService;
import com.example.demo.service.WorkoutDescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/exercises")
public class WorkoutPlansController
{

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private WorkoutDescriptionService workoutDescriptionService;

    // Endpoint to save a set of exercises (a workout plan) to the database
    @PostMapping("/saveExercise")
    public ResponseEntity<String> saveExercises(
            @RequestParam("workoutName") String workoutName,
            @RequestParam("exerciseName") String exerciseName,
            @RequestParam("description") String description,
            @RequestParam("Image") MultipartFile imageFile) {

        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setWorkoutPlan(workoutName);
        exercise.setExercise(exerciseName);
        exercise.setDescription(description);

        try {
            // Handle image upload
            byte[] imageBytes = imageFile.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(imageBytes);
            exercise.setImage(blobImage); // Consider storing the image as a byte array

            // Save the exercise
            exerciseService.saveExercise(exercise);

            // Return a successful response
            return ResponseEntity.status(HttpStatus.CREATED).body("Exercise saved successfully.");
        } catch (Exception e) {
            // Handle potential exceptions and return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save exercise: " + e.getMessage());
        }
    }

    @PostMapping("/saveDescription")
    public ResponseEntity<String> saveDescription(@RequestParam("workoutPlan") String workoutPlan,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("userName") String userName) {
        WorkoutDescriptionEntity workoutDescriptionEntity = new WorkoutDescriptionEntity();
        workoutDescriptionEntity.setWorkoutPlan(workoutPlan);
        workoutDescriptionEntity.setDescription(description);
        workoutDescriptionEntity.setUserName(userName);
        try{
            workoutDescriptionService.saveDescription(workoutDescriptionEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body("saved successfully.");
        }catch (Exception e) {
            // Handle potential exceptions and return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save : " + e.getMessage());
        }
    }

    // Endpoint to get a workout plan by name
    @GetMapping("/allWorkouts")
    public ResponseEntity<List<WorkOutPlanDTO>> getAllWorkoutPlans() {
        List<WorkOutPlanDTO> workOutPlans = workoutDescriptionService.allWorkouts();
        return ResponseEntity.ok(workOutPlans);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") int id) {
        workoutDescriptionService.deleteDescription(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("descriptionUpdate/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        workoutDescriptionService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated video");
    }
}