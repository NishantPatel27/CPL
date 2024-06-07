import "./Auction.css";
// import playerlogo from "../../Assets/Images/player/player image.png";
import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const AuctionControl = ({ socket }) => {
  const [playerData, setPlayerData] = useState();
  const { id } = useParams();
  const [bidprice, setbidprice] = useState(0);
  const [newTeam, setnewTeam] = useState("Knights");
  const [nextPlayerType, setnextPlayerType] = useState("any");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [loaderText, setLoaderText] = useState("");
  const [stats, setStats] = useState();

  const incrementBidPrice = (n) => {
    setbidprice((prev) => Number(prev) + Number(n));
  };

  const fetchStats = async () => {
    console.log("my stats");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/player/stat/details`
      );
      if (response.status === 200) {
        setStats(response.data.status);
        console.log("STATS: ", response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nextRound = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/player/nextRound`
      );
      toast.success("Players updated successfully for the next round");
      await refreshPlayer(nextPlayerType);
    } catch (error) {
      console.error("Error fetching next round data:", error);
      toast.error("Error fetching next round data");
    }
  };

  const handleNoPlayerDataFound = async () => {
    // Display toast informing the user about the situation
    toast.info("No more players of this type found. Moving to next round.", {
      position: "top-center",
      autoClose: 3000,
      // Render a button in the toast notification to allow the user to proceed to the next round manually
      closeButton: (
        <button onClick={nextRound} className="update-bid-btn">
          Next Round
        </button>
      ),
    });
  };

  const refreshPlayer = async (type) => {
    setLoaderText("Loading next player...");
    setIsLoading(true);
    const playerId =
      playerData?._id === undefined
        ? "652b9ef11f1cc22b42569818"
        : playerData._id;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/player/random/${type}/${playerId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPlayerData(response.data.data);
        setbidprice(Number(response.data.data.bidPrice));
        socket.emit("player_data", response.data.data);
      } else {
        setMessage(response.statusText);
      }
      setLoaderText("");
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn("Player data not found. Initiating next round.");
        await handleNoPlayerDataFound();
      } else {
        setLoaderText("");
        setIsLoading(false);
        setMessage(err.response.data.status);
        console.log("Error fetching player data:", err);
      }
    } finally {
      setLoaderText("");
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await refreshPlayer(nextPlayerType);

    // Check if there are no players with status null
    const hasNoNullPlayers = !playerData || playerData.length === 0;

    // If there are no players with status null, initiate next round logic
    if (hasNoNullPlayers) {
      await handleNoPlayerDataFound();
    }

    return () => {
      socket.emit("player_data", {});
    };
  }, []);

  useEffect(() => {
    socket.emit("update_bid", Number(bidprice));
  }, [bidprice]);

  const handleSelling = async () => {
    setIsLoading(true);
    setLoaderText("Selling the player...");
    socket.emit("change_selling_status", "selling_started");

    try {
      const updatedPlayer = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auction/sell`,
        {
          playerId: playerData._id,
          bidPrice: bidprice,
          currentTeam: newTeam,
        },
        { withCredentials: true }
      );

      if (updatedPlayer.status === 200) {
        socket.emit("sell_player", updatedPlayer.data);
        setPlayerData();
        socket.emit("change_selling_status", "selling_successfull");
        toast.success("Player sold successfully");
        await fetchStats();
        await refreshPlayer(nextPlayerType);
      } else {
        socket.emit("change_selling_status", "selling_error");
        toast.error(updatedPlayer.statusText);
      }
    } catch (e) {
      setIsLoading(false);
      setLoaderText("");
      socket.emit("change_selling_status", "selling_error");
      toast.error(e.response.data.status);
    } finally {
      setLoaderText("");
      setIsLoading(false);
      socket.emit("change_selling_status", "none");
    }
  };

  const handleSkip = async () => {
    try {
      await refreshPlayer(nextPlayerType);
    } catch (error) {
      setLoaderText("");
      setIsLoading(false);
      setMessage(error);
      console.log("error", error);
    }
  };

  return (
    <div className="wrapper">
      {!isLoading ? (
        playerData ? (
          <>
            <div className="profile">
              <img
                src={"/assets/images/players/" + playerData?.image}
                alt="current player logo"
              />
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
                </div>
                <div className="sold-wrapper">
                  <button onClick={handleSelling} className="soldbtn">
                    SOLD
                  </button>
                </div>
              </div>
            </div>
            <div className="auction-control">
              <h3>Auction Control</h3>
              <div className="bid-control">
                <div>
                  <label>Biding Price</label>
                  <input
                    onChange={(e) => setbidprice(Number(e.target.value))}
                    id="bid-input"
                    className="bid-input"
                    type="number"
                    value={bidprice}
                  />
                </div>
                <button onClick={() => incrementBidPrice(100)}>+ 100</button>
                <button onClick={() => incrementBidPrice(500)}>+ 500</button>
                <button onClick={() => incrementBidPrice(1000)}>+ 1000</button>
              </div>
              <div className="right-side">
                <div className="update-bid-wrapper">
                  <button onClick={handleSkip} className="update-bid-btn">
                    Skip
                  </button>
                </div>
                <div className="update-bid-wrapper">
                  <button onClick={nextRound} className="update-bid-btn">
                    Next Round
                  </button>
                </div>
              </div>

              <div className="nextplayer">
                <div className="nextplayer-left">
                  <table>
                    <tr>
                      <td>
                        <label>New Team</label>
                      </td>
                      <td>
                        <select
                          name="team"
                          id="team-dropdown"
                          title="team"
                          className="nextplayer-input"
                          onChange={(e) => {
                            setnewTeam(e.target.value);
                            socket.emit(
                              "change_wining_bid_team",
                              e.target.value
                            );
                          }}
                        >
                          <option value="None">None</option>
                          <option value="ROYAL CHALLENGERS">
                            ROYAL CHALLENGERS
                          </option>
                          <option value="KINGS XI">KINGS XI</option>
                          <option value="TITANS">TITANS</option>
                          <option value="KNIGHT RIDERS">KNIGHT RIDERS</option>
                          <option value="INDIANS">INDIANS</option>
                          <option value="ROYALS">ROYALS</option>
                          <option value="SUNRISES">SUNRISES</option>
                          <option value="CAPITALS">CAPITALS</option>
                          <option value="SUPER GIANTS">SUPER GIANTS</option>
                          <option value="SUPER KINGS">SUPER KINGS</option>
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
                          onChange={(e) => setnextPlayerType(e.target.value)}
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
                  <div className="soldplayer-stats stats-box">
                    SOLD PLAYERS
                    <div className="player-digit">{stats?.countSold}</div>
                    <div className="icon-wrapper">
                      <div>
                        <img
                          className="player-type-icon"
                          src={batterlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.batsmanCountSold}</span>
                      </div>
                      <div>
                        <img
                          className="player-type-icon"
                          src={allRounderlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.allRounderCountSold}</span>
                      </div>
                      <div>
                        <img
                          className="player-type-icon"
                          src={bowlerlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.bowlerCountSold}</span>
                      </div>
                    </div>
                  </div>
                  <div className="soldplayer-stats stats-box">
                    UNSOLD PLAYERS
                    <div className="player-digit">{stats?.countUnsold}</div>
                    <div className="icon-wrapper">
                      <div>
                        <img
                          className="player-type-icon"
                          src={batterlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.batsmanCountUnsold}</span>
                      </div>
                      <div>
                        <img
                          className="player-type-icon"
                          src={allRounderlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.allRounderCountUnsold}</span>
                      </div>
                      <div>
                        <img
                          className="player-type-icon"
                          src={bowlerlogo}
                          alt="current player logo"
                        />
                        <span>{stats?.bowlerCountUnsold}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ textAlign: "center", color: "red" }}>{message}</h3>
          </>
        )
      ) : (
        <>
          <h3 style={{ textAlign: "center" }}>{loaderText}</h3>
        </>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AuctionControl;
