import { React, useEffect, useState } from "react";
import "./login.css";
import logo from "../Assets/Images/logo/logo.png";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

const Loginform = ({ flag }) => {
  const [roleDropdown, setroleDropdown] = useState("admin");
  const [teamDropdown, setteamDropdown] = useState("Knights");
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
      toast.success("WELCOME " + teamDropdown);
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
              style={{ display: roleDropdown === "team" ? "block" : "none" }}
              onChange={(e) => {
                setteamDropdown(e.target.value);
              }}
            >
              <option value="Knights">Knights</option>
              <option value="Hurricanes">Hurricanes</option>
              <option value="Royals">Royals</option>
              <option value="Blaster">Blaster</option>
              <option value="Star">Star</option>
              <option value="Panthers">Panthers</option>
              <option value="Empire">Empire</option>
              <option value="Wolves">Wolves</option>
              <option value="Super Kings">Super Kings</option>
              <option value="Strikers">Strikers</option>
              <option value="Titans">Titans</option>
              <option value="Falcons">Falcons</option>
            </select>

            {/* EMAIL */}
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              // required
              style={{ display: roleDropdown === "admin" ? "block" : "none" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Loginform;
