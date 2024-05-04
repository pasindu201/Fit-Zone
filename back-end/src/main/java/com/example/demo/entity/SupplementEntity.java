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
@Table(name = "supplements")
public class SupplementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String userName;
    @Lob
    private Blob Image;
    private String description;
    private String price;
    private String ingredients;
    private String manufacturer;
    private String brandDetails;
    private String howtoUse;
    private String flavors;
    private int comments;
}
