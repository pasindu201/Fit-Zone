import "./profile.scss";
import { useContext } from "react";
import LeftBar from "./../../components/leftBar/LeftBar";
import RightBar from "./../../components/rightBar/RightBar";
import Navbar from "./../../components/navbar/Navbar";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { DarkModeContext } from "./../../context/darkModeContext";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { userName, profileUser} = useParams();
  const [profilePic, setProfilePic] = useState("");
  const [userprofilePic, setuserProfilePic] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile-photo/${profileUser}`
        );
        setProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userName]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile-photo/${userName}`
        );
        setuserProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (<div className={`theme-${darkMode ? "dark" : "light"}`}>
  <Navbar userName={userName} profilePic={userprofilePic}/>
  <div style={{ display: "flex" }}>
    <LeftBar userName={userName}/>
    <div style={{ flex: 6 }}>
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={`data:image/jpeg;base64,${profilePic}`}
          alt="Profile"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://instergram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://Linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{profileUser}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Sri Lanka</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userName={userName}/>
      </div>
    </div>
    </div>
    <RightBar userName={userName} profilePic={userprofilePic}/>
  </div>
</div>
  
  );
};

export default Profile;
