import "./NavBar.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Party DJ</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/stations">Stations</Link>
        <Link to="/create">Create-A-Station</Link>
      </div>
    </div>
  );
};

export default NavBar;
