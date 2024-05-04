import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Chat.scss";

const Chat = ({userName ,profilePic, sender}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        position: { x: 0, y: 0 },
    });

    // Handle the right-click (contextmenu) event
    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent the default context menu

        // Show custom context menu at the click position
        setContextMenu({
            visible: true,
            position: { x: event.clientX, y: event.clientY },
        });
    };

    // Handle selection of a menu option
    const handleMenuOption = (option) => {
        console.log(`Option selected: ${option}`);
        // Perform action based on the selected option (e.g., copy, delete)
        
        // Hide the context menu
        setContextMenu({ visible: false, position: { x: 0, y: 0 } });
    };

    // Hide context menu on click outside
    const handleClickOutside = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, position: { x: 0, y: 0 } });
        }
    };
    
    // Fetch chat history from the backend
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/messages/all-messages/${userName}/${sender}`);
                setMessages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, [newMessage]);  

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
            setNewMessage("");
          } catch (error) {
            console.error("Error posting image:", error); // Handle error
            alert("Unable to send");
          }
    };

    const deleteMessage = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/messages/delete-message/${id}`);
            alert("message deleted successfully!");
            setNewMessage("");
        } catch (error) {
            alert('Failed to delete message. Please try again.');
        }
    };

    return (
        <div className="chat-container" onClick={handleClickOutside}>
            <div className="chat-history">
                {/* Display chat history */}
                {messages.map((message) => (
                    <div key={message.id} className={`chat-message ${message.sender === userName ? 'sent' : 'received'}`} onContextMenu={handleContextMenu} >
                        <div className="userInfo">
                            {/* Display the user's profile picture */}
                            <img
                                src={`data:image/jpeg;base64,${message.senderProfilePic}`} 
                                alt={`${message.sender}'s profile`}
                                className="profile-picture"
                            />
                            <span>{message.sender}</span>
                        </div>
                        <span className='message'>{message.message}</span>
                        {contextMenu.visible && (
                        <ul
                            className="context-menu"
                            style={{
                                position: 'absolute',
                                top: `${contextMenu.position.y}px`,
                                left: `${contextMenu.position.x}px`,
                            }}
                        >
                            <li onClick={() => handleMenuOption('Copy')}>Copy</li>
                            <li onClick={() => handleMenuOption('Delete')}>Delete</li>
                            {/* Add more options as needed */}
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
