package com.example.demo.service;

import com.example.demo.entity.LikeEntity;
import com.example.demo.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;

    public int numberOfLikes(int pictureId) {
        List<LikeEntity> likesRepositories = likesRepository.findLikeEntitiesByPictureId(pictureId);
        int numberOfLikes = likesRepositories.size();
        return numberOfLikes;
    }
}
