import { NavLink } from "react-router-dom";
import FontSizeControls from "./FontSizeControls";
import "../styles/Navbar.css"; // we'll create this file

export default function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-title">GitHub Team Visualizer</h1>
      <FontSizeControls />
      <nav className="navbar-nav">
        <NavLink to="/" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/team" className="nav-link">
          Team Productivity
        </NavLink>
        <NavLink to="/reviews" className="nav-link">
          Reviews
        </NavLink>
        <NavLink to="/releases" className="nav-link">
          Releases
        </NavLink>
      </nav>
    </header>
  );
}
