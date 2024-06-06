import Nav from "../Pages/Nav/Nav";
import Searchbar from "../Pages/Seachbar/Searchbar";


function Container({ Children,isUserLoggedIn ,isTeamLoggedIn }) {
  const isLoggedIn = isUserLoggedIn || isTeamLoggedIn;
  return (
    <div className="">
      {isLoggedIn && (
        <div className="main-content">
          <Nav />
          <div className="main-wrapper">
            <Searchbar />
            {Children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Container;
