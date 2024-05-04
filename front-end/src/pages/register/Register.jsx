import { useState } from "react";
import axios from "axios"; 
import "./register.scss";

const Register = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("profilePicture", profilePicture);
      userData.append("userName", formData.username);
      userData.append("password", formData.password);
      userData.append("name", formData.name);

      const response = await axios.post("http://localhost:8080/create", userData);
      console.log("Registration successful:", response.data);
      var successfull = document.getElementById("successfull");
      successfull.value = "Registration successfull"
      alert("Account created successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Fit Fam.</h1>
          <p>Join us and Connect. Share. Achieve. Your ultimate gym companion for fitness enthusiasts.!</p>
          <span id="successfull"></span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div className="profile-picture">
              <label htmlFor="profilePictureInput">
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  id="profilePictureInput"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
