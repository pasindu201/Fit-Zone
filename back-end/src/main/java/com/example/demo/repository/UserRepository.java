package com.example.demo.repository;

import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query("SELECT u FROM UserEntity u WHERE u.userName = :userName AND u.password = :password")
    UserEntity findByUserNameAndPassword(String userName, String password);

    @Query("DELETE FROM UserEntity u WHERE u.userName = :userName AND u.password = :password")
    void deleteByUserNameAndPassword(String userName, String password);

    @Query("SELECT u FROM UserEntity u WHERE u.userName = :userName")
    List<UserEntity> findByUserName(String userName);
}
