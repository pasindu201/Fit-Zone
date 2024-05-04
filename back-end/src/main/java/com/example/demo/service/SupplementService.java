package com.example.demo.service;

import com.example.demo.dto.SupplementDTO;
import com.example.demo.entity.SupplementCommentEntity;
import com.example.demo.entity.SupplementEntity;
import com.example.demo.repository.SupplementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class SupplementService {

    @Autowired
    private SupplementRepository supplementRepository;

    @Autowired
    private SupplementCommentService supplementCommentService;

    // Method to save a supplement
    public void saveSupplement(SupplementEntity supplement) {
        supplementRepository.save(supplement);
    }

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    // Method to get all supplements
    public List<SupplementDTO> getAllSupplements() {
        List<SupplementEntity> supplementEntities = supplementRepository.findAll();
        int length =supplementEntities.size();

        List<SupplementDTO> supplementDTOS = new ArrayList<>(length);
        for (SupplementEntity supplement : supplementEntities) {
            SupplementDTO supplementDTO = new SupplementDTO();
            int supplementId = supplement.getId();
            supplementDTO.setId(supplementId);
            supplementDTO.setName(supplement.getName());

            Blob blobImage = supplement.getImage();  // convert image to string
            String stringImage = encodeToString(blobImage);
            supplementDTO.setImage(stringImage);

            supplementDTO.setDescription(supplement.getDescription());
            supplementDTO.setPrice(supplement.getPrice());
            supplementDTO.setManufacturer(supplement.getManufacturer());
            supplementDTO.setBrandDetails(supplement.getBrandDetails());
            supplementDTO.setHowtoUse(supplement.getHowtoUse());
            supplementDTO.setFlavors(supplement.getFlavors());
            supplementDTO.setIngredients(supplement.getIngredients());

            int comments = supplementCommentService.numberOfComments(supplementId);
            supplementDTO.setComments(comments);
            supplementDTOS.add(supplementDTO);
        }
        return supplementDTOS;
    }
}