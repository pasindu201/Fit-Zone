package com.example.demo.controller;

import com.example.demo.dto.MessageDTO;
import com.example.demo.entity.MessageEntity;
import com.example.demo.service.MessageService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/save-message")
    public ResponseEntity<String> saveMessage(@RequestParam("sender") String senderName,
                                              @RequestParam("receiver") String receiverName,
                                              @RequestParam("message") String message) {
        try {
            MessageEntity messageEntity = new MessageEntity();
            messageEntity.setReceiver(receiverName);
            messageEntity.setSender(senderName);
            messageEntity.setMessage(message);
            messageService.saveMessage(messageEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }

    }

    @DeleteMapping("/delete-message/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable("id") int id) {
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all-messages/{userName}/{sender}")
    public ResponseEntity<List<MessageDTO>> getMessagesByUserName(@PathVariable("userName") String userName,
                                                                  @PathVariable("sender") String sender){
        return ResponseEntity.ok(messageService.getAllMessages(userName, sender));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<String>> getAllUserNames(){
        return ResponseEntity.ok(userService.allUserNames());
    }
}
