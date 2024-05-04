package com.example.demo.service;

import com.example.demo.dto.PostDTO;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.VideoEntity;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LikesService likesService;

    @Autowired
    private CommentsService commentsService;

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public List<PostDTO> getAllPosts() {
        // get all the posts.
        List<PostEntity> postEntityList = postRepository.findAll();

        int length = postEntityList.size();

        // initiate postDTO list to fill with data.
        List<PostDTO> postDTOS = new ArrayList<>(length);

        for (PostEntity postEntity : postEntityList) {
            int pictureId = postEntity.getId();
            String userName = postEntity.getUserName();
            String post = encodeToString(postEntity.getPost());
            String profilePicture = userService.getProfilePhoto(userName);
            int likes = likesService.numberOfLikes(pictureId);
            int comments = commentsService.numberOfComments(pictureId);
            String description = postEntity.getDescription();

            // This postDTO stores the data related one post.
            PostDTO postDTO = new PostDTO();

            postDTO.setId(pictureId);
            postDTO.setUserName(userName);
            postDTO.setProfilePicture(profilePicture);
            postDTO.setPost(post);
            postDTO.setLikes(likes);
            postDTO.setComments(comments);
            postDTO.setDescription(description);

            postDTOS.add(postDTO);
        }
        return postDTOS;
    }

    public void savePost(PostEntity postEntity) {
        postRepository.save(postEntity);
    }

    public void deletePost(int pictureId) {
        postRepository.deleteById(pictureId);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<PostEntity> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            PostEntity post = optionalPost.get();
            post.setDescription(newDescription);
            postRepository.save(post);
        }
    }
}
