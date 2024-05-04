package com.example.demo.service;

import com.example.demo.entity.LikeEntity;
import com.example.demo.entity.VideoLikeEntity;
import com.example.demo.repository.VideoLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoLikeService {

    @Autowired
    private VideoLikeRepository likesRepository;

    public int numberOfLikes(int videoId) {
        List<VideoLikeEntity> likesRepositories = likesRepository.findLikeEntitiesByVideoId(videoId);
        int numberOfLikes = likesRepositories.size();
        return numberOfLikes;
    }

    public void saveLike(VideoLikeEntity like) {
        likesRepository.save(like);
    }

    public void deleteLike(String name, int videoId) {
        likesRepository.deleteByLikerNameAndVideoId(name, videoId);
    }

    public boolean isLiked(String name , int videoId) {
        List<VideoLikeEntity> likes = likesRepository.getLikeEntityByLikerNameAndVideoId(name, videoId);
        return !likes.isEmpty();
    }
}
