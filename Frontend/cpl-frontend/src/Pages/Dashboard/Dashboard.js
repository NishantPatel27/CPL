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

  return (
    <div className="card">
      {/* <h1>Dashboard</h1> */}

      <div className="dashboard-cards">
        <div className="stats-card">
          <div>
            <p className="card-numbers">234</p>
            <p className="card-text">Total Players</p>
          </div>
          <div>
            <span className="card-icons">{playersIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">12</p>
            <p className="card-text">Total Teams</p>
          </div>
          <div>
            <span className="card-icons">{teamsIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">125</p>
            <p className="card-text">Players Sold</p>
          </div>
          <div>
            <span className="card-icons">{SoldIcon}</span>
          </div>
        </div>
        <div className="stats-card">
          <div>
            <p className="card-numbers">125</p>
            <p className="card-text">Players Unsold</p>
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
                  <img className="team-logo" src={knightslogo} alt="logo" />
                </td>
                <td>Empire</td>
                <td>
                  <img className="team-logo" src={Empirelogo} alt="logo" />
                </td>
              </tr>
              <tr>
                <td>Hurricanes</td>
                <td>
                  <img className="team-logo" src={Hurricaneslogo} alt="logo" />
                </td>
                <td>Wolves</td>
                <td>
                  <img className="team-logo" src={Wolveslogo} alt="logo" />
                </td>
              </tr>
              <tr>
                <td>Royals </td>
                <td>
                  <img className="team-logo" src={royalslogo} alt="logo" />
                </td>
                <td>Super kings</td>
                <td>
                  <img className="team-logo" src={superkingslogo} alt="logo" />
                </td>
              </tr>
              <tr>
                <td>Blaster</td>
                <td>
                  <img className="team-logo" src={Blasterlogo} alt="logo" />
                </td>
                <td>Strikers</td>
                <td>
                  <img className="team-logo" src={Strikerslogo} alt="logo" />
                </td>
              </tr>
              <tr>
                <td>Star</td>
                <td>
                  <img className="team-logo" src={starslogo} alt="logo" />
                </td>
                <td>Titans</td>
                <td>
                  <img className="team-logo" src={Titanslogo} alt="logo" />
                </td>
              </tr>
              <tr>
                <td>Panthers</td>
                <td>
                  <img className="team-logo" src={Pantherslogo} alt="logo" />
                </td>
                <td>Falcons</td>
                <td>
                  <img className="team-logo" src={Falconslogo} alt="logo" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="players-table table">
          <div className="table-head">
            <p className="table-head">Players</p>
            <Link to="/players">
              <button>Manage</button>
            </Link>
          </div>
          <table>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td>
              <td>Yusuf Pathan</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td>
              <td>KL Rahul</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td>
              <td>Virat Kholi</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td>
              <td>MS Dhoni</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
              </td>
              <td>Rahul Sharma</td>
              <td>SR 39.44</td>
              <td>AVG 78.5</td>
              <td>BP 12,00</td>
              <td>Runs 344</td>
            </tr>
            <tr>
              <td>
                <img className="team-logo" src={knightslogo} alt="logo" />
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
