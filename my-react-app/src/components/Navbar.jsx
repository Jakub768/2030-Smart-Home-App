import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from './images/VBLogo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Close sidebar when clicking on a link (mobile only)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Top Links */}
        <div className="branding">
          <h1>Virtual Butler</h1>
        </div>
        <div className="sidebar-top">
          <ul className="sidebar-links">
            <li>
              <NavLink to="/home" onClick={handleLinkClick}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/rooms" onClick={handleLinkClick}>Rooms</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={handleLinkClick}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/devices" onClick={handleLinkClick}>Devices</NavLink>
            </li>
            <li>
              <NavLink to="/stats" onClick={handleLinkClick}>Stats</NavLink>
            </li>
          </ul>
        </div>

        {/* Bottom Links */}
        <div className="sidebar-bottom">
          <ul className="sidebar-links">
            <li>
              <NavLink to="/users" onClick={handleLinkClick}>Users</NavLink>
            </li>
            <li>
              <NavLink to="/settings" onClick={handleLinkClick}>Settings</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};