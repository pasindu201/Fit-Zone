import React, { useState, useRef } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import "./Video.scss";
import axios from 'axios';

const Video = ({ video, userName }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const videoRef = useRef(null);

    const toggleVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/videos/delete/${id}`);
            alert("Video deleted successfully!");
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    const updateDescription = async (id, newDescription) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/videos/descriptionUpdate/${id}/${newDescription}`
            );
            alert("Video description updated successfully!");
            return response.data;
        } catch (error) {
            console.error('Error updating description:', error);
            alert('Failed to update description. Please try again.');
        }
    };

    const handleDeletePost = () => {
        deletePost(video.id);
        setMenuOpen(false);
    };

    const handleUpdateDescription = () => {
        const newDescription = prompt("Enter a new description:");
        if (newDescription !== null && newDescription.trim() !== "") {
            updateDescription(video.id, newDescription);
            setMenuOpen(false);
        }
    };

    return (
        <div className="video">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={`data:image/jpeg;base64,${video.profilePicture}`} alt="Profile" />
                        <div className="details">
                            <Link
                                to={`/profile/${video.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{video.userName}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    {video.userName === userName && (
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
                <div className="content">
                    <p>{video.description}</p>
                    <video
                        ref={videoRef}
                        src={`data:video/mp4;base64,${video.video}`}
                        controls
                        loop
                        onClick={toggleVideo}
                    />
                </div>
                <div className="info">
                    <div className="item" onClick={toggleLike}>
                        {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                        {liked ? "13 Likes" : "12 Likes"}
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        {commentOpen ? "13 Comments" : "12 Comments"}
                    </div>
                </div>
                {commentOpen && <Comments commenterName={userName} />}
            </div>
        </div>
    );
};

export default Video;
