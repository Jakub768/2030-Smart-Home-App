import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Room.css'; // Import the CSS file
import userIcon from '../images/User.png';

export const Room = () => {
const navigate = useNavigate();

return (
    <main className="mainRoom">
        {/* Top section containing Back button, Title, and Right-side div */}
        <div className="headerRoom">
            <button className="navButtonRoom" onClick={() => navigate(-1)}>{"<"}</button>
            <h1>Kitchen</h1>
            <button className="navButtonRoom" onClick={() => navigate("/profile")}>
                <img src={userIcon} alt="User Icon" />
            </button>
        </div>
    </main>
    );
};

export default Room;