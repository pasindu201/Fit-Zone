import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./Message.scss"; 
import { useParams } from "react-router-dom";

const Message = () => {
    const [users, setUsers] = useState([]);
    const [profilePictures, setProfilePictures] = useState({}); 
    const { userName} = useParams();

    // Fetch the list of users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/messages/allUsers");
                const users = response.data;

                setUsers(users);

                // Fetch profile pictures for each user
                const profilePicPromises = users.map(async (user) => {
                    try {
                        const profilePicResponse = await axios.get(`http://localhost:8080/profile-photo/${user}`);
                        // Set the profile picture in the state using the user's name as the key
                        setProfilePictures((prevState) => ({
                            ...prevState,
                            [user]: profilePicResponse.data, // Assuming response.data contains the base64 encoded image string
                        }));
                    } catch (error) {
                        console.error(`Error fetching profile photo for user ${user}:`, error);
                    }
                });

                // Wait for all profile picture requests to complete
                await Promise.all(profilePicPromises);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h2>Chat Users</h2>
            <hr/>
            <ul>
                {users.map((user) => (
                    <li key={user}>
                        {/* Link to navigate to the chat page for a specific user */}
                        <Link to={`/chat/${userName}/${user}`} className="link">
                            <div className="userInfo">
                                {/* Display the user's profile picture */}
                                <img
                                    src={`data:image/jpeg;base64,${profilePictures[user]}`} 
                                    alt={`${user}'s profile`}
                                    className="profile-picture"
                                />
                                <span>{user}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Message;
