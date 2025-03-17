import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import userIcon from '../images/User.png';

const ToggleButton = ({ isOn, toggleSwitch }) => (
  <div className={`toggle-switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
    <div className="toggle-thumb"></div>
  </div>
);

export const Settings = () => {
  const [locationOn, setLocationOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [phOn, setPhOn] = useState(false);
  const navigate = useNavigate();

  const goToLogOut = () => navigate("/signin");
  const goToMyProfile = () => navigate("/myProfile");

  const handleLogout = () => {
    // Send a POST request to your Flask logout route
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',  // POST method for logout
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Logout successful') {
          // Clear session and local storage
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          localStorage.clear();  // Clear all local storage
          sessionStorage.clear(); // Clear all session storage
  
          // Redirect to the login or home page
          navigate("/");
        } else {
          alert('Failed to log out');
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        alert('Failed to log out');
      });
  };

  return (
    
      <main className="mainSettings">
        <div className="settingsHeader">
          <button className="navButtonSettings" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>Settings</h1>
          <button className="navButtonSettings" onClick={() => navigate("/profile")}>
            <img src={userIcon} alt="User Icon" />
          </button>
        </div>

        <div className="settings-columns">
          <div className="settings-left">
            <button className="no-gap1">My Profile<span className="arrow">&gt;</span></button>
            <button className="no-gap">Wi-Fi<span className="arrow">&gt;</span></button>
            <button className="no-gap2">Bluetooth<span className="arrow">&gt;</span></button>

            <h2>Permissions</h2>
            <div className="toggle-container">
              <button className="no-gap1">Location<ToggleButton isOn={locationOn} toggleSwitch={() => setLocationOn(!locationOn)} /></button>
            </div>
            <div className="toggle-container">
              <button className="no-gap">Camera<ToggleButton isOn={cameraOn} toggleSwitch={() => setCameraOn(!cameraOn)} /></button>
            </div>
            <div className="toggle-container">
              <button className="no-gap">Microphone<ToggleButton isOn={microphoneOn} toggleSwitch={() => setMicrophoneOn(!microphoneOn)} /></button>
            </div>
            <div className="toggle-container">
              <button className="no-gap2">PH<ToggleButton isOn={phOn} toggleSwitch={() => setPhOn(!phOn)} /></button>
            </div>

            <div className="individual-button help-button">
              <button>Help<span className="arrow">&gt;</span></button>
            </div>
            <div className="individual-button sign-out-button">
              <button  onClick={handleLogout}>Sign out</button>
            </div>
          </div>

          <div className="settings-right">
            <button className="no-gap1"  onClick={() => navigate("/about")}>About<span className="arrow">&gt;</span></button>
            <button className="no-gap2">Software Update<span className="arrow">&gt;</span></button>

            <h2>Display</h2>
            <button className="no-gap1">Background<span className="arrow">&gt;</span></button>
            <button className="no-gap2">Theme<span className="arrow">&gt;</span></button>

            <h2>Other</h2>
            <button className="no-gap1">Notifications<span className="arrow">&gt;</span></button>
            <button className="no-gap">Sounds<span className="arrow">&gt;</span></button>
            <button className="no-gap2">Accessibility<span className="arrow">&gt;</span></button>

            <div className="individual-button change-user-button">
              <button onClick={goToLogOut}>Change user</button>
            </div>
          </div>
        </div>
      </main>
  );
};