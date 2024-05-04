import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Chat.scss";

const Chat = ({userName ,profilePic, sender}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // Fetch chat history from the backend
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/messages/all-messages/${userName}/${sender}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, []);  

    // Handle sending a new message
    const handleSendMessage = async () => {
        try {
            const formData = new FormData();
            formData.append("sender", userName);
            formData.append("receiver", sender);
            formData.append("message", newMessage);     
            const response = await axios.post("http://localhost:8080/messages/save-message", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(response.data); // Handle success response
            alert("message sent to the", );
          } catch (error) {
            console.error("Error posting image:", error); // Handle error
            alert("Unable to post");
          }
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {/* Display chat history */}
                {messages.map((message) => (
                    <div key={message.id} className={`chat-message ${message.sender === 'currentUser' ? 'sent' : 'received'}`}>
                        <span>{message.sender}: </span>{message.message}
                    </div>
                ))}
            </div>

            {/* Text area for sending new messages */}
            <div className="chat-input">
                <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />   
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows="3"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
