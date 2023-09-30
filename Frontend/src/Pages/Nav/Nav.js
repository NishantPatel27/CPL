import "./Nav.css";
import logo from "../Assets/Images/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Nav = () => {
  const dashIcon = <FontAwesomeIcon icon={faTableColumns} />;
  const peopeIcon = <FontAwesomeIcon icon={faPeopleGroup} />;
  const teamIcon = <FontAwesomeIcon icon={faUser} />;
  const auctionIcon = <FontAwesomeIcon icon={faMoneyBills} />;
  const signupIcon = <FontAwesomeIcon icon={faUserPlus}/>

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">
              {" "}
              <span className="nav-icons">{dashIcon}</span> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/players">
              <span className="nav-icons">{teamIcon}</span> Players
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <span className="nav-icons">{peopeIcon}</span> Teams
            </Link>
          </li>
          <li>
            <Link to="/auctioncontrol">
              <span className="nav-icons">{auctionIcon}</span> Auction
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <span className="nav-icons">{signupIcon}</span>
              Register User</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
