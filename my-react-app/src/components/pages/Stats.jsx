import React from "react";
import { useNavigate } from "react-router-dom";
import './Stats.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Stats = () => {
  const navigate = useNavigate();

  return (
      <main className="mainStats">
        <div className="statsHeader">
          <button className="navButtonStats" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>Stats</h1>
          <button className="navButtonStats" onClick={() => navigate("/profile")}>
            <img src={userIcon} alt="User Icon" />
          </button>
        </div>
        
      </main>
  );
};

export default Stats;
