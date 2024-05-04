package com.example.demo.repository;

import com.example.demo.entity.VideoCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoCommentRepository extends JpaRepository<VideoCommentEntity, Integer> {

    @Query("SELECT u FROM VideoCommentEntity u WHERE u.videoId = :videoId")
    List<VideoCommentEntity> findCommentsByVideoId(int videoId);
}
