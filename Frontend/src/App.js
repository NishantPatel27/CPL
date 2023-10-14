import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authService from "./Services/auth.service";
import Nav from "./Pages/Nav/Nav";
import Searchbar from "./Pages/Seachbar/Searchbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Players from "./Pages/Players/Players";
import PlayersTeam from "./Pages/Players/PlayersTeam";
import Teams from "./Pages/Teams/Teams";
import AuctionControl from "./Pages/Auction/AuctionControl/AuctionControl";
import AuctionScreen from "./Pages/Auction/AuctionScreen/AuctionScreen";
import Form from "./Pages/Players/add player/Form";
import Loginform from "./Pages/Login/Loginform";
import Signup from "./signup/Signup";
import Update from "./Pages/Players/update_player/update";
import "react-toastify/dist/ReactToastify.css";
import socketIO from "socket.io-client";

import Container from "./container/";
import DashboardTeam from "./Pages/Dashboard/DashboardTeam";

const socket = socketIO(process.env.REACT_APP_BACKEND_URL);
// const socket = socketIO.connect("ws://localhost:8989");

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginFlag, setLoginFlag] = useState(!token);
  const [logOutFlag, setLogOutFlag] = useState(localStorage.getItem("token"));

  if (loginFlag) {
    // If not logged in, show the Loginform
    return <Loginform flag={setLoginFlag} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container
            Children={
              Boolean(authService.getCurrentUser()) ? (
                <Dashboard socket={socket} />
              ) : (
                <DashboardTeam socket={socket} />
              )
            }
          />
        }
      />
      <Route
        path="/players"
        element={
          <Container
            Children={
              Boolean(authService.getCurrentUser()) ? (
                <Players />
              ) : (
                <PlayersTeam />
              )
            }
          />
        }
      />
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route path="/teams" element={<Container Children={<Teams />} />} />
        )}
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route
            path="/auctioncontrol"
            element={
              <Container Children={<AuctionControl socket={socket} />} />
            }
          />
        )}
      {/* <Route
        path="/auctioncontrol"
        element={<AuctionControl socket={socket} />}
      /> */}
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route path="/auction" element={<AuctionScreen socket={socket} />} />
        )}
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route path="/form" element={<Container Children={<Form />} />} />
        )}
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route path="/signup" element={<Container Children={<Signup />} />} />
        )}
      {/* Default redirect for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Container Children={<Loginform />} />} />
      {Boolean(authService.getCurrentUser()) &&
        !Boolean(authService.getCurrentTeam()) && (
          <Route
            path="/update/:id"
            element={<Container Children={<Update />} />}
          />
        )}
    </Routes>
  );
}

export default App;
