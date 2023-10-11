import React, { useEffect, useState } from "react";
import "./AuctionScreen.css";

import playerFramecut from "../../Assets/Images/AuctionScreen/frame.svg";
import basePriceBoxcut from "../../Assets/Images/AuctionScreen/base_price_box.svg";
import bidPriceBoxcut from "../../Assets/Images/AuctionScreen/bid_price_box.svg";
import boxA1 from "../../Assets/Images/AuctionScreen/course_box_cut.svg";
import boxA2 from "../../Assets/Images/AuctionScreen/course_box_cut2.svg";
import reactanglebox from "../../Assets/Images/AuctionScreen/reactangle-box.svg";

import allRounderlogo from "../../Assets/Images/player_type_icons/All_rounder.png";
import batterlogo from "../../Assets/Images/player_type_icons/batter.png";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler.png";
import axios from "axios";
// import image from "../../../../../Backend/public/images"
const imgFolder = "../../../../../Backend/public/images";
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
    <div className="auction-screen-wrapper">
      <div className="black-blend"></div>
      {/* player Frame */}
      <img id="AC-playerframe" src={playerFramecut} alt="" />
      {/* base price box */}
      <img id="AC-basepricebox" src={basePriceBoxcut} alt="" />
      {/* bid price box */}
      <img id="AC-bidpricebox" src={bidPriceBoxcut} alt="" />

      {/* -------------------------------------LINE 1------------------------------ */}
      {/* course  */}
      <img id="AC-lineA1" src={boxA1} alt="" />
      {/* Semester  */}
      <img id="AC-lineA2" src={boxA2} alt="" />
      {/* Semester  */}
      <img id="AC-lineA3" src={boxA1} alt="" />

      {/* -------------------------------------LINE 2------------------------------ */}
      {/* course  */}
      <img id="AC-lineB1" src={reactanglebox} alt="" />
      {/* Semester  */}
      <img id="AC-lineB2" src={reactanglebox} alt="" />
      {/* Semester  */}
      <img id="AC-lineB3" src={reactanglebox} alt="" />

      <img
        src={"/assets/images/players/" + playerData?.image}
        alt="current player logo"
      />

      <div>
        <h3 className="AC-playernametext">{playerData?.name}</h3>
        <div>
          <div className="">Bid Wining Team</div>
          <div className="">{playerData?.currentTeam}</div>
        </div>

        <div id="AC-basepricetext">
          <div className="">Base Price</div>
          <div className="">{playerData?.basePrice}</div>
        </div>

        <div id="AC-bidpricetext">
          <div className="">LIVE BID</div>
          <div id="bidpriceamt" className="">
            {playerData?.bidPrice || 0}
          </div>
        </div>

        <div id="AC-branchtext">
          <div>course : {playerData?.branch}</div>
        </div>

        <div>
          <div id="AC-semestertext">Semester {playerData?.currentSemester}</div>
        </div>
        <div>
          <div id="AC-prevteamtext">Prev Team : {playerData?.previousTeam}</div>
        </div>

        <div>
          <div className="">Type</div>
          <div className="">{playerData?.playerType}</div>
        </div>

        <div>
          <div className="">Runs</div>
          <div className="">{playerData?.totalRuns}</div>
        </div>
        <div>
          <div className="">Wicket</div>
          <div className="">{playerData?.totalWickets}</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
