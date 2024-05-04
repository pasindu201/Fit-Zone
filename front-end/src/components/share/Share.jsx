import React, { useState } from "react";
import axios from "axios";
import "./share.scss";
import Image from "../../assets/img.png";

const Share = ({ userName, profilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("post", selectedImage);
      formData.append("description", description);     
      const response = await axios.post("http://localhost:8080/setPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle success response
      alert("post successful");
    } catch (error) {
      console.error("Error posting image:", error); // Handle error
      alert("Unable to post");
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          <input
            type="text"
            placeholder={`What's on your mind ${userName}?`}
            value={description} // Bind value of input field to postText state
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr />
        {previewImage && (
          <img
            src={previewImage}
            alt="SelectImage"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              marginTop: "20px"
            }}
          />
        )}
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
