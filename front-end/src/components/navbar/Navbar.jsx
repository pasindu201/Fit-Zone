import React, { useContext, useState, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = ({ userName, profilePic }) => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="left">
        <img src={Logo} width={"30px"} alt="FitFam Logo"></img>
        <span>FitFam</span>
        <Link to={`/home/${userName}`}>
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <div className="user">
          {profilePic && <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />}
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
