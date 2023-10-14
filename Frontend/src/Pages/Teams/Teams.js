import "./teams.css";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// const dotenv = require("dotenv");
// dotenv.config({ path: "../../../config.env" });
const Teams = () => {
  const editIcon = <FontAwesomeIcon icon={faPencilAlt} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/team/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Team data:", response.data.data);
        setData(response.data.data);
      })
      .catch((err) => console.log("Error fetching teams data:", err));
  }, []);

  return (
    <div className="card">
      <h1>Teams</h1>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Player</th>
              <th>Bid Price Left</th>
              <th>Coach/mentor</th>
              <th>All rounder</th>
              <th>Batsman</th>
              <th>Bowler</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((team) => {
                return (
                  <tr key={team._id}>
                    <td>{team.name}</td>
                    <td>{team.totalPlayer}</td>
                    <td>{team.bidPointBalance}</td>
                    <td>{team.captain}</td>
                    <td>{team.average}</td>
                    <td>{team.strikeRate}</td>
                    <td>{team.economyRate}</td>
                    <td>
                      <span className="nav-icons">{editIcon}</span>
                      <span className="nav-icons">{deleteIcon}</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Teams;
