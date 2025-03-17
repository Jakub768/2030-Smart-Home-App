import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Import useLocation
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Signin, Home, Services, Settings } from "./components/pages";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Rooms from "./components/pages/Rooms";
import Stats from "./components/pages/Stats";
import Devices from "./components/pages/Devices";
import Users from "./components/pages/Users";
import Faqs from "./components/pages/Faqs";
import AddDevice from "./components/pages/AddDevice";
import Room from "./components/pages/Room";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

function App() {
  const location = useLocation(); // Get current location

  // Hide Navbar on Login and Signup page
  const showNavbar = !['/', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {/* Conditionally render Navbar based on current route */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* Pass roomsData as prop to Rooms component */}
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/add_device" element={<AddDevice />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Pass roomsData to the Room component */}
        <Route path="/room/:roomName" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
