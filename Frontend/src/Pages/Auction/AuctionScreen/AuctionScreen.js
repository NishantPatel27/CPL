import React from "react";
import playerlogo from "../../Assets/Images/player/player image.png";
import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import { useAuctionContext } from "../auctionContext";


const AuctionScreen = () => {
  const {bidPrice} = useAuctionContext()
  return (
    <div className="wrapper">
      <div className="profile" style={{ width: "100%" }}>
        <img src={playerlogo} alt="current player logo" />

        <div>
          <h3 className="playerName">Meezan Mallick</h3>
          <div className="player-summary">
            <div>
              <div className="summary-title">Base Price</div>
              <div className="summary-stats">1000</div>
            </div>
            <div>
              <div className="summary-title">Type</div>
              <div className="summary-stats">Batsman</div>
            </div>
            <div>
              <div className="summary-title">Bid Price</div>
              <div
                style={{ fontSize: "2vw", fontWeight: "bold" }}
                className="summary-stats"
              >
                {bidPrice}
              </div>
            </div>
            <div>
              <div className="summary-title">Runs</div>
              <div className="summary-stats">101</div>
            </div>
            <div>
              <div className="summary-title">Wicket</div>
              <div className="summary-stats">200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
