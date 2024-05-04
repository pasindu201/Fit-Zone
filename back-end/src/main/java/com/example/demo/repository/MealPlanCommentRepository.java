package com.example.demo.repository;

import com.example.demo.entity.MealPlanCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanCommentRepository extends JpaRepository<MealPlanCommentEntity, Integer> {

    @Query("SELECT u FROM MealPlanCommentEntity u WHERE u.mealPlanId = :mealPlanId")
    List<MealPlanCommentEntity> findCommentByMealPlanId(int mealPlanId);
}
