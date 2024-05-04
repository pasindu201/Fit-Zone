package com.example.demo.repository;

import com.example.demo.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
    @Query("SELECT u FROM MessageEntity u WHERE u.sender = :sender")
    List<MessageEntity> findBySender(String sender);

    @Query("SELECT u FROM MessageEntity u WHERE u.receiver = :receiver")
    List<MessageEntity> findByReceiver(String receiver);
}
