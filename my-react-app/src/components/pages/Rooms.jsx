import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
import userIcon from "../images/User.png";

const Rooms = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/rooms");
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        setData(jsonData.rooms); // Directly set rooms object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Show loading spinner
  if (loading) {
    return (
      <main className="mainHome">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  // Show error message
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Ensure data exists before rendering
  if (!data || Object.keys(data).length === 0) {
    return <div className="error">No data available.</div>;
  }

  return (
    <main className="mainRooms">
      <div className="roomsHeader">
        <button className="navButtonRooms" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>Rooms</h1>
        <button className="navButtonRooms" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>

      <div className="contentRooms">
        {Object.entries(data).map(([roomName, devices]) => {
          const displayedDevices = devices.slice(0, 3); // Show only the first 3 devices
          const hasMoreDevices = devices.length > 3; // Check if more than 3 devices exist

          return (
            <div key={roomName}>
              <h2>{roomName}</h2>
              <div className="sectionRooms">
                {displayedDevices.map((device, index) => (
                  <div 
                    key={`${roomName}-${index}`} 
                    className={`blockRooms ${index === 0 ? "firstBlockRooms" : ""}`}
                  >
                    <div>{device.device_name} ({device.device_status})</div>
                  </div>
                ))}

                {/* Show "More..." button only if there are more than 3 devices */}
                {hasMoreDevices && (
                  <button className="actionButtonRooms" onClick={() => navigate(`/room/${roomName}`)}>
                    More...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Rooms;
