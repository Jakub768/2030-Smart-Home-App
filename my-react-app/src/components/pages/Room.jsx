import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Room.css"; // Import the CSS file
import userIcon from "../images/User.png";

const Room = () => {
  const navigate = useNavigate();
  const { roomName } = useParams(); // Get the room name from the URL params
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setData(data || {}); // Fix: Use data directly
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Render loading spinner
  if (loading) {
    return (
      <main className="mainHome">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  // Render error message
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Get the devices for the current room
  const roomDevices = data[roomName] || [];

  return (
    <main className="mainRoom">
      <div className="headerRoom">
        <button className="navButtonRoom" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>{roomName}</h1>
        <button className="navButtonRoom" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      <div className="contentRoom">
        <div className="sectionRoom">
          {/* Render each device in the current room */}
          {roomDevices.map((device, index) => (
            <div key={index} className="blockRoom">
              <div>{device.device_name}</div>
              <div>{device.device_status}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;