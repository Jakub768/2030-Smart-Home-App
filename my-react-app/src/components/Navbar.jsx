import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sidebar">

      {/* Top Links */}
      <div className="sidebar-top">
        <ul className="sidebar-links">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/rooms">Rooms</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/devices">Devices</NavLink>
          </li>
          <li>
            <NavLink to="/stats">Stats</NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Links */}
      <div className="sidebar-bottom">
        <ul className="sidebar-links">
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
