package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoCommentDTO {
    private int id;
    private String commenterName;
    private String profilePicture;
    private String comment;
}
