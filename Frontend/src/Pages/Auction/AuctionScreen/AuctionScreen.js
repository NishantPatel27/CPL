import React, { useEffect, useState } from "react";
import playerlogo from "../../Assets/Images/player/player image.png";
import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import axios from "axios";
const AuctionScreen = ({ socket }) => {
  const [bidPrice, setBidPrice] = useState(0);
  const [playerData, setPlayerData] = useState();

  useEffect(() => {
    // fetch;
    console.log("Hello");
    socket.on("get_player_data", (playerData) => {
      // setBidPrice(playerData);
      setPlayerData(playerData);
      console.log(playerData);
    });
    socket.on("get_updated_wining_bid_team", (newTeam) => {
      setPlayerData((oldData) => ({
        ...oldData,
        ["currentTeam"]: newTeam,
      }));
    });
    socket.on("get_updated_bid", (newBidPrice) => {
      setPlayerData((oldData) => ({
        ...oldData,
        ["bidPrice"]: newBidPrice,
      }));
    });
  }, []);
  return (
    <div className="wrapper">
      <div className="profile" style={{ width: "100%" }}>
        <img src={playerlogo} alt="current player logo" />

        <div>
          <h3 className="playerName">{playerData?.name}</h3>
          <div>
            <div className="summary-title">Bid Wining Team</div>
            <div className="summary-stats">{playerData?.currentTeam}</div>
          </div>
          <div className="player-summary">
            <div>
              <div className="summary-title">Base Price</div>
              <div className="summary-stats">{playerData?.basePrice}</div>
            </div>
            <div>
              <div className="summary-title">Type</div>
              <div className="summary-stats">{playerData?.playerType}</div>
            </div>
            <div>
              <div className="summary-title">BID PRICE</div>
              <div
                style={{ fontSize: "2vw", fontWeight: "bold" }}
                className="summary-stats"
              >
                {playerData?.bidPrice || 0}
              </div>
            </div>
            <div>
              <div className="summary-title">Runs</div>
              <div className="summary-stats">{playerData?.totalRuns}</div>
            </div>
            <div>
              <div className="summary-title">Wicket</div>
              <div className="summary-stats">{playerData?.totalWickets}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
