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

import cpl_logo from "../../Assets/Images/logo/logo.png";
import vibranium_logo from "../../Assets/Images/logo/vibranium.png";

import axios from "axios";
// import image from "../../../../../Backend/public/images"
const imgFolder = "../../../../../Backend/public/images";
const AuctionScreen = ({ socket }) => {
  const [bidPrice, setBidPrice] = useState(0);
  const [playerData, setPlayerData] = useState();
  const [sellStatus, setSellStatus] = useState("none");
  useEffect(() => {
    socket.emit("get_focused_player", "get me focused player");
    socket.on("get_focused_player", (player) => {
      setPlayerData(player);
    });
    socket.on("new_selling_status", (status) => {
      console.log("current Status:-", status);
      setSellStatus(status);
    });
  }, []);

  function playerTypeicon(type) {
    if (type === "allrounder") {
      return allRounderlogo;
    }
    if (type === "batsman") {
      return batterlogo;
    }
    if (type === "bowler") {
      return bowlerlogo;
    }
  }

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
  const renderLogo = () => {
    if (sellStatus === "selling_started") {
      return (
        <h1
          style={{
            color: "red",
            fontSize: "78px",
            fontWeight: "900",
          }}
        >
          Selling the player..
        </h1>
      );
    } else if (sellStatus === "selling_successfull") {
      return <img src="/assets/images/sold.png" />;
    }
    return <></>;
  };
  return (
    <div style={{ position: "relative" }} className="auction-screen-wrapper">
      {/* SOLD LOGO */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          zIndex: "99",
          rotate: "-20deg",
        }}
      >
        {renderLogo()}
      </div>

      <img alt="cpllogo" id="cpllogo" src={cpl_logo} />
      <img alt="vibranium_logo" id="vibranium_logo" src={vibranium_logo} />

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

      <div id="AC-playerimage-wrapper">
        <img
          id="AC-playerimage"
          src={"/assets/images/players/" + playerData?.image}
          alt="current player logo"
        />
      </div>

      <div>
        <h3 className="AC-playernametext">{playerData?.name}</h3>

        <img
          id="AC-playerIcon"
          src={playerTypeicon(playerData?.playerType)}
          alt="current player logo"
        />

        <div id="AC-basepricetext">
          <div>Base Price</div>
          <div id="AC-basepriceamt">{playerData?.basePrice}</div>
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

        <div id="AC-inningstext">Innings : {playerData?.innings}</div>
        <div id="AC-runstext">Runs : {playerData?.totalRuns}</div>
        <div id="AC-wicketstext">Wickets : {playerData?.totalWickets}</div>

        <div id="AC-bidwinningteam">
          BY <br></br>
          {playerData?.currentTeam}
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
