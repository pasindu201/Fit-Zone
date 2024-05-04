import React, { useState, useRef, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../videoComments/VideoCommnets";
import "./Video.scss";
import axios from 'axios';

const Video = ({ video, userName }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const videoRef = useRef(null);
    const [likes, setLikes] = useState(video.likes);
    const [comments, setComments] = useState(video.comments);

    useEffect(() => {
        setLikes(video.likes);
    }, [video]);

    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/videos/isLiked/${userName}/${video.id}`);
            setLiked(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchLikes();
    }, [userName]);
    
    const likePressed = () => {
      const deleteLike = async () => {
        try {
          await axios.delete(`http://localhost:8080/api/videos/delete/${userName}/${video.id}`);
          setLiked(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const setLike = async () => {
        try {
          const formData = new FormData();
          formData.append("videoId", video.id);
          formData.append("likerName", userName);    
          const response = await axios.post("http://localhost:8080/api/videos/setLike", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setLiked(true);;
        } catch (error) {
          console.error("Error posting image:", error); 
        }
      };
    
      if (liked) {
        deleteLike();
        setLikes(likes-1);
      }
      else {
        setLike();
        setLikes(likes+1);
      }
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
                    />
                </div>
                <div className="info">
                    <div className="item" onClick={likePressed}>
                       {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                       <p>{likes}</p>
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        <p>{comments}</p>
                    </div>
                </div>
                {commentOpen && <Comments commenterName={userName} postId ={video.id} setcomments={setComments} numberOfComments={comments}/>}
            </div>
        </div>
    );
};

export default Video;
