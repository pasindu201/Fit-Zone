package com.example.demo.repository;


import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.VideoLikeEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VideoLikeRepository extends JpaRepository<VideoLikeEntity, Integer> {

    @Query("SELECT u FROM VideoLikeEntity u WHERE u.videoId = :videoId")
    List<VideoLikeEntity> findLikeEntitiesByVideoId(int videoId);

    @Transactional
    @Modifying
    @Query("DELETE FROM VideoLikeEntity u WHERE u.likerName = :likerName AND u.videoId = :videoId")
    void deleteByLikerNameAndVideoId(String likerName, int videoId);

    @Query("SELECT u FROM VideoLikeEntity u WHERE u.likerName = :likerName AND u.videoId = :videoId")
    List<VideoLikeEntity> getLikeEntityByLikerNameAndVideoId(String likerName, int videoId);
}
