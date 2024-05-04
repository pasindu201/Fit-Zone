package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDTO {
    private int Id;
    private String userName;
    private String profilePicture;
    private String description;
    private String video;
}
