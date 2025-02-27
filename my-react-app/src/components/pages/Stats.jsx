import React from "react";
import { useNavigate } from "react-router-dom";
import './Stats.css'; // Import the CSS file

const Stats = () => {
  const navigate = useNavigate();

  return (
      <main className="mainStats">
        <div className="statsHeader">
          <button className="navButtonStats" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>Stats</h1>
          <button className="navButtonStats" onClick={() => navigate("/profile")}>👤</button>
        </div>
        
      </main>
  );
};

export default Stats;
