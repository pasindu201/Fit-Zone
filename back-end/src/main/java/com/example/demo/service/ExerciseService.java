package com.example.demo.service;

import com.example.demo.dto.ExerciseDTO;
import com.example.demo.dto.WorkOutPlanDTO;
import com.example.demo.entity.ExerciseEntity;
import com.example.demo.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    // Method to save a set of exercises (a workout plan) to the database
    public void saveExercise(ExerciseEntity exercise) {
        exerciseRepository.save(exercise);
    }

    // Method to get all exercises by workout plan
    public List<ExerciseEntity> getExercisesByWorkoutPlan(String workoutPlan) {
        return exerciseRepository.findByWorkoutPlan(workoutPlan);
    }

}