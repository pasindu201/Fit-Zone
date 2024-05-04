package com.example.demo.repository;

import com.example.demo.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<ExerciseEntity, Integer> {

    @Query("SELECT u FROM ExerciseEntity u WHERE u.workoutPlan = :workoutPlan")
    List<ExerciseEntity> findByWorkoutPlan(String workoutPlan);
}
