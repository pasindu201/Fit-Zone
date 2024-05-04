package com.example.demo.service;

import com.example.demo.dto.SupplementCommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.SupplementCommentEntity;
import com.example.demo.repository.SupplimentCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupplementCommentService {

    @Autowired
    private SupplimentCommentRepository supplimentCommentRepository;

    @Autowired UserService userService;

    public List<SupplementCommentDTO> findCommentsBySupplementId(int supplementId) {
        List<SupplementCommentEntity> commentsList = supplimentCommentRepository.findCommentBySupplementId(supplementId);
        int length = commentsList.size();
        List<SupplementCommentDTO> supplementCommentDTOS = new ArrayList<>(length);
        for (SupplementCommentEntity supplementComment : commentsList) {
            SupplementCommentDTO supplementCommentDTO = new SupplementCommentDTO();
            String commenterName = supplementComment.getCommenterName();
            supplementCommentDTO.setCommenterName(commenterName);
            supplementCommentDTO.setComment(supplementComment.getComment());

            String profilePicture = userService.getProfilePhoto(commenterName);
            supplementCommentDTO.setProfilePic(profilePicture);

            supplementCommentDTOS.add(supplementCommentDTO);
        }
        return supplementCommentDTOS;
    }

    public int numberOfComments(int supplementId) {
        List<SupplementCommentEntity> commentsList = supplimentCommentRepository.findCommentBySupplementId(supplementId);
        return commentsList.size();
    }

    public void saveComment(SupplementCommentEntity comment) {
        supplimentCommentRepository.save(comment);
    }
}
