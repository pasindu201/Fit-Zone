package com.example.demo.repository;

import com.example.demo.entity.SupplementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplementRepository extends JpaRepository<SupplementEntity, Integer> {
}
