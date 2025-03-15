import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Rooms.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Rooms = () => {
  const navigate = useNavigate();

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    // Fetch the data from the Flask API
    fetch('http://127.0.0.1:5000/rooms')
      .then((response) => response.json())  // Parse the JSON response
      .then((data) => {
        setData(data);  // Set data to state
        setLoading(false);  // Set loading to false after data is fetched
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

  // Group the devices by room
  const groupedRooms = data.rooms.reduce((acc, roomData) => {
    const roomName = roomData[0];
    const device = {
      name: roomData[1],
      type: roomData[2],
      energyUsage: roomData[3],
    };

    // If the room already exists in the accumulator, add the device to that room's array
    if (!acc[roomName]) {
      acc[roomName] = [];
    }
    acc[roomName].push(device);

    return acc;
  }, {});

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
        {/* Map through the grouped rooms */}
        {Object.keys(groupedRooms).map((roomName) => {
          const devices = groupedRooms[roomName];

          return (
            <div>
              <h2>{roomName}</h2>
              <div className="sectionRooms">
                {/* Map through devices in each room and display device name and energy usage */}
                {devices.map((device, deviceIndex) => (
                  <div className={`blockRooms ${deviceIndex === 0 ? 'firstBlockRooms' : ''}`}>
                    <div>{device.name}</div>
                    <div>{device.energyUsage} kWh</div>
                  </div>
                ))}
                <button className="actionButtonRooms" onClick={() => navigate(`/room/${roomName}`)}>
                  More...
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Rooms;
