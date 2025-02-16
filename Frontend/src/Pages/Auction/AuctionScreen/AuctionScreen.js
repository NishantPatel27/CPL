import React, { useEffect, useState } from "react";
import "./AuctionScreen.css";

import playerFramecut from "../../Assets/Images/AuctionScreen/frame.svg";
import basePriceBoxcut from "../../Assets/Images/AuctionScreen/base_price_box.svg";
import bidPriceBoxcut from "../../Assets/Images/AuctionScreen/bid_price_box.svg";
import boxA1 from "../../Assets/Images/AuctionScreen/course_box_cut.svg";
import boxA2 from "../../Assets/Images/AuctionScreen/course_box_cut2.svg";
import reactanglebox from "../../Assets/Images/AuctionScreen/reactangle-box.svg";

import allRounderlogo from "../../Assets/Images/player_type_icons/all_rounder_white.svg";
import batterlogo from "../../Assets/Images/player_type_icons/batter_white.svg";
import bowlerlogo from "../../Assets/Images/player_type_icons/bowler_white.svg";

import cpl_logo from "../../Assets/Images/logo/gupl.png";
import gulogo from "../../Assets/Images/logo/gulogo.png";

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
    } else if (sellStatus === "selling_successful") {
      return <img src="/assets/images/sold.png" />;
    } else if (sellStatus === "selling_unsuccessful") {
      return <img src="/assets/images/un_sold.png" />;
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
      <img alt="Gu_logo" id="vibranium_logo" src={gulogo} />

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
      {/* player type  */}
      <img id="AC-lineA3" src={boxA1} alt="" />

      {/* -------------------------------------LINE 2------------------------------ */}
      {/* batting style  */}
      <img id="AC-lineB1" src={reactanglebox} alt="" />
      {/* bowling style  */}
      <img id="AC-lineB2" src={reactanglebox} alt="" />

      <div id="AC-playerimage-wrapper">
        <img
          id="AC-playerimage"
          src={"/assets/images/players/" + playerData?.image}
          alt="current player logo"
        />
      </div>
      <div>
        <h3 className="AC-playernametext">{playerData?.name}</h3>

        {/* <img
          id="AC-playerIcon"
          src={playerTypeicon(playerData?.playerType)}
          alt="current player logo"
        /> */}

        <div id="AC-basepricetext">
          <div>Base Price</div>
          <div id="AC-basepriceamt">
            {playerData && playerData.basePrice
              ? playerData.basePrice.toLocaleString()
              : 0}
          </div>
        </div>

        <div id="AC-bidpricetext">
          <div className="">LIVE BID</div>
          <div id="bidpriceamt" className="">
            {playerData && playerData.bidPrice
              ? playerData.bidPrice.toLocaleString()
              : 0}
          </div>
        </div>

        <div id="AC-branchtext">
          <div>{playerData?.branch}</div>
        </div>

        <div>
          <div id="AC-branchtext">Course : {playerData?.course}</div>
        </div>
        <div>
          <div id="AC-semestertext">
            Semester : {playerData?.currentSemester}
          </div>
        </div>
        <div>
          <div id="AC-prevteamtext">type : {playerData?.playerType}</div>
        </div>

        <div id="AC-inningstext">Batting hand : {playerData?.battingHand}</div>

        <div id="AC-wicketstext">
          Bolwing Style : {playerData?.bowlingStyle}
        </div>

        <div
          style={{
            top:
              playerData?.currentTeam === "ROYAL CHALLENGERS" ? "54vh" : "55vh",
          }}
          id="AC-bidwinningteam"
        >
          BY <br></br>
          <span style={{ color: "gold" }}>{playerData?.currentTeam}</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
