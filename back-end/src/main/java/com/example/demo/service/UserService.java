package com.example.demo.service;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUser(UserEntity user) {
        userRepository.save(user);
    }

    public void deleteUser(String userName, String password) {
        userRepository.deleteByUserNameAndPassword(userName, password);
    }

    public String getProfilePhoto(String userName) {
        List<UserEntity> users = userRepository.findByUserName(userName);
        UserEntity user = users.get(0);
        if (user != null && user.getProfilePicture() != null) {
            Blob profilePicture = user.getProfilePicture();
            try {
                byte[] imgBytes = profilePicture.getBytes(1, (int) profilePicture.length());
                return Base64.getEncoder().encodeToString(imgBytes);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
        return null;
    }

    public boolean verifyPassword(String userName, String password) {
        UserEntity user = userRepository.findByUserNameAndPassword(userName, password);
        return user != null;
    }

    public List<String> allUserNames(){
        List<UserEntity> userEntities = userRepository.findAll();
        int length = userEntities.size();
        List<String> names = new ArrayList<>(length);
        for (UserEntity user : userEntities) {
            names.add(user.getUserName());
        }
        return names;
    }
}
