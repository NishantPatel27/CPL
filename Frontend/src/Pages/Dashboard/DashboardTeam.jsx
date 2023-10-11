import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import knightslogo from "../Assets/Images/teams_logo/the knights.png";
import Hurricaneslogo from "../Assets/Images/teams_logo/final hurricanes logo.png";
import royalslogo from "../Assets/Images/teams_logo/royals.png";
import Empirelogo from "../Assets/Images/teams_logo/team empire.png";
import Wolveslogo from "../Assets/Images/teams_logo/wolves 11.png";
import superkingslogo from "../Assets/Images/teams_logo/super kings.png";
import Blasterlogo from "../Assets/Images/teams_logo/blasters.png";
import Strikerslogo from "../Assets/Images/teams_logo/strikers.png";
import starslogo from "../Assets/Images/teams_logo/start.png";
import Titanslogo from "../Assets/Images/teams_logo/titans.png";
import Pantherslogo from "../Assets/Images/teams_logo/panther.png";
import Falconslogo from "../Assets/Images/teams_logo/falcons.png";
import axios from "axios";
import {
  faCubes,
  faDollarSign,
  faPeopleGroup,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import authService from "../../Services/auth.service";
import { ToastContainer, toast } from "react-toastify";

const DashboardTeam = () => {
  const playersIcon = <FontAwesomeIcon icon={faPeopleGroup} />;
  const teamsIcon = <FontAwesomeIcon icon={faCubes} />;
  const SoldIcon = <FontAwesomeIcon icon={faDollarSign} />;
  const pendingIcon = <FontAwesomeIcon icon={faPersonRays} />;
  const [team, setTeam] = useState();
  const [players, setPlayers] = useState();
  const [progress, setProgress] = useState(0);
  const fetchTeamDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6001/team/" + authService.getCurrentTeam().name,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team details fetched successfully..");
        setTeam(res.data.data);
        const players = await axios.get(
          "http://localhost:6001/team/player/all",
          {
            withCredentials: true,
          }
        );
        console.log(players);
        if (players.status === 200) {
          toast.success("Player details fetched successfully..");
          setPlayers(players.data.status);
        }
      }
      console.log(res);
    } catch (e) {
      toast.error("Some error happended while fetching");
      console.log(e);
    }
  };

  useEffect(() => {
    if (players?.length > 0) {
      setProgress((players?.length / 13) * 100);
    }
  }, [players]);
  useEffect(() => {
    fetchTeamDetails();
  }, []);

  return (
    <div className="card">
      {/* <h1>Dashboard</h1> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Welcome back, {team?.name}</h1>
        </div>
        <div style={{ flex: 1, marginLeft: "1rem" }}>
          <hr />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          paddingLeft: "18em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "25%",
          }}
        >
          <div style={{ background: "#D1E8FF", padding: "2rem" }}>
            <h3>6/13 players</h3>
            <div style={{ width: "700px" }}>
              <div className="mainDiv">
                <div
                  className="childDiv"
                  style={{ width: `${progress}%`, background: "#00376F" }}
                >
                  <span> </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: "#E8E8E8", padding: "2rem" }}>
            <h3>20,000 Point left</h3>
            <div style={{ width: "700px" }}>
              <div className="mainDiv">
                <div
                  className="childDiv"
                  style={{ width: `${progress}%`, background: "#6A3BB8" }}
                >
                  <span> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Boolean(players) && (
          <div
            style={{ width: "70%", marginLeft: "8em" }}
            className="tables-div"
          >
            <div className="dashboard-players-table table">
              <div className="table-head">
                <p className="table-head">Players</p>
              </div>
              <table>
                {players.map((e) => (
                  <tr key={e._id}>
                    {/* <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td> */}
                    <td>
                      <img
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%" }}
                        src={"/assets/images/players/" + e?.image}
                      />
                    </td>
                    <td>{e.name}</td>
                    <td>{e.battingHand}</td>
                    <td>AVG {e.average}</td>
                    <td>₹ {e.bidPrice}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default DashboardTeam;
