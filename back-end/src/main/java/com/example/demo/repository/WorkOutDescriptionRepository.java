package com.example.demo.repository;

import com.example.demo.entity.WorkoutDescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOutDescriptionRepository extends JpaRepository<WorkoutDescriptionEntity, Integer> {

}
