import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddDevice.css'; // Import the CSS file
import userIcon from '../images/User.png';

export const AddDevice = () => {
    const navigate = useNavigate();
  
    const goToAdd = () => navigate("/devices");
    const goToCancel = () => navigate("/devices");

    const [selectedTimePeriod, setSelectedTimePeriod] = useState("Light"); // Default to "week"
    const [dropdownOpen, setDropdownOpen] = useState(false); // Track if the dropdown is open

    // Handle time period change from custom dropdown
  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period); // Update the selected time period
    setDropdownOpen(false); // Close the dropdown after selecting
    console.log(`Selected Time Period: ${period}`);
    // You can add additional logic here to handle data changes based on selected time period
  };

    return (
      
        <main className="mainAddDevices">
          <div className="addDevicesHeader">
            <button className="navButtonAddDevices" onClick={() => navigate(-1)}>{"<"}</button>
            <h1>+ Add Device</h1>
            <button className="navButtonAddDevices" onClick={() => navigate("/profile")}>
              <img src={userIcon} alt="User Icon" />
            </button>
          </div>
  
          <div className="addDevices-columns">
            <div className="addDevices-left">
              <div className=" blockAddDevice no-gap2Device">
              <div className="inputText">Device Name</div>
              <div className='inputDevice'>
                <inputs>
                <input 
                 type="text"
                 name="name"
                 placeholder="Device Name"
                />
                </inputs>
             </div>
             
              </div>
              <div className=" blockAddDevice no-gap2Device">
              <div className="inputText">Device Type</div>
              <div className='inputDevice'>
              <div className="dropdown">
          {/* Toggle Button for Dropdown */}
          <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)} {/* Capitalize first letter */}
            <span className="arrow">{dropdownOpen ? '▼' : '►'}</span>
          </div>

          {/* Dropdown List */}
          {dropdownOpen && (
            <div className="dropdown-list">
              {['Light', 'Kitchen', 'Laundry'].map((period) => (
                <div
                  key={period}
                  className="dropdown-item"
                  onClick={() => handleTimePeriodChange(period)} // Corrected: Pass period directly
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)} {/* Capitalize first letter */}
                </div>
              ))}
            </div>
          )}
        </div>
        
             </div>
              </div>
              
              <div className=" blockAddDevice no-gap2Device">
              <div className="inputText">Room Name</div>
              <div className='inputDevice'>
                <inputs>
                <input 
                 type="text"
                 name="name"
                 placeholder="Room Name"
                />
                </inputs>
             </div>
             
              </div>

            </div>
          </div>
  
          <div className="addDevices-bottom">
            <button className="left-button" onClick={goToCancel}>Cancel</button>
            <button className="right-button" onClick={goToAdd}>Add Device</button>
          </div>
        </main>
    );
};

export default AddDevice;





