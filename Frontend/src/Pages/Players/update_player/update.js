import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    bidPrice: "",
    basePrice: "",
    course: "software",
    currentSemester: "1",
    phoneNumber: "",
    currentTeam: "None",
    playerType: "batsman",
    battingHand: "None",
    bowlingStyle: "None",
    status: "available",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { id } = useParams();
  // console.log("PLAYERS ID : ", id);
  //for pre filled form
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/player/" + id, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("player data ", response.data.data);

        setFormData(response.data.data);
      })
      .catch((err) => {
        console.log("error is ", err); //can not find player by id so handle input will not work
      });
    //handnle form
    const handleInput = () => {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/player/update/${id}`,
          formData,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("data is updated", response.data);
        })
        .catch((err) => {
          console.log("error is", err);
        });
    };
  }, []);

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = new FormData();

    Object.keys(formData).forEach((key) => {
      // console.log(key, formData[key]);
      d.append(key, formData[key]);
    });
    console.log(d);
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/player/update/" + id, d, {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        toast.success("Player Updated successfully.");
      })
      .catch((err) => {
        let errorMsg = err.response.data.data;
        console.log(errorMsg);
        if (errorMsg) {
          toast.error(errorMsg); // Display an error toast
        }
      });
  };

  return (
    <div className="container add-player-form">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div>
            <h2>Update Player</h2>
          </div>
          <div className="submit-btn">
            <button className="submit" type="submit">
              Update
            </button>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <fieldset>
          <legend>Pesonal Details</legend>
          <div className="form-container">
            <div className="row">
              <div>
                <label htmlFor="playername">Player Name</label>

                <input
                  className="form-inputs"
                  type="text"
                  name="name"
                  id="playername"
                  placeholder="Enter Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="mobilenumber">Mobile Number</label>

                <input
                  className="form-inputs"
                  type="text"
                  name="phoneNumber"
                  id="mobilenumber"
                  required
                  placeholder="Enter Mobile Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="curruntsemester">Current Semester</label>

                <select
                  name="currentSemester"
                  id="currentSemester"
                  className="dropdown"
                  value={formData.currentSemester}
                  onChange={handleInputChange}
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                  <option value="9">Semester 9</option>
                  <option value="10">Semester 10</option>
                </select>
              </div>
            </div>

            <div className="row">
              {/*<div>*/}
              {/*  <label htmlFor="DOB">Date of Birth</label>*/}
              {/*  <input*/}
              {/*    className="form-inputs"*/}
              {/*    type="date"*/}
              {/*    name="dateOfBirth"*/}
              {/*    id="DOB"*/}
              {/*    required*/}
              {/*    value={formData.dateOfBirth.slice(0, 10)}*/}
              {/*    onChange={handleInputChange}*/}
              {/*  />*/}
              {/*</div>*/}
              <div>
                <label htmlFor="course">Course</label>

                <select
                  name="course"
                  id="course"
                  className="dropdown"
                  value={formData.course}
                  onChange={handleInputChange}
                >
                  <option value="software">Software</option>
                  <option value="itims">ITIMS</option>
                  <option value="Arch & NS">
                    Architecture & Network Security
                  </option>
                  <option value="animation">Animation</option>
                  <option value="digital design">Digital Desing</option>
                  <option value="services">Services</option>
                  <option value="interior spatial">Interior Spatial</option>
                  <option value="new media">New media</option>
                  <option value="product design">Product Design</option>
                  <option value="-">None</option>
                </select>
              </div>
              <div>
                <label htmlFor="image">Player image</label>

                <input
                  className="form-inputs"
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Enter image"
                  value={formData.image}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>

                <select
                  name="status"
                  id="status"
                  className="dropdown"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="available">available</option>
                  <option value="skipped">skipped</option>
                  <option value="unsold">unsold</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
        {/* AUCTION */}
        <fieldset>
          <legend>Auction Details</legend>
          <div className="form-container auction">
            <div className="row">
              <div>
                <label htmlFor="baseprice">Base Price</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="basePrice"
                  id="baseprice"
                  required
                  placeholder="Base price"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="baseprice">Bid Price</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="bidPrice"
                  id="bidprice"
                  required
                  placeholder="Bid price"
                  value={formData.bidPrice}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div>
                <label htmlFor="previousteam">Previous Team</label>

                <select
                  name="previousTeam"
                  id="previousTeam"
                  className="dropdown"
                  value={formData.previousTeam}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="ROYAL CHALLENGERS">ROYAL CHALLENGERS</option>
                  <option value="KINGS XI">KINGS XI</option>
                  <option value="TITANS">TITANS</option>
                  <option value="KNIGHT RIDERS">KNIGHT RIDERS</option>
                  <option value="INDIANS">INDIANS</option>
                  <option value="ROYALS">ROYALS</option>
                  <option value="SUNRISERS">SUNRISERS</option>
                  <option value="CAPITALS">CAPITALS</option>
                  <option value="SUPER GIANTS">SUPER GIANTS</option>
                  <option value="SUPER KINGS">SUPER KINGS</option>
                </select>
              </div> */}
              <div>
                <label htmlFor="currentteam">Current Team</label>

                <select
                  name="currentTeam"
                  id="currentTeam"
                  className="dropdown"
                  value={formData.currentTeam}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="ROYAL CHALLENGERS">ROYAL CHALLENGERS</option>
                  <option value="KINGS XI">KINGS XI</option>
                  <option value="TITANS">TITANS</option>
                  <option value="KNIGHT RIDERS">KNIGHT RIDERS</option>
                  <option value="INDIANS">INDIANS</option>
                  <option value="ROYALS">ROYALS</option>
                  <option value="SUNRISERS">SUNRISERS</option>
                  <option value="CAPITALS">CAPITALS</option>
                  <option value="SUPER GIANTS">SUPER GIANTS</option>
                  <option value="SUPER KINGS">SUPER KINGS</option>
                </select>
              </div>
              <div>
                <label htmlFor="playertype">Player Type</label>

                <select
                  name="playerType"
                  id="playerType"
                  className="dropdown"
                  value={formData.playerType}
                  onChange={handleInputChange}
                >
                  <option value="batsman">Batsman</option>
                  <option value="bowler">Bowler</option>
                  <option value="allrounder">All Rounder</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        {/* statistics */}
        <fieldset>
          <legend>Statistics</legend>
          <div className="form-container auction">
            {/* <div className="row">
              <div>
                <label htmlFor="totalruns">Total Runs</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="totalRuns"
                  id="totalruns"
                  placeholder="Total Runs"
                  value={formData.totalRuns}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="innings">Innings</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="innings"
                  id="innings"
                  placeholder="Innings"
                  value={formData.innings}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="strikerate">Strike Rate</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="strikeRate"
                  id="strikerate"
                  placeholder="strikerate"
                  value={formData.strikeRate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="average">Average</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="average"
                  id="average"
                  placeholder="average"
                  value={formData.average}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="totalwickets">Total Wickets</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="totalWickets"
                  id="totalwickets"
                  placeholder="totalwickets"
                  value={formData.totalWickets}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
            <div className="row">
              {/* <div>
                <label htmlFor="eco">Ecomony</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="economyRate"
                  id="eco"
                  placeholder="Economy"
                  value={formData.economyRate}
                  onChange={handleInputChange}
                />
              </div> */}

              <div>
                <label htmlFor="battingHand">Batting Hand</label>

                <select
                  name="battingHand"
                  id="battingHand"
                  className="dropdown"
                  value={formData.battingHand}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="righthand">Right hand</option>
                  <option value="lefthand">Left hand</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label htmlFor="bowlingStyle">Bowling Style</label>

                <select
                  name="bowlingStyle"
                  id="bowlingStyle"
                  className="dropdown"
                  value={formData.bowlingStyle}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="Right-arm fast">Right-arm fast</option>
                  <option value="Right-arm medium">Right-arm medium</option>
                  <option value="Right-arm Leg Break">
                    Right-arm Leg Break
                  </option>
                  <option value="Slow left-arm orthodox">
                    Slow left-arm orthodox
                  </option>
                  <option value="Left-arm medium">Left-arm medium</option>
                  <option value="Left-arm fast">Left-arm fast</option>
                  <option value="Right-arm Off Break">
                    Right-arm Off Break
                  </option>
                </select>
              </div>

              {/* <div>
                <label htmlFor="fours">Fours</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="fours"
                  id="fours"
                  placeholder="Fours"
                  value={formData.fours}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="sixes">Sixes</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="sixes"
                  id="sixes"
                  placeholder="Sixes"
                  value={formData.sixes}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>

            {/* <div className="row">
              <div>
                <label htmlFor="HighestWicket">Highest Wicket</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="HighestWicket"
                  id="HighestWicket"
                  placeholder="Highest Wicket"
                  value={formData.HighestWicket}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="overs">Overs</label>

                <input
                  className="form-inputs"
                  type="number"
                  min={0}
                  name="overs"
                  id="overs"
                  placeholder="overs"
                  value={formData.overs}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
          </div>
        </fieldset>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default Update;
