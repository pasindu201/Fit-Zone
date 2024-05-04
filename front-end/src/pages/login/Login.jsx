import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import Logo from "./../../assets/logo.png";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate(); // Using useNavigate hook to get navigation function

  const handleLogin = async () => {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    try {
      const response = await axios.get(
        `http://localhost:8080/verify/${userName}/${password}`
      );
      if (response.data) {
        navigate(`/home/${userName}`); // Navigating to home page using navigate function
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Build Your Body</h1>
          <p>
            Welcome to our fitness community! Join us and start your fitness journey from today.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <div className="logo">
            <img src={Logo} width={"30px"} alt="logo"></img>
            <span>FitFam</span>
          </div>
          <h1>Login</h1>
          <form>
            <input id="userName" type="text" placeholder="Username" required/>
            <input id="password" type="password" placeholder="Password" required/>
            <button type="button" onClick={handleLogin}>Login</button> {/* Setting type to button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
