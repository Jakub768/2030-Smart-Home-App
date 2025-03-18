import React from "react";
import { useNavigate } from "react-router-dom";
import './About.css'; // Import the CSS file
import userIcon from '../images/User.png';

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
      <div className="aboutText">
      <br></br>
      <h1>Welcome to Virtual Butler, the ultimate smart home companion designed to simplify your life and maximize efficiency.
        
          </h1>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Our app seamlessly connects with your smart devices, giving you real-time insights into energy usage,
         costs, and even local weather conditions—all from one intuitive dashboard. Whether you're looking to
          optimize energy consumption, reduce your bills, or create a more sustainable home, Virtual Butler empowers
           you with the tools to take control. With user-friendly features, secure cloud integration, and smart
          automation, managing your home has never been easier.
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
        <div className="bottomAboutText">
        <h1>Join us in creating a smarter, more connected future!</h1>
        </div>
    </main>
  );
};

export default About;

