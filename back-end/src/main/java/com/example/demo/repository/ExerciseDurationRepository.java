package com.example.demo.repository;

import com.example.demo.entity.ExerciseDurationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDurationRepository extends JpaRepository<ExerciseDurationEntity, Integer> {

    @Query("SELECT u FROM ExerciseDurationEntity u WHERE u.userName = :userName ")
    List<ExerciseDurationEntity> findByUserName(String userName);

}
