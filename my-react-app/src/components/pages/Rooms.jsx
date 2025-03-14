import React from "react";
import { useNavigate } from "react-router-dom";
import './Rooms.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Rooms = ({ rooms }) => {
  const navigate = useNavigate();

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
        {rooms.map((room, roomIndex) => (
          <div key={roomIndex}>
            <h2>{room.name}</h2>
            <div className="sectionRooms">
              {/* Map through devices and generate blocks */}
              {room.devices.slice(0, 3).map((device, deviceIndex) => (
                <div className={`blockRooms ${deviceIndex === 0 ? 'firstBlockRooms' : ''}`} key={deviceIndex}>
                  {device.title}<br></br>{device.kWh}
                </div>
              ))}
              <button className="actionButtonRooms" onClick={() => navigate(`/room/${room.name}`)}>
                More...
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Rooms;
