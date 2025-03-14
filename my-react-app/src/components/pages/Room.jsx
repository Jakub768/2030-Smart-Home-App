import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Room.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Room = ({ rooms }) => {
  const { roomName } = useParams(); // Get the room name from URL params
  const navigate = useNavigate();

  // Find the room from the rooms array using the roomName
  const room = rooms.find(r => r.name === roomName);

  if (!room) {
    return <p>Room not found</p>; // Handle case when room is not found
  }

  return (
    <main className="mainRoom">
      <div className="headerRoom">
        <button className="navButtonRoom" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>{room.name}</h1>
        <button className="navButtonRoom" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      <div className="contentRoom">
        <div className="sectionRoom">
          {room.devices.map((device, index) => (
            <div key={index} className="blockRoom">
              {device.title}<br></br>{device.kWh}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
