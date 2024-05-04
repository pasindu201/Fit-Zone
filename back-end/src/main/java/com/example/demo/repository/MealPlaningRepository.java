package com.example.demo.repository;

import com.example.demo.entity.MealPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlaningRepository extends JpaRepository<MealPlanEntity, Integer> {
}
