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
  // Separate states for each toggle
  const [locationOn, setLocationOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [phOn, setPhOn] = useState(false);

  const navigate = useNavigate(); // Hook to navigate to another page

  // Function to handle the button click and navigate
  const goToLogOut = () => {
    navigate("/signin"); // Navigates to the '/another' route
  };

  const goToMyProfile = () => {
    navigate("/myProfile"); // Navigates to the '/another' route
  };

  return (
    <div className="container">
      <main className="settings-main">
        {/* Top Buttons */}
        <button className="top-left-button">&lt;</button>
        <button className="top-right-button" onClick={goToMyProfile}>
          <img src={userIcon} alt="User Icon" />
        </button>

        <h1 className="settings-title">Settings</h1>

        <div className="settings-columns">
          {/* Left Side */}
          <div className="settings-left">
            <button className="no-gap1">
              My Profile<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap">
              Wi-Fi<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap2">
              Bluetooth<span className="arrow">&gt;</span>
            </button>

            <h2>Permissions</h2>
            <div className="toggle-container">
              <button className="no-gap1">
                Location
                <ToggleButton
                  isOn={locationOn}
                  toggleSwitch={() => setLocationOn(!locationOn)}
                />
              </button>
            </div>
            <div className="toggle-container">
              <button className="no-gap">
                Camera
                <ToggleButton
                  isOn={cameraOn}
                  toggleSwitch={() => setCameraOn(!cameraOn)}
                />
              </button>
            </div>
            <div className="toggle-container">
              <button className="no-gap">
                Microphone
                <ToggleButton
                  isOn={microphoneOn}
                  toggleSwitch={() => setMicrophoneOn(!microphoneOn)}
                />
              </button>
            </div>
            <div className="toggle-container">
              <button className="no-gap2">
                PH
                <ToggleButton
                  isOn={phOn}
                  toggleSwitch={() => setPhOn(!phOn)}
                />
              </button>
            </div>

            <div className="individual-button help-button">
              <button>Help<span className="arrow">&gt;</span></button>
            </div>

            <div className="individual-button sign-out-button">
            <button onClick={goToLogOut}>Sign out</button>
            </div>
          </div>

          {/* Right Side */}
          <div className="settings-right">
            <button className="no-gap1">
              About<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap2">
              Software Update<span className="arrow">&gt;</span>
            </button>

            <h2>Display</h2>
            <button className="no-gap1">
              Background<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap2">
              Theme<span className="arrow">&gt;</span>
            </button>

            <h2>Other</h2>
            <button className="no-gap1">
              Notifications<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap">
              Sounds<span className="arrow">&gt;</span>
            </button>
            <button className="no-gap2">
              Accessibility<span className="arrow">&gt;</span>
            </button>

            <div className="individual-button change-user-button">
              <button onClick={goToLogOut}>Change user</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};