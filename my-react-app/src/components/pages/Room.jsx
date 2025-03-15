import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Room.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Room = () => {
  const navigate = useNavigate();
  const { roomName } = useParams(); // Get the room name from the URL params
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/rooms')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  // Render the component
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Group the devices by room (same as in the Rooms component)
  const groupedRooms = data.rooms.reduce((acc, roomData) => {
    const room = roomData[0];
    const device = {
      name: roomData[1],
      type: roomData[2],
      energyUsage: roomData[3],
    };

    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(device);

    return acc;
  }, {});

  // Get the devices for the current room (using roomName from URL)
  const roomDevices = groupedRooms[roomName] || [];

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
          {/* Render a block for each device in the current room */}
          {roomDevices.map((device, index) => (
            <div className="blockRoom">
              <div>{device.name}</div>
              <div>{device.energyUsage} kWh</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
