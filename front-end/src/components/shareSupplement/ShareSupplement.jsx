import React, { useState } from "react";
import axios from "axios";
import "./ShareSupplement.scss";
import Image from "../../assets/img.png";

const ShareSupplement = ({ userName, profilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [supplementName, setSupplementName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [flavours, setFlavours] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("post", selectedImage);
      formData.append("supplementName", supplementName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("ingredients", ingredients);
      formData.append("manufacturer", manufacturer);
      formData.append("brandDetails", brandDetails);
      formData.append("howToUse", howToUse);
      formData.append("flavours", flavours);

      const response = await axios.post("http://localhost:8080/api/supplements/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); 
      alert("Supplement post successful!");
    } catch (error) {
      console.error("Error posting image:", error); // Handle error
      alert("Error in post uploading");

    }
  };

  return (
    <div className="shareMeal">
      <div className="containerMeal">
        <div className="top">
          <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          <span className="name">{userName}</span>
        </div>
        <input className="name-input"
          type="text"
          placeholder={`Enter Name of the Supplement `}
          value={supplementName} // Bind value of input field to meal name
          onChange={(e) => setSupplementName(e.target.value)}
        />
        <div className="sub-topic">
          <span>Description</span>
          <hr />
        </div>
        <textarea className="description"
          type="text"
          placeholder={`Enter Discription About Supplement `}
          value={description} // Bind value of input field to description
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="sub-topic">
          <span>Price</span>
          <hr />
        </div>
        <textarea className="price"
          type="text"
          placeholder={`Enter price `}
          value={price} // Bind value of input field to recipe
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="sub-topic">
          <span>Ingrediants</span>
          <hr />
        </div>
        <textarea className="ingredients"
          type="text"
          placeholder={`Enter ingredients `}
          value={ingredients} // Bind value of input field to recipe
          onChange={(e) => setIngredients(e.target.value)}
        />
        <div className="sub-topic">
          <span>Manufacturer Details</span>
          <hr />
        </div>
        <textarea className="manufacture"
          type="text"
          placeholder={`Enter Manufacturer details `}
          value={manufacturer} // Bind value of input field to recipe
          onChange={(e) => setManufacturer(e.target.value)}
        />
        <div className="sub-topic">
          <span>Brand Details</span>
          <hr />
        </div>
        <textarea className="brand"
          type="text"
          placeholder={`Enter Brand details `}
          value={brandDetails} // Bind value of input field to recipe
          onChange={(e) => setBrandDetails(e.target.value)}
        />
        <div className="sub-topic">
          <span>How to use</span>
          <hr />
        </div>
        <textarea className="howToUse"
          type="text"
          placeholder={`Enter How to use this supplement `}
          value={howToUse} // Bind value of input field to recipe
          onChange={(e) => setHowToUse(e.target.value)}
        />
        <div className="sub-topic">
          <span>Available Flavours</span>
          <hr />
        </div>
        <textarea className="fravours"
          type="text"
          placeholder={`Enter What are the avilable flavours `}
          value={flavours} // Bind value of input field to recipe
          onChange={(e) => setFlavours(e.target.value)}
        />
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
            <button onClick={handlePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSupplement;
