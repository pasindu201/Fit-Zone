import "./mealPlan.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Sad from "@mui/icons-material/SentimentVeryDissatisfied";
import Happy from "@mui/icons-material/SentimentSatisfiedAlt";
import { Link } from "react-router-dom";
import MealPlanComments from "../mealPlanComments/MealPlanComment";
import { useState } from "react";
import axios from 'axios';

const MealPlan = ({ meal, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const deletePost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/deleteMeal/${id}`);
        alert("Video deleted successfully!");
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
    }
  };

  const updateDescription = async (id, newDescription) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/descriptionUpdateMeal/${id}/${newDescription}`
        );
        alert("Video description updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update description. Please try again.');
    }
  };

  const updateName = async (id, newDescription) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/name/${id}/${newDescription}`
        );
        alert("Meal name updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update name. Please try again.');
    }
  };

  const updateRecipe = async (id, newDescription) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/recipe/${id}/${newDescription}`
        );
        alert("Meal recipe updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update recipe. Please try again.');
    }
  };

  const updateSchedule = async (id, newSchedule) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/schedule/${id}/${newSchedule}`
        );
        alert("Meal Plan Schedule updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update Shedule. Please try again.');
    }
  };

  const updateNutrition = async (id, newNutrition) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/nutrition/${id}/${newNutrition}`
        );
        alert("Nutrition details updated successfully!");
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Failed to update Details. Please try again.');
    }
  };
  
  const handleDeletePost = () => {
    deletePost(meal.id);
    setMenuOpen(false);
  };

  const handleUpdateDescription = () => {
    const newDescription = prompt(meal.description);
    if (newDescription !== null && newDescription.trim() !== "") {
        updateDescription(meal.id, newDescription);
        setMenuOpen(false);
    }
  };

  const handleUpdateRecipe = () => {
    const newRecipe = prompt(meal.recipe);
    if (newRecipe !== null && newRecipe.trim() !== "") {
        updateRecipe(meal.id, newRecipe);
        setMenuOpen(false);
    }
  };

  const handleUpdateName = () => {
    const newName = prompt("Enter the new name:");
    if (newName !== null && newName.trim() !== "") {
        updateName(meal.id, newName);
        setMenuOpen(false);
    }
  };

  const handleUpdateNutrition = () => {
    const newNutrition = prompt("Enter the new nutrition condition:");
    if (newNutrition !== null && newNutrition.trim() !== "") {
        updateNutrition(meal.id, newNutrition);
        setMenuOpen(false);
    }
  };

  const handleUpdateSchedule = () => {
    const newShedule = prompt(meal.recipe);
    if (newShedule !== null && newShedule.trim() !== "") {
        updateSchedule(meal.id, newShedule);
        setMenuOpen(false);
    }
  };

  return (
    <div className="meal">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`data:image/jpeg;base64,${meal.userProfilePicture}`} alt="Profile" />
            <div className="details">
              <Link
                to={`/profile/${meal.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{meal.userName}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {meal.userName === userName && (
                        <div className="menu">
                            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <button onClick={handleDeletePost}>Delete MealPlan</button>
                                    <button onClick={handleUpdateName}>Update MealPlan Name</button>
                                    <button onClick={handleUpdateDescription}>Update Description</button>
                                    <button onClick={handleUpdateRecipe}>Update Recipe</button>
                                    <button onClick={handleUpdateNutrition}>Update Nutritional Benefits</button>
                                    <button onClick={handleUpdateSchedule}>Update Schedule</button>
                                </div>
                            )}
                        </div>
                    )}
        </div>
        <div className="content">
          <h2>{meal.mealName}</h2>
          <div className="sub-topic">
            <span>Description</span>
            <hr />
          </div>
          <p>{meal.description}</p>
          <hr />
          <img src={`data:image/jpeg;base64,${meal.post}`} alt="NoImages" />
          <div className="sub-topic">
            <span>Recipe</span>
            <hr />
          </div>
          <p>
            {meal.recipe}
          </p>
          <div className="sub-topic">
            <span>Portion per time</span>
            <hr />
          </div>
          <p>{meal.portion}</p>
          <div className="sub-topic">
            <span>Meal Schedule</span>
            <hr />
          </div>
          <p>{meal.schedule}</p>
          <div className="sub-topic">
            <span>Nutrient Benifits</span>
            <hr />
          </div>
          <p>
            {meal.nutrition}
          </p>
          <div className="sub-topic">
            <span>Dietry Conditions</span>
            <hr />
          </div>
          <div className="points-list">
            <ul>
              <li>
                {meal.vegetarian ? (
                  <>
                    <p>Suitable for vegetarians</p>
                    <Happy />
                  </>
                ) : (
                  <>
                    <p>Not suitable for vegetarians</p>
                    <Sad />
                  </>
                )}
                <MoreHorizIcon />
              </li>
              <li>
                {meal.vegan ? (
                  <>
                    <p>Suitable for vegans</p>
                    <Happy />
                  </>
                ) : (
                  <>
                    <p>Not suitable for vegans</p>
                    <Sad />
                  </>
                )}
                <MoreHorizIcon />
              </li>
              <li>
                {meal.glutenFree ? (
                  <>
                    <p>Suitable for gluten-free</p>
                    <Happy />
                  </>
                ) : (
                  <>
                    <p>Not suitable for gluten-free</p>
                    <Sad />
                  </>
                )}
                <MoreHorizIcon />
              </li>
              <li>
                {meal.dairyFree ? (
                  <>
                    <p>Suitable for dairy-free</p>
                    <Happy />
                  </>
                ) : (
                  <>
                    <p>Not suitable for dairy-free</p>
                    <Sad />
                  </>
                )}
                <MoreHorizIcon />
              </li>
              <li>
                {meal.nutFree ? (
                  <>
                    <p>Suitable for nut-free</p>
                    <Happy />
                  </>
                ) : (
                  <>
                    <p>Not suitable for nut-free</p>
                    <Sad />
                  </>
                )}
                <MoreHorizIcon />
              </li>
            </ul>
          </div>
        </div>
        <div className="info">
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <p>{meal.comments}</p>
          </div>
        </div>
        {commentOpen && <MealPlanComments postId={meal.id} commenterName={userName} />}
      </div>
    </div>
  );
};

export default MealPlan;
