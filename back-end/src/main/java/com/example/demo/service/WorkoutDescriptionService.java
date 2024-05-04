package com.example.demo.service;

import com.example.demo.dto.ExerciseDTO;
import com.example.demo.dto.WorkOutPlanDTO;
import com.example.demo.entity.ExerciseEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.WorkoutDescriptionEntity;
import com.example.demo.repository.WorkOutDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutDescriptionService {

    @Autowired
    private WorkOutDescriptionRepository workOutDescriptionRepository;

    @Autowired
    private ExerciseService exerciseService;

    public List<WorkoutDescriptionEntity> getAllWorkoutDescriptions() {
        // Use the repository's findAll() method to fetch all WorkoutDescriptionEntity entities
        return workOutDescriptionRepository.findAll();
    }

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public List<WorkOutPlanDTO> allWorkouts() {
        List<WorkoutDescriptionEntity> workoutDescriptions = getAllWorkoutDescriptions();
        int length = workoutDescriptions.size();
        List<WorkOutPlanDTO> allWorkouts = new ArrayList<>(length);

        for (WorkoutDescriptionEntity workoutDescriptionEntity : workoutDescriptions) {
            WorkOutPlanDTO workOutPlanDTO = new WorkOutPlanDTO();

            workOutPlanDTO.setDescription(workoutDescriptionEntity.getDescription());
            String name = workoutDescriptionEntity.getWorkoutPlan();
            workOutPlanDTO.setWorkOutName(name);
            workOutPlanDTO.setUserName(workoutDescriptionEntity.getUserName());
            workOutPlanDTO.setId(workoutDescriptionEntity.getId());
            List<ExerciseEntity> exerciseEntities = exerciseService.getExercisesByWorkoutPlan(name);
            int number_of_exercises = exerciseEntities.size();
            List<ExerciseDTO> exerciseDTOList = new ArrayList<>(number_of_exercises);
            for (ExerciseEntity exerciseEntity : exerciseEntities) {
                ExerciseDTO exerciseDTO = new ExerciseDTO();
                exerciseDTO.setExerciseName(exerciseEntity.getExercise());
                exerciseDTO.setDescription(exerciseEntity.getDescription());

                Blob image = exerciseEntity.getImage();
                String strImage = encodeToString(image);
                exerciseDTO.setImage(strImage);

                exerciseDTOList.add(exerciseDTO);
            }
            workOutPlanDTO.setExerciseList(exerciseDTOList);
            allWorkouts.add(workOutPlanDTO);
        }
        return allWorkouts;
    }

    public void saveDescription(WorkoutDescriptionEntity description) {
        workOutDescriptionRepository.save(description);
    }

    public void deleteDescription(int id) {
        workOutDescriptionRepository.deleteById(id);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<WorkoutDescriptionEntity> optionalPost = workOutDescriptionRepository.findById(id);
        if (optionalPost.isPresent()) {
            WorkoutDescriptionEntity post = optionalPost.get();
            post.setDescription(newDescription);
            workOutDescriptionRepository.save(post);
        }
    }

}
