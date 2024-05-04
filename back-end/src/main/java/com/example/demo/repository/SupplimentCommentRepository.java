package com.example.demo.repository;

import com.example.demo.entity.MealPlanCommentEntity;
import com.example.demo.entity.SupplementCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplimentCommentRepository extends JpaRepository<SupplementCommentEntity, Integer> {

    @Query("SELECT u FROM SupplementCommentEntity u WHERE u.supplementId = :supplementId")
    List<SupplementCommentEntity> findCommentBySupplementId(int supplementId);
}
