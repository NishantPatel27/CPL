import { Navigate } from "react-router-dom";
import axios from "axios";
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

const SignUp_URL = process.env.REACT_APP_BACKEND_URL + "/cpl/signup";
const logIn_URL = process.env.REACT_APP_BACKEND_URL + "/cpl/login";
const teamLogin_url = process.env.REACT_APP_BACKEND_URL + "/team/login";

const signUp = (name, email, password, confirmPassword, role) => {
  console.log(logIn_URL);
  return axios
    .post(
      SignUp_URL,
      {
        name,
        email,
        password,
        confirmPassword,
        role,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logIn = (email, password) => {
  console.log(logIn_URL);
  return axios
    .post(
      logIn_URL,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data.data.token) {
        // console.log("STORING COOKIE ... ");
        // console.log("TOKEN IS : ", response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.myuser));
      }
      return response.data;
    });
};
const logInTeam = (name, password) => {
  return axios
    .post(
      teamLogin_url,
      {
        name,
        password,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data.data.token) {
        // console.log("STORING COOKIE ... ");
        // console.log("TOKEN IS : ", response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("team", JSON.stringify(response.data.data.myuser));
      }
      return response.data;
    });
};

const logOut = () => {
  console.log("logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("team");
  console.log("cookie removed");
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const getCurrentTeam = () => {
  return JSON.parse(localStorage.getItem("team"));
};

const authService = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  logInTeam,
  getCurrentTeam,
};

export default authService;
