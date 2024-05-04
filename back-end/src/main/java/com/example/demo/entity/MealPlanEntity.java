package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "meal_planes")
public class MealPlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;
    private String mealName;
    @Lob
    private Blob post;
    private String description;
    private String recipe;
    private String nutrition;
    private String portion;
    private String schedule;
    // Dietary preferences
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    private boolean nutFree;

}
