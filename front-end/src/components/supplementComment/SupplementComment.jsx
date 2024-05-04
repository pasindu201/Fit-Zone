import { useState, useEffect } from "react";
import "./SupplementComment.scss";
import axios from "axios";

const SupplementComment = ({ postId, commenterName }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  // Function to handle comment submission
  const handleCommentSubmit = async () => {
    try {
      // Create a FormData object to send the comment data
      const formData = new FormData();
      formData.append("supplementId", postId);
      formData.append("commenterName", commenterName);
      formData.append("comment", newComment);

      // Make a POST request to submit the comment
      const response = await axios.post("http://localhost:8080/supplement-comments/saveComment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear the new comment input and refetch comments
      setNewComment("");
      fetchComments();

      console.log(response.data);
    } catch (error) {
      console.error("Error commenting:", error);
      // Display a user-friendly error message
      alert("An error occurred while submitting your comment. Please try again.");
    }
  };

  // Function to fetch comments for the given post
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/supplement-comments/allComments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Display a user-friendly error message
      alert("An error occurred while fetching comments. Please try again.");
    }
  };

  // Function to fetch the profile photo for the commenter
  const fetchProfilePhoto = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/profile-photo/${commenterName}`);
      setProfilePic(response.data);
    } catch (error) {
      console.error("Error fetching profile photo:", error);
      // Display a user-friendly error message
      alert("An error occurred while fetching the profile photo. Please try again.");
    }
  };

  // Fetch comments when the component mounts or when newComment changes
  useEffect(() => {
    fetchComments();
  }, [postId, newComment]);

  // Fetch the profile photo when the component mounts
  useEffect(() => {
    fetchProfilePhoto();
  }, [commenterName]);

  return (
    <div className="comments">
      <div className="write">
        <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit} disabled={!newComment.trim()}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="user">
            <div className="userInfo">
              <img src={`data:image/jpeg;base64,${comment.profilePic}`} alt="Profile" />
              <div className="details">
                <span>{comment.commenterName}</span>
                <p className="date">{comment.timestamp}</p>
              </div>
            </div>
          </div>
          <div className="content">
            <span>{comment.comment}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplementComment;
