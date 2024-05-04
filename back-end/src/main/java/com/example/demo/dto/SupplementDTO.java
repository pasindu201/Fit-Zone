package com.example.demo.dto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplementDTO {
    private int id;
    private String name;
    private String Image;
    private String description;
    private String price;
    private String ingredients;
    private String manufacturer;
    private String brandDetails;
    private String howtoUse;
    private String flavors;
    private int comments;
}
