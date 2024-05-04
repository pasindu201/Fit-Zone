package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkOutPlanDTO {
    private int id;
    private String userName;
    private String workOutName;
    private String description;
    private List<ExerciseDTO> exerciseList;
}
