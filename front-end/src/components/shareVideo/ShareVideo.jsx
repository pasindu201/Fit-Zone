import React, { useState } from "react";
import axios from "axios";
import "./ShareVideo.scss";
import Image from "../../assets/img.png";

const ShareVideo = ({ userName, profilePic }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [description, setDescription] = useState("");

    const handleVideoSelection = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validate the file type
            const acceptedFileTypes = ["video/mp4", "video/webm", "video/ogg"];
            if (!acceptedFileTypes.includes(file.type)) {
                alert("Please select a valid video file (MP4, WebM, Ogg).");
                return;
            }

            // Set selected video and preview
            setSelectedVideo(file);
            setPreviewVideo(URL.createObjectURL(file));
        }
    };

    const handlePost = async () => {
        if (!selectedVideo || !description.trim()) {
            alert("Please select a video and enter a description.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("video", selectedVideo);
            formData.append("description", description);

            const response = await axios.post(
                "http://localhost:8080/api/videos/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Handle success response
            console.log("Video posted successfully:", response.data);
            alert("Video posted successfully!");
        } catch (error) {
            // Handle error response
            console.error("Error posting video:", error);
            alert("Failed to post video. Please try again.");
        }
    };

    return (
        <div className="shareVideo">
            <div className="containerShareVideo">
                <div className="top">
                    <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${userName}?`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <hr />
                {previewVideo && (
                    <video
                        src={previewVideo}
                        alt="Video Preview"
                        controls
                        style={{
                            maxWidth: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                            marginTop: "20px",
                        }}
                    />
                )}
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleVideoSelection}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="Add Video" />
                                <span>Add Video</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <button onClick={handlePost} disabled={!selectedVideo || !description.trim()}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareVideo;
