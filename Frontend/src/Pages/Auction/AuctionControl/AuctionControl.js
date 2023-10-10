import "./Auction.css";
import playerlogo from "../../Assets/Images/player/player image.png";
import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect } from "react";

const AuctionControl = ({ socket }) => {
  // const playerImage = playerlogo;
  const [playerData, setPlayerData] = useState();
  const { id } = useParams();
  const [bidprice, setbidprice] = useState(0);
  const [newTeam, setnewTeam] = useState("Knights");
  const [nextPlayerType, setnextPlayerType] = useState("allrounder");

  function incrementBidPrice(n) {
    let currentbidprice = bidprice;

    setbidprice(Number(currentbidprice) + Number(n));
    socket.emit("increment_bid", Number(currentbidprice) + Number(n));
  }
  const updatePlayerData = async () => {
    try {
      // const updatedPlayer = await axios.put(
      //   `http://localhost:6001/player/update/${playerData._id}`,
      //   { withCredentials: true },
      //   playerData
      // );
      const updatedUser = {
        ...playerData,
        ["bidPrice"]: bidprice,
        ["currentTeam"]: newTeam,
      };
      const updatedPlayer = await axios({
        method: "put",
        url: `http://localhost:6001/player/update/${playerData._id}`,
        withCredentials: true,
        data: updatedUser,
      });
      console.log(updatedPlayer);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSelling = async () => {
    await updatePlayerData(playerData);
    refreshPlayer();
  };
  const refreshPlayer = () => {
    axios
      .get("http://localhost:6001/player/random", { withCredentials: true })
      .then((response) => {
        // console.log("done");
        // console.log("Random Player data:", response.data.data);
        setPlayerData(response.data.data);
        setbidprice(Number(response.data.data.bidPrice));
        console.log(socket?.id);
        socket.emit("player_data", response.data.data);
      })
      .catch((err) => console.log("Error fetching player data:", err));
  };
  useEffect(() => {
    // console.log("id", id);
    // console.log("random fetching");

    try {
      refreshPlayer();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="profile">
        <img src={playerlogo} alt="current player logo" />
        {playerData && (
          <div>
            <h3 className="playerName">{playerData.name}</h3>
            <div className="player-summary">
              <div>
                <div className="summary-title">Base Price</div>
                <div className="summary-stats">{playerData.basePrice}</div>
              </div>
              <div>
                <div className="summary-title">Type</div>
                <div className="summary-stats">{playerData.playerType}</div>
              </div>
              <div>
                <div className="summary-title">Runs</div>
                <div className="summary-stats">{playerData.totalRuns}</div>
              </div>
              <div>
                <div className="summary-title">Wicket</div>
                <div className="summary-stats">{playerData.totalWickets}</div>
              </div>
            </div>
            <div className="sold-wrapper">
              <button onClick={handleSelling} className="soldbtn">
                SOLD
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="auction-control">
        <h3>Auction Control</h3>

        <div className="bid-control">
          <div>
            <label>Biding Price</label>
            <input
              onChange={(e) => {
                setbidprice(Number(e.target.value));
              }}
              id="bid-input"
              className="bid-input"
              type="number"
              value={bidprice}
            />
          </div>

          <button
            onClick={() => {
              incrementBidPrice(100);
            }}
          >
            + 100
          </button>
          <button
            onClick={() => {
              incrementBidPrice(500);
            }}
          >
            + 500
          </button>
          <button
            onClick={() => {
              incrementBidPrice(1000);
            }}
          >
            + 1000
          </button>
        </div>

        <div className="update-bid-wrapper">
          <button className="update-bid-btn">Update Price</button>
        </div>

        <div className="nextplayer">
          <div className="nextplayer-left">
            <table>
              <tr>
                <td>
                  <label>New Team</label>
                </td>
                <td>
                  {/* SELECT TEAM */}
                  <select
                    name="team"
                    id="team-dropdown"
                    title="team"
                    className="nextplayer-input"
                    onChange={(e) => {
                      setnewTeam(e.target.value);
                      socket.emit("change_wining_bid_team", e.target.value);
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
                </td>
              </tr>
              <tr>
                <td>
                  <label>Next Player</label>
                </td>
                <td>
                  <select
                    className="nextplayer-input"
                    onChange={(e) => {
                      setnextPlayerType(e.target.value);
                    }}
                  >
                    <option value="allrounder">All rounder</option>
                    <option value="batsman">Batsman</option>
                    <option value="bowler">Bowler</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>

          <div className="nextplayer-right">
            {/* SOLD PLAYERS */}
            <div className="soldplayer-stats stats-box">
              SOLD PLAYERS
              <div className="player-digit">145</div>
              <div className="icon-wrapper">
                <div>
                  <img
                    className="player-type-icon"
                    src={batterlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
                <div>
                  <img
                    className="player-type-icon"
                    src={allRounderlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
                <div>
                  <img
                    className="player-type-icon"
                    src={bowlerlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
              </div>
            </div>

            {/* UNSOLD PLAYER */}
            <div className="soldplayer-stats stats-box">
              UNSOLD PLAYERS
              <div className="player-digit">145</div>
              <div className="icon-wrapper">
                <div>
                  <img
                    className="player-type-icon"
                    src={batterlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
                <div>
                  <img
                    className="player-type-icon"
                    src={allRounderlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
                <div>
                  <img
                    className="player-type-icon"
                    src={bowlerlogo}
                    alt="current player logo"
                  />
                  <span>149</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuctionControl;
