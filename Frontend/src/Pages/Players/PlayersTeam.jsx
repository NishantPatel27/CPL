import { useState } from "react";
import "./Players.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import batterlogo from "../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../Assets/Images/player_type_icons/bowler.png";
import allrounderlogo from "../Assets/Images/player_type_icons/All_rounder.png";
import { ToastContainer, toast } from "react-toastify";

const Players = () => {

  function playerTypeicon(type) {
    if (type === "allrounder") {
      return allrounderlogo;
    }
    if (type === "batsman") {
      return batterlogo;
    }
    if (type === "bowler") {
      return bowlerlogo;
    }
  }

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const players = await axios.get(process.env.REACT_APP_BACKEND_URL+"/team/player/all", {
        withCredentials: true,
      });
      if (players.status === 200) {
        // toast.success("Player details fetched successfully..");
        setData([...players.data.status]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  
  return (
    <div className="card">
      <div className="header">
        <div className="heading">
          <h2>Your Players</h2>
        </div>
      </div>

      <div className="table-wrapper players-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Phone number</th>
              <th>Type</th>
              <th>Bid Price</th>
              <th>Avg</th>
              <th>ECO</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((player) => {
                return (
                  <tr key={player._id}>
                    <td>
                       <img
                       alt="playerimg"
                        height={50}
                        style={{ borderRadius: "50%" }}
                        src={"/assets/images/players/" + player?.image}
                      />
                    </td>
                    <td>{player.name}</td>
                    <td>{player.currentSemester}</td>
                    <td>{player.branch}</td>
                    <td>{player.phoneNumber}</td>
                    <td>
                      <img
                        style={{
                          height:
                            player.playerType === "bowler" ? "15px" : "20px",
                          opacity: ".4",
                        }}
                        src={playerTypeicon(player.playerType)}
                        alt="current player logo"
                      />
                    </td>
                    <td>{player.bidPrice}</td>
                    <td>{player.average}</td>
                    <td>{player.economyRate}</td>
                    <td>{player.strikeRate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default Players;
