import "./TeamsDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import authService from "../../Services/auth.service";

const DashboardTeam = ({ socket }) => {
 
  const [team, setTeam] = useState();
  const [players, setPlayers] = useState();
  const [progress, setProgress] = useState(0);
  const [teamprogress, setteamProgress] = useState(0);
  let [counter, setcounter] = useState(4);
  
  const playersRef = useRef([]);



  const fetchTeamDetails = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL+"/team/" + authService.getCurrentTeam().name,
        { withCredentials: true }
      );
      if (res.status === 200) {
        // toast.success("Team details fetched successfully..");
        setTeam(res.data.data);

        const players = await axios.get(
          process.env.REACT_APP_BACKEND_URL+"/team/player/all",
          {
            withCredentials: true,
          }
        );
        console.log(players);
        if (players.status === 200) {
          
          playersRef.current = [...players.data.status];
          setPlayers([...players.data.status]);
        }
      }
      console.log(res);
    } catch (e) {
      toast.error("Some error happended while fetching");
      console.log(e);
    }
  };

  useEffect(() => {
    socket.on("get_sold_data", (data) => {
      console.log(players);

      if (data.data.team.name === authService.getCurrentTeam().name) {
        setPlayers([...playersRef.current, data.data.player]);
        setTeam(data.data.team);
      }

      // fetchTeamDetails();
    });
  }, []);

  useEffect(() => {
    if (players?.length > 0) {
      setProgress((players?.length /  12 ) * 100);
    }
  }, [players]);

  useEffect(() => {
    if (team?.bidPointBalance > 0) {
      let balance =  (team?.bidPointBalance * 100) / 50000
      setteamProgress(balance);
    }
  }, [team]);



  useEffect(() => {
    fetchTeamDetails();
  }, []);

  return (
    <div className="TM-wrapper">
      <div className="TM-header">
        
          <h1>Welcome back, {team?.name}</h1>
          <img
          id="TM-teamlogo"
          src={"/assets/images/All_team_logo/"+team?.logo}
          alt="current player logo"
        />
          
          
      </div>

      <div className="TM-inner_wrapper">

        {/* PROGRESS BAR */}

        <div className="TM-progress-wrapper">
          <div className="TM-pgbr1">
            <h3>{players?.length} / 12 players</h3>
           
              <div id="players-progress-wrapper">
                <div id="players-progress-bar" style={{ width: `${progress}%`}}>
                </div>
              </div>
          
          </div>
          <div className="TM-pgbr2">
            <h3>{team?.bidPointBalance.toLocaleString()} Points left</h3>
           
              <div id="bid-progress-wrapper">
                <div id="bid-progress-bar" style={{ width: `${teamprogress}%`}}>
                </div>
              </div>
          
          </div>
         
          <div className="TM-pgbr3">
            <h3>Mentor : {team?.mentor}</h3>
            <h3>Captian : {team?.captain}</h3>
            <h3>Vice Captian : {team?.viceCaptain}</h3>
           
              
          </div>
         
        </div>

        {/* PLAYER TABLE */}

        <div>
          {Boolean(players) && (
          <div>
            <div className="dashboard-players-table table">
              <div className="table-head">
                <p className="table-head">Players</p>
                <div className="submit-btn">
                    <Link to="/players">
                      <button>
                        View All
                      </button>
                    </Link>
                  </div>
              </div>
              <table>
                <thead>
                  <tr className="TM-table-tr" >
                  
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Semester</th>
                      <th>Type</th>
                      <th>Bid price</th>
                  
                  </tr>
                </thead>
                {/* <tr>
                  <td>1</td>
                  <td>{team?.mentor}</td>
                  <td><b>Mentor</b></td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{team?.captain}</td>
                  <td><b>Captain</b></td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{team?.viceCaptain}</td>
                  <td><b>Vice Captain</b></td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr> */}
               
                {players.map((e,index) => (
                  <tr className="TM-table-tr" key={e._id}>
                    
                    <td>
                     {index + 1}
                    </td>
                   
                    <td> 
                      {/* <img
                       alt="playerimg"
                        // width={40}
                        height={40}
                        style={{ borderRadius: "50%" }}
                        src={"/assets/images/players/" + e?.image}
                      /> */}
                      {e.name}</td>
                    <td>Player</td>
                    <td>{e.currentSemester }</td>
                    <td>{e.playerType }</td>
                    <td>₹ {e.bidPrice}</td>
                   
                  </tr>
                ))}
              </table>
            </div>
          </div>
        )} 
        </div>
        
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default DashboardTeam;
