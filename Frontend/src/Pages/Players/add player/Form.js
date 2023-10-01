import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const fileuploadicon = <FontAwesomeIcon icon={faArrowUpFromBracket} />;

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    currentSemester: "sem1",
    dateOfBirth: null,
    branch: "software",
    image: null,
    basePrice: "",
    bidPrice: "",
    previousTeam: "None",
    currentTeam: "None",
    playerType: "batsman",
    totalRuns: "0",
    innings: "0",
    strikeRate: "0",
    average: "0",
    totalWickets: "0",
    economyRate: "0",
    battingHand: "None",
    fours: "0",
    sixes: "0",
    bowlingStyle: "None",
    HighestWicket: "0",
    overs: "0",
  });

  const handleInputChange = (e) => {
    // const {name , value , type , files} = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: type === "file" ? files[0] : value,

    // })
    const { name, value } = e.target;
    // console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataJson = JSON.stringify(formData);

    axios
      .post("http://localhost:6001/player/add", formDataJson, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        toast.success("Player added successfully.");
        // clear the form
        let clearForm = {
          name: "",
          phoneNumber: "",
          currentSemester: "sem1",
          dateOfBirth: null,
          branch: "software",
          image: null,
          basePrice: "",
          bidPrice: "",
          previousTeam: "None",
          currentTeam: "None",
          playerType: "batsman",
          totalRuns: "0",
          innings: "0",
          strikeRate: "0",
          average: "0",
          totalWickets: "0",
          economyRate: "0",
          battingHand: "None",
          fours: "0",
          sixes: "0",
          bowlingStyle: "None",
          HighestWicket: "0",
          overs: "0",
        };
        setFormData(clearForm);
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div>
            <h2>Add Player</h2>
          </div>
          <div className="submit-btn">
            <button className="submit" type="submit">
              Add
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
                  value={formData.name}
                  required
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
                  className="dropdown"
                  value={formData.currentSemester}
                  onChange={handleInputChange}
                >
                  <option value="sem1">Semester 1</option>
                  <option value="sem3">Semester 3</option>
                  <option value="sem5">Semester 5</option>
                  <option value="sem5">Semester 7</option>
                  <option value="sem5">Semester 9</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="DOB">Date of Birth</label>
                <input
                  className="form-inputs"
                  type="date"
                  name="dateOfBirth"
                  id="DOB"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="branch">Branch</label>

                <select
                  name="branch"
                  className="dropdown"
                  value={formData.branch}
                  onChange={handleInputChange}
                >
                  <option value="software">Software</option>
                  <option value="itims">ITIMS</option>
                  <option value="animation">Animation</option>
                  <option value="digital design">Digital Desing</option>
                </select>
              </div>
              <div>
                <label>Players Photo</label>
                <label className="fileupload-lable" htmlFor="playerphoto">
                  <span className="upload-icon">{fileuploadicon}</span>
                  Uplaod image
                </label>
                <input
                  className="form-inputs"
                  name="image"
                  type="file"
                  id="playerphoto"
                  required
                  value={formData.image}
                  onChange={handleInputChange}
                />
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
              <div>
                <label htmlFor="previousteam">Previous Team</label>

                <select
                  name="previousTeam"
                  className="dropdown"
                  value={formData.previousTeam}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="Knights">Knights</option>
                  <option value="Hurricanes">Hurricanes</option>
                  <option value="Royals">Royals</option>
                  <option value="Blasters">Blasters</option>
                  <option value="Panther">Panther</option>
                  <option value="Empire">Empire</option>
                  <option value="Wolves">Wolves</option>
                  <option value="Super Kings">Super Kings</option>
                  <option value="Striker">Striker</option>
                  <option value="Titans">Titans</option>
                  <option value="Falcons">Falcons</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentteam">Current Team</label>

                <select
                  name="currentTeam"
                  className="dropdown"
                  value={formData.currentTeam}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="Knights">Knights</option>
                  <option value="Hurricanes">Hurricanes</option>
                  <option value="Royals">Royals</option>
                  <option value="Blasters">Blasters</option>
                  <option value="Panther">Panther</option>
                  <option value="Empire">Empire</option>
                  <option value="Wolves">Wolves</option>
                  <option value="Super Kings">Super Kings</option>
                  <option value="Striker">Striker</option>
                  <option value="Titans">Titans</option>
                  <option value="Falcons">Falcons</option>
                </select>
              </div>

              <div>
                <label htmlFor="playertype">Player Type</label>

                <select
                  name="playerType"
                  className="dropdown"
                  value={formData.playerType}
                  onChange={handleInputChange}
                >
                  <option value="batsman">Batsman</option>
                  <option value="bolwer">Bowler</option>
                  <option value="allrounder">All Rounder</option>
                  <option value="wicketKeeper">Wicket keeper</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        {/* statistics */}
        <fieldset>
          <legend>Statistics</legend>
          <div className="form-container auction">
            <div className="row">
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
            </div>
            <div className="row">
              <div>
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
              </div>

              <div>
                <label htmlFor="previousteam">Batting Hand</label>

                <select
                  name="battingHand"
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
                <label htmlFor="previousteam">Bowling Style</label>

                <select
                  name="bowlingStyle"
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

              <div>
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
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="eco">Highest Wicket</label>

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
                <label htmlFor="eco">Overs</label>

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
            </div>
          </div>
        </fieldset>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Form;
