package com.example.demo.repository;

import com.example.demo.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query("SELECT u FROM CommentEntity u WHERE u.pictureId = :pictureId")
    List<CommentEntity> findCommentsByPictureId(int pictureId);
}
