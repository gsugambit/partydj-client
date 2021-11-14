import "./NavBar.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Party DJ</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/messages">Messages</Link>
      </div>
    </div>
  );
};

export default NavBar;
