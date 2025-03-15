import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the rooms data from your API or JSON file
    fetch('http://127.0.0.1:5000/rooms') // Example URL for the API
      .then((response) => response.json())
      .then((data) => {
        setRoomsData(data.rooms); // Assume the response has a "rooms" key
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch room data');
        setLoading(false);
      });
  }, []);

  // Handle loading and errors
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Signin />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* Pass roomsData as prop to Rooms component */}
        <Route path="/rooms" element={<Rooms rooms={roomsData} />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/add_device" element={<AddDevice />} />
        {/* Pass roomsData to the Room component */}
        <Route path="/room/:roomName" element={<Room rooms={roomsData} />} />
      </Routes>
    </div>
  );
}

export default App;
