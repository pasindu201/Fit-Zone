package com.example.demo.controller;

import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping()
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestParam("profilePicture") MultipartFile image,
                                             @RequestParam("name") String name,
                                             @RequestParam("userName") String userName,
                                             @RequestParam("password") String password) {
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);

            UserEntity user = new UserEntity();
            user.setName(name);
            user.setUserName(userName);
            user.setPassword(password);
            user.setProfilePicture(blobImage);
            userService.createUser(user);
            return ResponseEntity.ok().body("User profile created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam("userName") String userName, @RequestParam("password") String password) {
        userService.deleteUser(userName, password);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profile-photo/{userName}")
    public ResponseEntity<String> getProfilePhoto(@PathVariable("userName") String userName) {
        String profilePhoto = userService.getProfilePhoto(userName);
        if (profilePhoto != null) {
            return ResponseEntity.ok(profilePhoto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("verify/{userName}/{password}")
    public ResponseEntity<Boolean> verifyuser(@PathVariable("userName") String userName, @PathVariable("password") String password) {
        boolean isValid = userService.verifyPassword(userName, password);
        return ResponseEntity.ok(isValid);

    }
}
