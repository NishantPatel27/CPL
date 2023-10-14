import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import authService from "../../Services/auth.service";

const Searchbar = () => {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const personIcon = <FontAwesomeIcon icon={faUser} />;

  const [name, setname] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const getUser = authService.getCurrentUser();
    if (getUser) {
      setname(getUser.name);
      setrole(getUser.role);
      // console.log("current user is  : ", getUser);
    }
    if (authService.getCurrentTeam()) {
      setname(authService.getCurrentTeam().name);
    }
  }, []);

  return (
    <div className="search-bar">
      <div className="serch-input">
        <input className="search-input" type="text" placeholder="Search " />{" "}
        <span className="search-icon">{searchIcon}</span>
      </div>

      <div className="current-user-login">
        <div>
          <span className="person-icon">{personIcon}</span>
        </div>
        <div>
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};
export default Searchbar;
