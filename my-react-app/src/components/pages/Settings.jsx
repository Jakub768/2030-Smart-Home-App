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
            <button>My Profile</button>
            <button>Wi-Fi</button>
            <button>Bluetooth</button>

            <h2>Permissions</h2>
            <ul>
              <li>Location <input type="checkbox" /></li>
              <li>Camera <input type="checkbox" /></li>
              <li>Microphone <input type="checkbox" /></li>
            </ul>

            <button>Help</button>
            
            <div className="settings-actions">
              <button>Sign out</button>
            </div>
          </div>

          {/* Right Side */}
          <div className="settings-right">
          <button>About</button>
          <button>Software Update</button>

            <h2>Display</h2>
            <ul>
              <li><button>Background</button></li>
              <li><button>Theme</button></li>
            </ul>

            <h2>Other</h2>
            <ul>
              <li><button>Notifications</button></li>
              <li><button>Sounds</button></li>
              <li><button>Accessibility</button></li>
            </ul>
            
            <div className="settings-actions">
              <button>Change user</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};