package com.example.demo.repository;

import com.example.demo.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LikesRepository extends JpaRepository<LikeEntity, Integer> {

    @Query("SELECT u FROM LikeEntity u WHERE u.pictureId = :pictureId")
    List<LikeEntity> findLikeEntitiesByPictureId(int pictureId);
}
