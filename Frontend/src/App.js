import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authService from "./Services/auth.service";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardTeam from "./Pages/Dashboard/DashboardTeam";
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

const socket = socketIO(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginFlag, setLoginFlag] = useState(!token);

  const isUserLoggedIn = Boolean(authService.getCurrentUser());
  const isNoTeam = !Boolean(authService.getCurrentTeam());
  const isTeamLoggedIn = Boolean(authService.getCurrentTeam());

  if (loginFlag) {
    // If not logged in, show the Loginform
    return <Loginform flag={setLoginFlag} />;
  }

  const dashboardComponent = isUserLoggedIn ? (
    <Dashboard socket={socket} />
  ) : (
    <DashboardTeam socket={socket} />
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container
            Children={dashboardComponent}
            isUserLoggedIn={isUserLoggedIn}
            isTeamLoggedIn={isTeamLoggedIn}
          />
        }
      />
      <Route
        path="/players"
        element={
          <Container
            Children={isUserLoggedIn ? <Players /> : <PlayersTeam />}
            isUserLoggedIn={isUserLoggedIn}
            isTeamLoggedIn={isTeamLoggedIn}
          />
        }
      />
      {isUserLoggedIn && isNoTeam && (
        <>
          <Route
            path="/teams"
            element={
              <Container
                Children={<Teams />}
                isUserLoggedIn={isUserLoggedIn}
                isTeamLoggedIn={isTeamLoggedIn}
              />
            }
          />
          <Route
            path="/auctioncontrol"
            element={
              <Container
                isUserLoggedIn={isUserLoggedIn}
                isTeamLoggedIn={isTeamLoggedIn}
                Children={
                  <AuctionControl
                    socket={socket}
                    isUserLoggedIn={isUserLoggedIn}
                    isTeamLoggedIn={isTeamLoggedIn}
                  />
                }
              />
            }
          />
          <Route path="/auction" element={<AuctionScreen socket={socket} />} />
          <Route
            path="/form"
            element={
              <Container
                isUserLoggedIn={isUserLoggedIn}
                isTeamLoggedIn={isTeamLoggedIn}
                Children={<Form />}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Container
                isUserLoggedIn={isUserLoggedIn}
                isTeamLoggedIn={isTeamLoggedIn}
                Children={<Signup />}
              />
            }
          />
          <Route
            path="/update/:id"
            element={
              <Container
                isUserLoggedIn={isUserLoggedIn}
                isTeamLoggedIn={isTeamLoggedIn}
                Children={<Update />}
              />
            }
          />
        </>
      )}
      {/* Default redirect for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Container Children={<Loginform />} />} />
    </Routes>
  );
}

export default App;
