package com.example.demo.controller;

import com.example.demo.dto.SupplementDTO;
import com.example.demo.entity.SupplementEntity;
import com.example.demo.service.SupplementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/supplements")
public class SupplementController {

    @Autowired
    private SupplementService supplementService;

    // Endpoint to save a supplement
    @PostMapping("/save")
    public ResponseEntity<String> saveSupplement(@RequestParam("userName") String userName,
                                                           @RequestParam("post") MultipartFile image,
                                                           @RequestParam("supplementName") String supplementName,
                                                           @RequestParam("description") String description,
                                                           @RequestParam("price") String price,
                                                           @RequestParam("ingredients") String ingredients,
                                                           @RequestParam("manufacturer") String manufacturer,
                                                           @RequestParam("brandDetails") String brandDetails,
                                                           @RequestParam("howToUse") String howToUse,
                                                           @RequestParam("flavours") String flavours) {
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);
            SupplementEntity newSupplement = new SupplementEntity();

            newSupplement.setUserName(userName);
            newSupplement.setImage(blobImage);
            newSupplement.setName(supplementName);
            newSupplement.setDescription(description);
            newSupplement.setPrice(price);
            newSupplement.setIngredients(ingredients);
            newSupplement.setManufacturer(manufacturer);
            newSupplement.setBrandDetails(brandDetails);
            newSupplement.setHowtoUse(howToUse);
            newSupplement.setFlavors(flavours);

            supplementService.saveSupplement(newSupplement);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    // Endpoint to get all supplements
    @GetMapping("/all")
    public ResponseEntity<List<SupplementDTO>> getAllSupplements() {
        List<SupplementDTO> supplements = supplementService.getAllSupplements();
        return ResponseEntity.ok(supplements);
    }
}