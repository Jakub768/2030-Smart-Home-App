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
        {/* Use the fetched data */}
        {data && data.rooms.map((roomData, roomIndex) => {
          const roomName = roomData[0];  // The first element is the room name
          const devices = roomData.slice(1);  // The rest are the device details (name, type, kWh)

          return (
            <div key={roomIndex}>
              <h2>{roomName}</h2>
              <div className="sectionRooms">
                {/* Map through devices */}
                {devices.map((device, deviceIndex) => (
                  <div className={`blockRooms ${deviceIndex === 0 ? 'firstBlockRooms' : ''}`} key={deviceIndex}>
                    {device} {/* Here you may need to adjust based on how you want to display the data */}
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
