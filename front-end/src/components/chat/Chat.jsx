import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.scss';

const Chat = ({ userName, profilePic, sender }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        position: { x: 0, y: 0 },
        messageId: null,
    });

    // Fetch chat history from the backend
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/messages/all-messages/${userName}/${sender}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            alert('Failed to fetch chat messages.');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [userName, sender]);

    // Handle sending a new message
    const handleSendMessage = async () => {
        try {
            const formData = new FormData();
            formData.append('sender', userName);
            formData.append('receiver', sender);
            formData.append('message', newMessage);

            const response = await axios.post('http://localhost:8080/messages/save-message', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setNewMessage(''); // Clear newMessage
            fetchMessages(); // Refresh chat history
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };

    // Delete a message
    const deleteMessage = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/messages/delete-message/${id}`);
            fetchMessages(); // Refresh chat history
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
        }
    };

    // Handle right-click (contextmenu) event
    const handleContextMenu = (event, messageId) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            position: { x: event.clientX, y: event.clientY },
            messageId, // Set the ID of the message
        });
    };

    // Handle context menu options
    const handleCopyOption = async (messageId) => {
        const message = messages.find((msg) => msg.id === messageId);
        try {
            await navigator.clipboard.writeText(message.message);
            alert('Message copied to clipboard');
        } catch (error) {
            console.error('Failed to copy message:', error);
            alert('Failed to copy message.');
        }
        setContextMenu({ visible: false, position: { x: 0, y: 0 }, messageId: null });
    };

    const handleDeleteOption = async (messageId) => {
        deleteMessage(messageId);
        setContextMenu({ visible: false, position: { x: 0, y: 0 }, messageId: null });
    };

    // Hide context menu on click outside
    const handleClickOutside = (event) => {
        // Check if the click is outside the context menu
        if (contextMenu.visible && !event.target.closest('.context-menu')) {
            setContextMenu({ visible: false, position: { x: 0, y: 0 }, messageId: null });
        }
    };

    return (
        <div className="chat-container" onClick={handleClickOutside}>
            <div className="chat-history">
                {/* Display chat history */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.sender === userName ? 'sent' : 'received'}`}
                        onContextMenu={(e) => handleContextMenu(e, message.id)}
                    >
                        <div className="userInfo">
                            <img
                                src={`data:image/jpeg;base64,${message.senderProfilePic}`}
                                alt={`${message.sender}'s profile`}
                                className="profile-picture"
                            />
                            <span>{message.sender}</span>
                        </div>
                        <span className='message'>{message.message}</span>

                        {/* Render custom context menu */}
                        {contextMenu.visible && contextMenu.messageId === message.id && (
                            <ul
                                className="context-menu"
                                style={{
                                    position: 'absolute',
                                    top: `${contextMenu.position.y}px`,
                                    left: `${contextMenu.position.x}px`,
                                }}
                            >
                                <li onClick={() => handleCopyOption(contextMenu.messageId)}>Copy</li>
                                <li onClick={() => handleDeleteOption(contextMenu.messageId)}>Delete</li>
                            </ul>
                        )}
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
