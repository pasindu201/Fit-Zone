package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private int id;
    private String userName;
    private String profilePicture;
    private String post;
    private String description;
    private int likes;
    private int comments;
}
