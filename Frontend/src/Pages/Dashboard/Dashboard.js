import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  faCubes,
  faDollarSign,
  faPeopleGroup,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const playersIcon = <FontAwesomeIcon icon={faPeopleGroup} />;
  const teamsIcon = <FontAwesomeIcon icon={faCubes} />;
  const SoldIcon = <FontAwesomeIcon icon={faDollarSign} />;
  const pendingIcon = <FontAwesomeIcon icon={faPersonRays} />;
  const [stats, setStats] = useState();

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/player/stat/details`
      );
      console.log(response);
      if (response.status === 200) {
        setStats(response.data.status);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="card">
      {/* <h1>Dashboard</h1> */}

      <div className="dashboard-cards">
        <div className="stats-card">
          <div>
            <p className="card-numbers">
              {stats?.countSold + stats?.countUnsold}
            </p>
            <p className="card-text">Total Players</p>
          </div>
          <div>
            <span className="card-icons">{playersIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">10</p>
            <p className="card-text">Total Teams</p>
          </div>
          <div>
            <span className="card-icons">{teamsIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">{stats?.countSold}</p>
            <p className="card-text">Sold Sold</p>
          </div>
          <div>
            <span className="card-icons">{SoldIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">{stats?.countUnsold}</p>
            <p className="card-text">Unsold Players</p>
          </div>
          <div>
            <span className="card-icons">{pendingIcon}</span>
          </div>
        </div>
      </div>

      <div className="tables-div">
        <div className="teams-table table">
          <div className="table-head">
            <p className="table-head">Teams</p>
            <Link to="/teams">
              <button>Manage</button>
            </Link>
          </div>
          <div>
            <table>
              <tr>
                <td>Knights </td>
                <td>
                  {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
                </td>
                <td>Empire</td>
                <td>
                  {/* <img className="team-logo" src={Empirelogo} alt="logo" /> */}
                </td>
              </tr>
              <tr>
                <td>Hurricanes</td>
                <td>
                  {/* <img className="team-logo" src={Hurricaneslogo} alt="logo" /> */}
                </td>
                <td>Wolves</td>
                <td>
                  {/* <img className="team-logo" src={Wolveslogo} alt="logo" /> */}
                </td>
              </tr>
              <tr>
                <td>Royals </td>
                <td>
                  {/* <img className="team-logo" src={royalslogo} alt="logo" /> */}
                </td>
                <td>Super kings</td>
                <td>
                  {/* <img className="team-logo" src={superkingslogo} alt="logo" /> */}
                </td>
              </tr>
              <tr>
                <td>Blaster</td>
                <td>
                  {/* <img className="team-logo" src={Blasterlogo} alt="logo" /> */}
                </td>
                <td>Strikers</td>
                <td>
                  {/* <img className="team-logo" src={Strikerslogo} alt="logo" /> */}
                </td>
              </tr>
              <tr>
                <td>Star</td>
                <td>
                  {/* <img className="team-logo" src={starslogo} alt="logo" /> */}
                </td>
                <td>Titans</td>
                <td>
                  {/* <img className="team-logo" src={Titanslogo} alt="logo" /> */}
                </td>
              </tr>
              <tr>
                <td>Panthers</td>
                <td>
                  {/* <img className="team-logo" src={Pantherslogo} alt="logo" /> */}
                </td>
                <td>Falcons</td>
                <td>
                  {/* <img className="team-logo" src={Falconslogo} alt="logo" /> */}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="dashboard-players-table table">
          <div className="table-head">
            <p className="table-head">Players</p>
            <Link to="/players">
              <button>Manage</button>
            </Link>
          </div>
          <table>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>Yusuf Pathan</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>KL Rahul</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>Virat Kholi</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>MS Dhoni</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>Rahul Sharma</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                {/* <img className="team-logo" src={knightslogo} alt="logo" /> */}
              </td>
              <td>Rahul David</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
