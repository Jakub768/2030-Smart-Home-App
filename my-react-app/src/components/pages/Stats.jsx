import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import './Stats.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Stats = () => {
  const navigate = useNavigate();

  const deviceStats = [
    {
      deviceName: "Device 1",
      energyConsumption: 120, // in kWh
      energyGeneration: 80, // in kWh
      robotUsage: 50, // in hours
      robotStatus: "Active", // Could be "Active", "Inactive", "Idle"
      costOfEnergy: 0.12, // Cost per kWh
      roomName: "Living Room"
    },
    {
      deviceName: "Device 2",
      energyConsumption: 200, // in kWh
      energyGeneration: 150, // in kWh
      robotUsage: 75, // in hours
      robotStatus: "Inactive",
      costOfEnergy: 0.15,
      roomName: "Kitchen"
    },
    {
      deviceName: "Device 3",
      energyConsumption: 50, // in kWh
      energyGeneration: 30, // in kWh
      robotUsage: 20, // in hours
      robotStatus: "Idle",
      costOfEnergy: 0.10,
      roomName: "Bedroom"
    },
    {
      deviceName: "Device 4",
      energyConsumption: 120, // in kWh
      energyGeneration: 100, // in kWh
      robotUsage: 60, // in hours
      robotStatus: "Active",
      costOfEnergy: 0.12,
      roomName: "Living Room"
    }
  ];

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week"); // Default to "week"
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track if the dropdown is open

  // Function to sort the devices
  const sortedDevices = useMemo(() => {
    let sortableDevices = [...deviceStats];
    if (sortConfig.key) {
      sortableDevices.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableDevices;
  }, [deviceStats, sortConfig]);

  // Function to request sorting on a column
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to handle search and filter devices
  const filteredDevices = useMemo(() => {
    return sortedDevices.filter((device) =>
      device.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.roomName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedDevices, searchQuery]);

  // Handle time period change from custom dropdown
  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period); // Update the selected time period
    setDropdownOpen(false); // Close the dropdown after selecting
    console.log(`Selected Time Period: ${period}`);
    // You can add additional logic here to handle data changes based on selected time period
  };

  return (
    <main className="mainStats">
      <div className="statsHeader">
        <button className="navButtonStats" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>Stats</h1>
        <button className="navButtonStats" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search by Device or Room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
      </div>

      <div className="deviceStatsContainer">
        <table className="deviceTable">
          <thead>
            <tr>
              <th onClick={() => requestSort('deviceName')}>Device Name</th>
              <th onClick={() => requestSort('energyConsumption')}>Energy Consumption (kWh)</th>
              <th onClick={() => requestSort('energyGeneration')}>Energy Generation (kWh)</th>
              <th onClick={() => requestSort('robotUsage')}>Robot Usage (hrs)</th>
              <th onClick={() => requestSort('robotStatus')}>Robot Status</th>
              <th onClick={() => requestSort('costOfEnergy')}>Cost of Energy ($)</th>
              <th onClick={() => requestSort('roomName')}>Room Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device, index) => (
              <tr key={index}>
                <td>{device.deviceName}</td>
                <td>{device.energyConsumption}</td>
                <td>{device.energyGeneration}</td>
                <td>{device.robotUsage}</td>
                <td>{device.robotStatus}</td>
                <td>${(device.energyConsumption * device.costOfEnergy).toFixed(2)}</td>
                <td>{device.roomName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Dropdown */}
      <div className="bottomSectionStats">
        <p>Compare stats from the current&nbsp;</p>
        
        <div className="dropdown">
          {/* Toggle Button for Dropdown */}
          <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)} {/* Capitalize first letter */}
            <span className="arrow">{dropdownOpen ? '▼' : '►'}</span>
          </div>

          {/* Dropdown List */}
          {dropdownOpen && (
            <div className="dropdown-list">
              {['day', 'week', 'month', 'year'].map((period) => (
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
        <p>&nbsp;with the previous {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}:</p>

      </div>
    </main>
  );
};

export default Stats;
