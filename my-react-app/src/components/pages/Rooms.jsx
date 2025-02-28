import React from "react";
import { useNavigate } from "react-router-dom";
import './Rooms.css'; // Import the CSS file

const Rooms = () => {
  const navigate = useNavigate();

  return (
      <main className="mainRooms">
        <div className="roomsHeader">
          <button className="navButtonRooms" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>Rooms</h1>
          <button className="navButtonRooms" onClick={() => navigate("/profile")}>👤</button>
        </div>
        <div style={{ height: '68vh', overflowY: 'scroll' }}>
            <h2>Kitchen</h2>
            <div className="sectionRooms">
                <div className="blockRooms firstBlockRooms">Block 1</div>
                <div className="blockRooms">Block 2</div>
                <div className="blockRooms">Block 3</div>
                <div className="blockRooms lastBlockRooms">Block 4</div>
            </div>
            <h2 className="headingsRooms">Living Room</h2>
            <div className="sectionRooms">
                <div className="blockRooms firstBlockRooms">Block 1</div>
                <div className="blockRooms">Block 2</div>
                <div className="blockRooms">Block 3</div>
                <div className="blockRooms lastBlockRooms">Block 4</div>
            </div>
            <h2 className="headingsRooms">Bathroom</h2>
            <div className="sectionRooms">
                <div className="blockRooms firstBlockRooms">Block 1</div>
                <div className="blockRooms">Block 2</div>
                <div className="blockRooms">Block 3</div>
                <div className="blockRooms lastBlockRooms">Block 4</div>
            </div>
            <h2 className="headingsRooms">Bedroom 1</h2>
            <div className="sectionRooms">
                <div className="blockRooms firstBlockRooms">Block 1</div>
                <div className="blockRooms">Block 2</div>
                <div className="blockRooms">Block 3</div>
                <div className="blockRooms lastBlockRooms">Block 4</div>
            </div>
            <h2 className="headingsRooms">Living Room</h2>
            <div className="sectionRooms">
                <div className="blockRooms firstBlockRooms">Block 1</div>
                <div className="blockRooms">Block 2</div>
                <div className="blockRooms">Block 3</div>
                <div className="blockRooms lastBlockRooms">Block 4</div>
            </div>
        </div>
      </main>
  );
};

export default Rooms;
