import { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./VideoComments.scss";
import axios from "axios";

const VideoComments = ({ postId, commenterName, setcomments, numberOfComments }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [menuOpen, setMenuOpen] = useState({}); // Track menu open state per comment

  // Fetch profile photo on mount
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile-photo/${commenterName}`);
        setProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [commenterName]);

  // Fetch comments whenever newComment changes (for refresh after adding new comments)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/VideoComments/allComments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComments();
  }, [newComment, postId]); // Depend on postId to fetch comments again if the post changes

  // Handle comment submission
  const handleCommentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("videoId", postId);
      formData.append("commenterName", commenterName);
      formData.append("comment", newComment);
      const response = await axios.post("http://localhost:8080/VideoComments/saveComment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewComment("");
      setcomments(numberOfComments+1);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (id) => {
    try {
        // Send a DELETE request to the server to delete the comment with the specified ID
        await axios.delete(`http://localhost:8080/VideoComments/delete/${id}`);
        setNewComment(""); 
        setcomments(numberOfComments-1);
        alert("deleted successful.")
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment.');
    }
};


  // Handle menu toggle for comments
  const toggleMenu = (commentId) => {
    setMenuOpen((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
    }));
  };

  // Close all open menus when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.menu')) {
        setMenuOpen({});
    }
  };

  // Add a click event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="comments">
      <div className="write">
        <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Send</button>
      </div>
      
      {/* Displaying comments */}
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="user">
            <div className="userInfo">
              <img src={`data:image/jpeg;base64,${comment.profilePicture}`} alt="Profile" />
              <div className="details">
                <span>{comment.commenterName}</span>
                <p className="date">1 min ago</p>
              </div>
            </div>
            {/* Render the context menu button for comments by the current user */}
            {comment.commenterName === commenterName && (
              <div className="menu">
                <MoreHorizIcon onClick={() => toggleMenu(comment.id)} />
                {/* Render the context menu */}
                {menuOpen[comment.id] && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="content">
            <span>{comment.comment}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoComments;
