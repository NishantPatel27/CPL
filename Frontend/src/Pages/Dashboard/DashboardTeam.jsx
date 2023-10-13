import "./TeamsDashboard.css";
import axios from "axios";

import { useEffect, useState } from "react";
import authService from "../../Services/auth.service";
import { ToastContainer, toast } from "react-toastify";

const DashboardTeam = () => {
 
  const [team, setTeam] = useState();
  const [players, setPlayers] = useState();
  const [progress, setProgress] = useState(0);
  
  const [PointsLeft, setPointsLeft] = useState(0);
  const [totalPlayer, settotalPlayer] = useState(0);


  const fetchTeamDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6001/team/" + authService.getCurrentTeam().name,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team details fetched successfully..");
        setTeam(res.data.data);
        const players = await axios.get(
          "http://localhost:6001/team/player/all",
          {
            withCredentials: true,
          }
        );
        console.log(players);
        if (players.status === 200) {
          // toast.success("Player details fetched successfully..");
          setPlayers(players.data.status);
          settotalPlayer(players.data.status.length);
          
          let points = players.data.status.reduce((arr,curr) => {
            
            arr += curr.bidPrice;
            return arr
          },0);
          setPointsLeft(points);


        }
      }
      console.log(res);
    } catch (e) {
      toast.error("Some error happended while fetching");
      console.log(e);
    }
  };

  useEffect(() => {
    if (totalPlayer > 0) {
      setProgress((totalPlayer / 13) * 100);
    }
  }, [players]);
  useEffect(() => {
    fetchTeamDetails();
  }, []);

  return (
    <div className="TM-wrapper">
      <div className="TM-header">
        <div>
          <h1>Welcome back, {team?.name}</h1>
        </div>
      </div>

      <div className="TM-inner_wrapper">

        {/* PROGRESS BAR */}

        <div className="TM-progress-wrapper">
          <div className="TM-pgbr1">
            <h3>{totalPlayer}/13 players</h3>
           
              <div id="players-progress-wrapper">
                <div id="players-progress-bar" style={{ width: `${progress}%`}}>
                </div>
              </div>
          
          </div>
          <div className="TM-pgbr2">
            <h3>{50000 - PointsLeft} Points left</h3>
           
              <div id="bid-progress-wrapper">
                <div id="bid-progress-bar" style={{ width: `${progress}%`}}>
                </div>
              </div>
          
          </div>
         
        </div>

        {/* PLAYER TABLE */}

        <div>
          <h2>PLAYER TABLE</h2>
          {Boolean(players) && (
          <div>
            <div className="dashboard-players-table table">
              <div className="table-head">
                <p className="table-head">Players</p>
              </div>
              <table>
                <thead>
                  <tr>
                  
                      <th>#</th>
                      <th>Name</th>
                      <th>Batting hand</th>
                      <th>Avg</th>
                      <th>bid price</th>
                  
                  </tr>
                </thead>
                {players.map((e) => (
                  <tr key={e._id}>
                    
                    <td>
                      <img
                       alt="playerimg"
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%" }}
                        src={"/assets/images/players/" + e?.image}
                      />
                    </td>
                    <td>{e.name}</td>
                    <td>{e.battingHand}</td>
                    <td>{e.average}</td>
                    <td>₹ {e.bidPrice}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        )} 
        </div>
        
      </div>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
    </div>
  );
};
export default DashboardTeam;
