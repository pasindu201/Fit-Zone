import { useState, useEffect } from "react";
import "./MealPlanComment.scss";
import axios from "axios";

const MealPlanComments = ({ postId, commenterName }) => {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [profilePic, setProfilePic] = useState("");

    const handleCommentSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("mealPlanId", postId);
            formData.append("commenterName", commenterName);
            formData.append("comment", newComment);
            const response = await axios.post("http://localhost:8080/mealPlanComments/saveComment", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNewComment("");
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error("Error commenting:", error); // Handle error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mealPlanComments/allComments/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [newComment]);

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/profile-photo/${commenterName}`
                );
                setProfilePic(response.data);
            } catch (error) {
                console.error("Error fetching profile photo:", error);
            }
        };

        fetchProfilePhoto();
    }, []);

    return (
        <div className="comments">
            <div className="write">
                <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Send</button>
            </div>
            {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    <div className="user">
                        <div className="userInfo">
                            <img src={`data:image/jpeg;base64,${comment.profilePic}`} alt="Profile" />
                            <div className="details">
                                <span>{comment.commenterName}</span>
                                <p className="date"> 1 min ago</p>
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

export default MealPlanComments;
