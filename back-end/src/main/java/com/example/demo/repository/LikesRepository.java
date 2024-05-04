package com.example.demo.repository;

import com.example.demo.entity.LikeEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LikesRepository extends JpaRepository<LikeEntity, Integer> {

    @Query("SELECT u FROM LikeEntity u WHERE u.pictureId = :pictureId")
    List<LikeEntity> findLikeEntitiesByPictureId(int pictureId);

    @Transactional
    @Modifying
    @Query("DELETE FROM LikeEntity u WHERE u.likerName = :likerName AND u.pictureId = :pictureId")
    void deleteByLikerNameAndPictureId(String likerName, int pictureId);

    @Query("SELECT u FROM LikeEntity u WHERE u.likerName = :likerName AND u.pictureId = :pictureId")
    List<LikeEntity> getLikeEntityByLikerNameAndPictureId(String likerName, int pictureId);
}
