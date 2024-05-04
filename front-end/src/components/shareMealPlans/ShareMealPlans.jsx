import React, { useState } from "react";
import axios from "axios";
import "./ShareMealPlans.scss";
import Image from "../../assets/img.png";

const ShareMealPlans = ({ userName, profilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [mealName, setMealName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [portion, setPortion] = useState("");
  const [mealSchedule, setMealSchedule] = useState("");
  const [nutritions, setNutritions] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [nutFree, setNutFree] = useState(false);

  // Event handler functions for each checkbox
  const handleVegetarianChange = (e) => setVegetarian(e.target.checked);
  const handleVeganChange = (e) => setVegan(e.target.checked);
  const handleGlutenFreeChange = (e) => setGlutenFree(e.target.checked);
  const handleDairyFreeChange = (e) => setDairyFree(e.target.checked);
  const handleNutFreeChange = (e) => setNutFree(e.target.checked);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("post", selectedImage);
      formData.append("mealName", mealName);
      formData.append("description", description);
      formData.append("recipe", recipe);
      formData.append("portion", portion);
      formData.append("mealSchedule", mealSchedule);
      formData.append("nutrition", nutritions);
      formData.append("vegetarian", vegetarian);
      formData.append("vegan", vegan);
      formData.append("glutenFree", glutenFree);
      formData.append("dairyFree", dairyFree);
      formData.append("nutFree", nutFree);

      const response = await axios.post("http://localhost:8080/shareMealPlan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle success response
      alert("MealPlan shared successfully!");
    } catch (error) {
      console.error("Error posting image:", error); // Handle error
      alert("Error in meal plan sharing");

    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          <span className="name">{userName}</span>
        </div>
        <input className="name-input"
          type="text"
          placeholder={`Enter Name of the Meal `}
          value={mealName} // Bind value of input field to meal name
          onChange={(e) => setMealName(e.target.value)}
        />
        <div className="sub-topic">
          <span>Description</span>
          <hr />
        </div>
        <textarea className="description"
          type="text"
          placeholder={`Enter Discription About Meal `}
          value={description} // Bind value of input field to description
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="sub-topic">
          <span>Recipe</span>
          <hr />
        </div>
        <textarea className="recipe"
          type="text"
          placeholder={`Enter recipe of the Meal `}
          value={recipe} // Bind value of input field to recipe
          onChange={(e) => setRecipe(e.target.value)}
        />
        <div className="sub-topic">
          <span>Portion per time</span>
          <hr />
        </div>
        <select
          value={portion}
          onChange={(e) => setPortion(e.target.value)}
        >
          <option value="">Select portion of the Meal</option>
          <option value="Small">Small (100 g)</option>
          <option value="Medium">Medium (200 g)</option>
          <option value="Large">Large (300 g)</option>
        </select>
        <div className="sub-topic">
          <span>Meal Schedule</span>
          <hr />
        </div>
        <select
          value={mealSchedule}
          onChange={(e) => setMealSchedule(e.target.value)}
        >
          <option value="">Select Shedule of the Meal</option>
          <option value="daily">Once a week</option>
          <option value="two">Two times per week</option>
          <option value="three">Three times per week</option>
          <option value="four">Four times per week</option>
          <option value="weekends">Week ends only</option>
        </select>
        <div className="sub-topic">
          <span>Nutritinal Benifits</span>
          <hr />
        </div>
        <textarea className="nutritions"
          type="text"
          placeholder={`Enter Nutritional benifit of the Meal `}
          value={nutritions} // Bind value of input field to meal name
          onChange={(e) => setNutritions(e.target.value)}
        />
        <div className="sub-topic">
          <span>Dietary Preferences</span>
          <hr />
        </div>
        <div className="dietry">
          <form>
            {/* Checkbox for Vegetarian */}
            <label>
              <input
                type="checkbox"
                checked={vegetarian}
                onChange={handleVegetarianChange}
              />
              Vegetarian
            </label>

            {/* Checkbox for Vegan */}
            <label>
              <input
                type="checkbox"
                checked={vegan}
                onChange={handleVeganChange}
              />
              Vegan
            </label>

            {/* Checkbox for Gluten-Free */}
            <label>
              <input
                type="checkbox"
                checked={glutenFree}
                onChange={handleGlutenFreeChange}
              />
              Gluten-Free
            </label>

            {/* Checkbox for Dairy-Free */}
            <label>
              <input
                type="checkbox"
                checked={dairyFree}
                onChange={handleDairyFreeChange}
              />
              Dairy-Free
            </label>

            {/* Checkbox for Nut-Free */}
            <label>
              <input
                type="checkbox"
                checked={nutFree}
                onChange={handleNutFreeChange}
              />
              Nut-Free
            </label>
          </form>
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
            <button onClick={handlePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareMealPlans;
