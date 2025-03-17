import React from "react";
import { useNavigate } from "react-router-dom";
import './About.css'; // Import the CSS file

export const About = () => {
    const navigate = useNavigate();
  
  return (
    <main className="mainAbout">
      <div className="aboutHeader">
        <button className="navButtonAbout" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>About</h1>
        <button className="navButtonAbout" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      <h1>this is a service to track energy usage in a house</h1>
    </main>
  );
};

export default About;

