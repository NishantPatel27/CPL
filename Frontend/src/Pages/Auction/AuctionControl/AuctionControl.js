import "./Auction.css";
import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const AuctionControl = ({ socket }) => {
  const [playerData, setPlayerData] = useState(null);
  const { id } = useParams();
  const [bidprice, setbidprice] = useState(0);
  const [newTeam, setnewTeam] = useState("None");
  const [nextPlayerType, setnextPlayerType] = useState("any");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [loaderText, setLoaderText] = useState("");
  const [stats, setStats] = useState();

  const incrementBidPrice = (n) => {
    setbidprice((prev) => Number(prev) + Number(n));
  };

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

  // const nextRound = async () => {
  //   try {
  //     await axios.patch(
  //       `${process.env.REACT_APP_BACKEND_URL}/player/nextRound`
  //     );
  //     toast.success("Players updated successfully for the next round");
  //     await refreshPlayer(nextPlayerType);
  //   } catch (error) {
  //     console.error("Error fetching next round data:", error);
  //     toast.error("Error fetching next round data");
  //   }
  // };

  // const handleNoPlayerDataFound = async () => {
  //   toast.info("No more players of this type found. Moving to next round.", {
  //     position: "top-center",
  //     autoClose: 3000,
  //     closeButton: (
  //       <button onClick={nextRound} className="update-bid-btn">
  //         Next Round
  //       </button>
  //     ),
  //   });
  // };

  const refreshPlayer = async (type) => {
    setLoaderText("Loading next player...");
    setIsLoading(true);
    // const playerId = playerData?._id === undefined? "652b9ef11f1cc22b42569818": playerData._id;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/player/randomPlayer`,
        { withCredentials: true }
      );
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BACKEND_URL}/player/random/${type}/${playerId}`,
      //   { withCredentials: true }
      // );
      if (response.status === 200) {
        let myplayer = response.data.data;
        console.log(myplayer);
        setPlayerData(myplayer);
        setbidprice(Number(myplayer.bidPrice));
        socket.emit("player_data", myplayer);
      } else {
        setMessage(response.statusText);
      }
      setLoaderText("");
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn("Player data not found.");
        // await handleNoPlayerDataFound();
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

  useEffect(() => {
    const fetchInitialData = async () => {
      await refreshPlayer(nextPlayerType);
      console.log("intial stage");
      const hasNoNullPlayers = !playerData || playerData.length === 0;
      if (hasNoNullPlayers) {
        // await handleNoPlayerDataFound();
        // toast.error("no player found");
      }
    };

    fetchInitialData();

    return () => {
      socket.emit("player_data", {});
    };
  }, [nextPlayerType]);

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
        setPlayerData(null);
        socket.emit("change_selling_status", "selling_successful");
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
    // try {
    //   await refreshPlayer(nextPlayerType);
    // } catch (error) {
    //   setLoaderText("");
    //   setIsLoading(false);
    //   setMessage(error);
    //   console.log("error", error);
    // }

    setIsLoading(true);
    setLoaderText("Skipping the player...");
    socket.emit("change_selling_status", "selling_started");

    const playerId = playerData._id;
    let mystatus = "";

    if (playerData.status === "skipped") {
      mystatus = "unsold";
    } else {
      mystatus = "skipped";
    }

    const skipdata = {
      image: playerData.image,
      name: playerData.name,
      bidPrice: playerData.bidPrice,
      basePrice: playerData.basePrice,
      course: playerData.course,
      currentSemester: playerData.currentSemester,
      phoneNumber: playerData.phoneNumber,
      currentTeam: playerData.currentTeam,
      playerType: playerData.playerType,
      battingHand: playerData.battingHand,
      bowlingStyle: playerData.bowlingStyle,
      status: mystatus,
      playerNumber: playerData.playerNumber,
      PlayersGrade: playerData.PlayersGrade,
    };

    try {
      const updatedPlayer = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/player/update/${playerId}`,
        skipdata,
        { withCredentials: true }
      );

      if (updatedPlayer.status === 200) {
        socket.emit("sell_player", updatedPlayer.data);
        setPlayerData(null);
        socket.emit("change_selling_status", "selling_unsuccessful");
        toast.success("Player Skipped");
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
                    <div className="summary-title">Status</div>
                    <div
                      style={{
                        backgroundColor:
                          playerData.status === "available" ? "green" : "red",
                        fontWeight: "700",
                        color: "white",
                        padding: "10px",
                      }}
                      className="summary-stats"
                    >
                      <span>{playerData.status.toUpperCase()}</span>
                    </div>
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
                {/* <div className="update-bid-wrapper">
                  <button onClick={nextRound} className="update-bid-btn">
                    Next Round
                  </button>
                </div> */}
              </div>

              <div className="nextplayer">
                <div className="nextplayer-left">
                  <table>
                    <tbody>
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
                            <option value="VEER YODHA">VEER YODHA</option>
                            <option value="AGNI PUTRA">AGNI PUTRA</option>
                            <option value="VAYU SHAKTI">VAYU SHAKTI</option>
                            <option value="TRISHUL TITANS">
                              TRISHUL TITANS
                            </option>
                            <option value="CHHATRAPATI SENA">
                              CHHATRAPATI SENA
                            </option>
                            <option value="KARNA VIJAY">KARNA VIJAY</option>
                            <option value="GARUDA FORCE">GARUDA FORCE</option>
                            <option value="DHARMA RAKSHAK">
                              DHARMA RAKSHAK
                            </option>
                            <option value="RUDRA AVATAR">RUDRA AVATAR</option>
                            <option value="ASHOKA WARRIORS">
                              ASHOKA WARRIORS
                            </option>
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
                    </tbody>
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
