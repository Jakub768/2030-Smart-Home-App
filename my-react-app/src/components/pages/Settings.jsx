import React from "react";
import "./Settings.css";

export const Settings = () => {
  return (
    <div className="container">
      <main className="settings-main">
        <h1 className="settings-title">Settings</h1>
        
        <div className="settings-columns">
          {/* Left Side */}
          <div className="settings-left">
          <button className="no-gap1">My Profile</button>
          <button className="no-gap">Wi-Fi</button>
          <button className="no-gap2">Bluetooth</button>


            <h2>Permissions</h2>
            <button className="no-gap1">Location</button>
            <button className="no-gap">Camera</button>
            <button className="no-gap">Microphone</button>
            <button className="no-gap2">PH</button>
            
            <div className="individual-button help-button">
                <button>Help</button>
            </div>


            <div className="individual-button sign-out-button">
              <button>Sign out</button>
            </div>
          </div>

          {/* Right Side */}
          <div className="settings-right">
            <button className="no-gap1">About</button>
            <button className="no-gap2">Software Update</button>

            <h2>Display</h2>
            <button className="no-gap1">Background</button>
            <button className="no-gap2">Theme</button>

            <h2>Other</h2>
            <button className="no-gap1">Notifications</button>
            <button className="no-gap">Sounds</button>
            <button className="no-gap2">Accessibility</button>
            
            <div className="individual-button">
              <button>Change user</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};