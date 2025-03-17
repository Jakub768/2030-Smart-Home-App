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
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [wifiOn, setWifiOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);
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
            <button className="no-gap1" onClick={() => navigate("/profile")} >My Profile<span className="arrow">&gt;</span></button>
            <button className="no-gap1" onClick={() => navigate("/faqs")}>FAQ<span className="arrow">&gt;</span></button>
            <h2>Permissions</h2>
              <button className="no-gap1">Wi-Fi<ToggleButton isOn={wifiOn} toggleSwitch={() => setWifiOn(!wifiOn)} /></button>
              <button className="no-gap1">Bluetooth<ToggleButton isOn={bluetoothOn} toggleSwitch={() => setBluetoothOn(!bluetoothOn)} /></button>
              <button className="no-gap1">Location<ToggleButton isOn={locationOn} toggleSwitch={() => setLocationOn(!locationOn)} /></button>
              <button className="no-gap1">Camera<ToggleButton isOn={cameraOn} toggleSwitch={() => setCameraOn(!cameraOn)} /></button>
              <button className="no-gap1">Microphone<ToggleButton isOn={microphoneOn} toggleSwitch={() => setMicrophoneOn(!microphoneOn)} /></button>
              <button className="no-gap1">Notifications<ToggleButton isOn={notificationsOn} toggleSwitch={() => setNotificationsOn(!notificationsOn)} /></button>


          </div>

          <div className="settings-right">
            <button className="no-gap1" onClick={() => navigate("/about")}>About<span className="arrow">&gt;</span></button>
            <button className="no-gap1" onClick={() => navigate("/update")}>Software Update<span className="arrow">&gt;</span></button>

            <h2>Accessibility</h2>
            <button className="no-gap1">Background<span className="arrow">&gt;</span></button>
            <button className="no-gap1  ">Theme<span className="arrow">&gt;</span></button>
          </div>
        </div>

        <div className="settings-bottom">
          <button className="left-button" onClick={handleLogout}>Log Out</button>
          <button className="right-button" onClick={goToLogOut}>Change User</button>
        </div>
      </main>
  );
};