import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useEffect } from "react";
import axios from 'axios';

const Post = ({ post, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    setLikes(post.likes);
    setComments(post.comments)
}, [post]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/isLiked/${userName}/${post.id}`);
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
      await axios.delete(`http://localhost:8080/delete/${userName}/${post.id}`);
      setLiked(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setLike = async () => {
    try {
      const formData = new FormData();
      formData.append("pictureId", post.id);
      formData.append("likerName", userName);    
      const response = await axios.post("http://localhost:8080/setLike", formData, {
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
    setLikes(likes - 1);
  }
  else {
    setLike();
    setLikes(likes + 1);
  }
};

  const deletePost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/delete/${id}`);
        alert("Video deleted successfully!");
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
    }
};

const updateDescription = async (id, newDescription) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/descriptionUpdate/${id}/${newDescription}`
        );
        alert("Video description updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update description. Please try again.');
    }
};

const handleDeletePost = () => {
    deletePost(post.id);
    setMenuOpen(false);
};

const handleUpdateDescription = () => {
    const newDescription = prompt("Enter a new description:");
    if (newDescription !== null && newDescription.trim() !== "") {
        updateDescription(post.id, newDescription);
        setMenuOpen(false);
    }
};
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`data:image/jpeg;base64,${post.profilePicture}`} alt="Profile" />
            <div className="details">
              <Link
                to={`/profile/${userName}/${post.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userName}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {post.userName === userName && (
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
          <p>{post.description}</p>
          <img src={`data:image/jpeg;base64,${post.post}`} alt="Profile" />
        </div>
        <hr/>
        <div className="info">
          <div className="item" onClick={() => likePressed()}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            <p>{likes}</p>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <p>{comments}</p>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} commenterName={userName} setcomments={setComments} numberOfComments={comments}/>}
      </div>
    </div>
  );
};

export default Post;
