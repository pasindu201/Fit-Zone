import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Images from "../../assets/images.png";
import Watch from "../../assets/4.png";
import Gaming from "../../assets/fitness.png";
import Diet from "../../assets/diet.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Supliment from "../../assets/supplementary-food.png";
import WorkoutStatus from "../../assets/fitness1.png";
import Logout from "../../assets/logout.png";
import "./leftBar.scss";

const LeftBar = ({ userName }) => {
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile-photo/${userName}`
        );
        setProfilePic(response.data); // assuming response.data is the Base64 image string
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [userName]);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {profilePic && <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />}
            <span>{userName}</span>
          </div>
          <Link to={`/home/${userName}`} className="item">
            <img src={Images} alt="" />
            <span>Posts</span>
          </Link>
          <Link to={`/videos/${userName}`} className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </Link>
          <Link to={`/workoutPlans/${userName}`} className="item">
            <img src={Gaming} alt="" />
            <span>WorkOuts</span>
          </Link>
          <Link to={`/mealPlanes/${userName}`} className="item">
            <img src={Diet} alt="" />
            <span>Meal Planning</span>
          </Link>
          <Link to={`/messages/${userName}`} className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </Link>
          <Link to={`/supplements/${userName}`} className="item">
            <img src={Supliment} alt="" />
            <span>Supliments</span>
          </Link>
          <Link to={`/videos/${userName}`} className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </Link>
          <Link to={`/videos/${userName}`} className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </Link>
          <Link to={`/currentWorkoutStatus/${userName}`} className="item">
            <img src={WorkoutStatus} alt="" />
            <span>Workout Status</span>
          </Link>
          <hr/>
          <Link to={`/`} className="item">
            <img src={Logout} alt="" />
            <span>Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
