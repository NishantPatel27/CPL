import Dashboard from "./Pages/Dashboard/Dashboard";
import Players from "./Pages/Players/Players";
import Teams from "./Pages/Teams/Teams";
import Nav from "./Pages/Nav/Nav";
import AuctionScreen from "./Pages/Auction/AuctionControl/Auction";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Searchbar from "./Pages/Seachbar/Searchbar";
import Form from "./Pages/Players/add player/Form";
import { useState } from "react";
import Loginform from "./Pages/Login/Loginform";

function App() {
  const [loginFlag, setloginFlag] = useState(false);

  if (loginFlag) {
    return <Loginform />;
  }

  return (
    <div className="">
      <div className="main-content">
        <Router>
          <Nav />

          <div className="main-wrapper">
            <Searchbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/players" element={<Players />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/auctioncontrol" element={<AuctionScreen />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
