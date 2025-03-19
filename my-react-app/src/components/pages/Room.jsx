import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Room.css"; // Import CSS
import userIcon from "../images/User.png";

const API_BASE_URL = "http://127.0.0.1:5000"; // Change if needed

const Room = () => {
  const navigate = useNavigate();
  const { roomName } = useParams(); // Get room name from URL params
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the devices for the selected room
  useEffect(() => {
    const fetchRoomDevices = async () => {
      try {
        const username = sessionStorage.getItem("username"); // Retrieve username
        if (!username) {
          throw new Error("No username found in sessionStorage.");
        }

        const response = await fetch(`${API_BASE_URL}/rooms?username=${username}&room_name=${roomName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch room devices");
        }
        const jsonData = await response.json();
        setDevices(jsonData[roomName] || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDevices();
  }, [roomName]);

  if (loading) {
    return (
      <main className="mainRoom">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
          {devices.length > 0 ? (
            devices.map((device, index) => (
              <div key={index} className="blockRoom">
                <div>{device.device_name}</div>
                <div>{device.device_status}</div>
              </div>
            ))
          ) : (
            <p>No devices found in this room.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Room;
