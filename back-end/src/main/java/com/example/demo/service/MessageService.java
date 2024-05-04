package com.example.demo.service;

import com.example.demo.dto.MessageDTO;
import com.example.demo.entity.MessageEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public List<MessageDTO> getAllMessages(String userName, String sender) {
        List<MessageEntity> messageEntities = messageRepository.findAll();
        int length = messageEntities.size();
        List<MessageDTO> messages = new ArrayList<>(length);
        for (MessageEntity messageEntity : messageEntities) {
            String messageSender = messageEntity.getSender();
            String messageReceiver = messageEntity.getReceiver();
            if ((messageSender.equals(userName) && messageReceiver.equals(sender)) ||
                    (messageSender.equals(sender) && messageReceiver.equals(userName))) {
                MessageDTO messageDTO = new MessageDTO();
                messageDTO.setId(messageEntity.getId());
                messageDTO.setSender(messageSender);
                messageDTO.setReceiver(messageReceiver);
                messageDTO.setMessage(messageEntity.getMessage());
                String senderProfile = userService.getProfilePhoto(messageSender);
                messageDTO.setSenderProfilePic(senderProfile);
                messages.add(messageDTO);
            }

        }
        return messages;
    }

    public void saveMessage(MessageEntity messageEntity) {
        messageRepository.save(messageEntity);
    }

    public void deleteMessage(int messageId) {
        messageRepository.deleteById(messageId);
    }
}
