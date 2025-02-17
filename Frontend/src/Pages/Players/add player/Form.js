import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
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
    battingHand: "",
    bowlingStyle: "",
    status: "available",
  });
  // const [image, setImage] = useState({ preview: "", data: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = new FormData();

    Object.keys(formData).forEach((key) => {
      // console.log(key, formData[key]);
      d.append(key, formData[key]);
    });
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/player/add", d, {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((result) => {
        // console.log(result);
        toast.success("Player added successfully.");
        // clear the form
        let clearForm = {
          image: "None",
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
    <div className="container add-player-form">
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
              {/* <div>
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
              </div> */}
              <div>
                <label htmlFor="course">Course</label>

                <select
                  name="course"
                  className="dropdown"
                  value={formData.course}
                  onChange={handleInputChange}
                >
                  <option value="software">Software</option>
                  <option value="Fintech">Fintech</option>
                  <option value="itims">ITIMS</option>
                  <option value="Arch & NS">
                    Architecture & Network Security
                  </option>
                  <option value="Data Mgnt">Data Management</option>
                  <option value="IMBA">IMBA</option>
                  <option value="Cloud & App">Cloud & Application</option>
                  <option value="animation">Animation</option>
                  <option value="Game Design">Game Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="digital design">Digital Desing</option>
                  <option value="services">Services</option>
                  <option value="interior spatial">Interior Spatial</option>
                  <option value="new media">New media</option>
                  <option value="product design">Product Design</option>
                  <option value="B design">B Design</option>
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
                <label htmlFor="currentteam">Current Team</label>

                <select
                  name="currentTeam"
                  className="dropdown"
                  value={formData.currentTeam}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="VEER YODHA">VEER YODHA</option>
                  <option value="AGNI PUTRA">AGNI PUTRA</option>
                  <option value="VAYU SHAKTI">VAYU SHAKTI</option>
                  <option value="TRISHUL TITANS">TRISHUL TITANS</option>
                  <option value="CHHATRAPATI SENA">CHHATRAPATI SENA</option>
                  <option value="KARNA VIJAY">KARNA VIJAY</option>
                  <option value="GARUDA FORCE">GARUDA FORCE</option>
                  <option value="DHARMA RAKSHAK">DHARMA RAKSHAK</option>
                  <option value="RUDRA AVATAR">RUDRA AVATAR</option>
                  <option value="ASHOKA WARRIORS">ASHOKA WARRIORS</option>
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

                <input
                  className="form-inputs"
                  type="text"
                  name="battingHand"
                  id="battingHand"
                  placeholder="Batting hand"
                  value={formData.battingHand}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="bowlingStyle">Bowling Style</label>

                <input
                  className="form-inputs"
                  type="text"
                  name="bowlingStyle"
                  id="bowlingStyle"
                  placeholder="Batting hand"
                  value={formData.bowlingStyle}
                  onChange={handleInputChange}
                />
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
            </div> */}
          </div>
        </fieldset>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Form;
