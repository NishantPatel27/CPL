import { React, useEffect, useState } from "react";
import "./login.css";
import logo from "../Assets/Images/logo/logo_dark.png";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

const Loginform = ({ flag }) => {
  const [roleDropdown, setroleDropdown] = useState("admin");
  const [teamDropdown, setteamDropdown] = useState("ROYAL CHALLENGERS");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // check if user is already logged-in, then redirect to dashboard
  useEffect(() => {
    const getUser = authService.getCurrentUser();
    if (getUser) {
      navigate("/", { replace: true });
    }
  }, []);

  const formValidation = function () {
    if (password.length < 8) {
      toast.error("Password must be of 8 characters or more");
      return false;
    }
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    } else {
      toast.error("Invalid Email format");
      return false;
    }
  };

  // ON LOGIN FORM SUBMIT
  const handleLogin = async (e) => {
    e.preventDefault();

    if (roleDropdown === "admin") {
      if (formValidation()) {
        try {
          const res = await authService.logIn(email, password);
          navigate("/", { replace: true });
          flag(false);
        } catch (error) {
          console.log(error);
          if (error.response.data.status === "User not found") {
            toast.error("User Not found, try another email..");
            setEmail("");
            setPassword("");
          }
          if (error.response.data.status === "invalid password") {
            toast.error("Invalid password");
            setPassword("");
          }
        }
      }
    }
    if (roleDropdown === "team") {
      try {
        const res = await authService.logInTeam(teamDropdown, password);
        console.log(res);
        navigate("/", { replace: true });
        flag(false);
      } catch (error) {
        console.log(error);
        if (error.response.data.status === "Team not found") {
          toast.error("Team Not found, try another name..");
          setPassword("");
        }
        if (error.response.data.status === "invalid password") {
          toast.error("Invalid password");
          setPassword("");
        }
      }
    }
  };

  return (
    <div className="background login-form-wrapper">
      <div className="child child-position">
        <img src={logo} alt="CPL logo" />

        <div className="content">
          <h3>Welcome</h3>
          <p>Enter Your Credentials to Proceed</p>

          <form onSubmit={handleLogin}>
            {/* SELECT ROLE */}
            <select
              name="user"
              id="user"
              title="user"
              className="login-form-input"
              onChange={(e) => {
                setroleDropdown(e.target.value);
              }}
            >
              <option value="admin">Administrator</option>
              <option value="team">Team</option>
            </select>

            {/* SELECT TEAM */}
            <select
              name="team"
              id="team"
              title="team"
              className="login-form-input login-dropdown"
              style={{ display: roleDropdown === "team" ? "block" : "none" }}
              onChange={(e) => {
                setteamDropdown(e.target.value);
              }}
            >
              <option value="ROYAL CHALLENGERS">ROYAL CHALLENGERS</option>
              <option value="KINGS XI">KINGS XI</option>
              <option value="TITANS">TITANS</option>
              <option value="KNIGHT RIDERS">KNIGHT RIDERS</option>
              <option value="INDIANS">INDIANS</option>
              <option value="ROYALS">ROYALS</option>
              <option value="SUNRISES">SUNRISES</option>
              <option value="CAPITALS">CAPITALS</option>
              <option value="SUPER GIANTS">SUPER GIANTS</option>
              <option value="SUPER KINGS">SUPER KINGS</option>
            </select>

            {/* EMAIL */}
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="login-form-input"
              style={{ display: roleDropdown === "admin" ? "block" : "none" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {/* PASSWORD */}
            <input
              className="login-form-input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input className="login-form-input" type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Loginform;
