import React, { useState, useEffect } from "react";
import "./Workout.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Comments from "../comments/Comments";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from 'axios';

const Workout = ({ workout, userName }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const fetchProfilePhoto = async () => {
        try {
            const response = await axios.get(
            `http://localhost:8080/profile-photo/${userName}`
            );
            setProfilePic(response.data);
        } catch (error) {
            console.error("Error fetching profile photo:", error);
        }
        };

         fetchProfilePhoto();
     }, [userName]);

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/exercises/delete/${id}`);
            alert("workout plan deleted successfully!");
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    const updateDescription = async (id, newDescription) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/exercises/descriptionUpdate/${id}/${newDescription}`
            );
            alert("Video description updated successfully!");
            return response.data;
        } catch (error) {
            console.error('Error updating description:', error);
            alert('Failed to update description. Please try again.');
        }
    };

    const handleDeletePost = () => {
        deletePost(workout.id);
        setMenuOpen(false);
    };

    const handleUpdateDescription = () => {
        const newDescription = prompt("Enter a new description:");
        if (newDescription !== null && newDescription.trim() !== "") {
            updateDescription(workout.id, newDescription);
            setMenuOpen(false);
        }
    };

    return (
        <div className="workout">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
                        <div className="details">                          
                            <span className="name">{workout.userName}</span>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>               
                {workout.userName === userName && (
                        <div className="menu">
                            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <button onClick={handleDeletePost}>Delete Post</button>
                                    <button onClick={handleUpdateDescription}>Update Description</button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <h2>{workout.workOutName}</h2>
                <p>{workout.description}</p>
                <div className="exercises">
                    {workout.exerciseList.map((exercise, index) => (
                        <div className="exercise" key={index}>
                            <h3>Exercise: {exercise.exerciseName}</h3>
                            <p>Description: {exercise.description}</p>
                            {exercise.image && (
                                <img
                                    src={`data:image/jpeg;base64,${exercise.image}`}
                                    alt={`Exercise ${exercise.exerciseName}`}
                                    className="exercise-image"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Handle comments */}
                <div className="info" onClick={() => setCommentOpen(!commentOpen)}>
                    <div className="item">
                        <TextsmsOutlinedIcon />
                        <span>Comments</span>
                    </div>
                </div>
                {commentOpen && <Comments comments={workout.comments} />}
            </div>
        </div>
    );
};

export default Workout;
