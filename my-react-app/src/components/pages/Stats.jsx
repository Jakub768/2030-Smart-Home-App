import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Stats.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Stats = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem('username'); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week"); // Default to "week"
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track if the dropdown is open
  const [sortConfig, setSortConfig] = useState({
    key: 'device_name',  // Default sorting by device_name
    direction: 'asc',    // Default direction is ascending
  });

  useEffect(() => { 
    if (username) {
      fetchStatData(username, selectedTimePeriod); // Fetch data based on selected time period
    } else {
      setError('No username found'); // Handle case where no username is found
      setLoading(false);
    }
  }, [username, selectedTimePeriod]); 

  const fetchStatData = (username, selectedTimePeriod) => {
    const formattedPeriod = selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1);

    // Make the API call with the selected time period
    fetch(`http://127.0.0.1:5000/stats?username=${username}&intervals=${formattedPeriod}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the fetched data to the state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch data'); // Handle error
        setLoading(false);
      });
  };

  // Handle time period change from custom dropdown
  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period); // Update the selected time period
    setDropdownOpen(false); // Close the dropdown after selecting
    fetchStatData(username, period);  // Fetch data based on the new period
  };

  // Filter the devices based on the search query
  const filteredDevices = useMemo(() => {
    if (!data) return [];
    
    let sortableDevices = [];
    Object.values(data?.top_data || {}).forEach((deviceData) => {
      sortableDevices = [...sortableDevices, ...Object.values(deviceData).flat()];
    });

    // Filter the devices based on device_name or room_name
    return sortableDevices.filter((device) =>
      device.device_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.room_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Sort devices by the selected column and direction
  const sortDevices = (devices) => {
    const { key, direction } = sortConfig;
  
    const sortedDevices = [...devices].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
  
      // Check if the column is numeric
      const isNumeric = !isNaN(aValue) && !isNaN(bValue);
  
      if (isNumeric) {
        // For numeric values, sort in descending order
        const numA = parseFloat(aValue);
        const numB = parseFloat(bValue);
  
        if (numA < numB) {
          return direction === 'asc' ? 1 : -1; // Descending for numbers
        }
        if (numA > numB) {
          return direction === 'asc' ? -1 : 1; // Descending for numbers
        }
      } else {
        // For strings, sort in ascending order
        if (aValue.toLowerCase() < bValue.toLowerCase()) {
          return direction === 'asc' ? -1 : 1; // Ascending for strings
        }
        if (aValue.toLowerCase() > bValue.toLowerCase()) {
          return direction === 'asc' ? 1 : -1; // Ascending for strings
        }
      }
      return 0;
    });
  
    return sortedDevices;
  };
  

  // Handle column click for sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'; // Reverse direction
    }
    setSortConfig({ key, direction });
  };

  // Get sorted devices
  const sortedDevices = useMemo(() => {
    const devices = filteredDevices;
    return sortDevices(devices);  // Sort the filtered devices
  }, [filteredDevices, sortConfig]);

  return (
    <main className="mainStats">
      <div className="statsHeader">
        <button className="navButtonStats" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>Stats</h1>
        <button className="navButtonStats" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>

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
              <th
                onClick={() => requestSort('device_name')}
                className={sortConfig.key === 'device_name' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Device Name
              </th>
              <th
                onClick={() => requestSort('energy_consumption')}
                className={sortConfig.key === 'energy_consumption' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Energy Consumption (kWh)
              </th>
              <th
                onClick={() => requestSort('energy_generation')}
                className={sortConfig.key === 'energy_generation' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Energy Generation (kWh)
              </th>
              <th
                onClick={() => requestSort('device_usage')}
                className={sortConfig.key === 'device_usage' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Device Usage (hrs)
              </th>
              <th
                onClick={() => requestSort('device_status')}
                className={sortConfig.key === 'device_status' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Device Status
              </th>
              <th
                onClick={() => requestSort('costs_of_energy')}
                className={sortConfig.key === 'costs_of_energy' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Cost of Energy ($)
              </th>
              <th
                onClick={() => requestSort('room_name')}
                className={sortConfig.key === 'room_name' ? (sortConfig.direction === 'asc' ? 'asc' : 'desc') : ''}
              >
                Room Name
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDevices.length > 0 ? (
              sortedDevices.map((device, index) => (
                <tr key={index}>
                  <td>{device.device_name ?? "N/A"}</td>
                  <td>{device.energy_consumption ?? "N/A"}</td>
                  <td>{device.energy_generation ?? "N/A"}</td>
                  <td>{device.device_usage ?? "N/A"}</td>
                  <td>{device.device_status ?? "N/A"}</td>
                  <td>${(device.energy_consumption != null && device.costs_of_energy != null) ? (parseFloat(device.energy_consumption) * parseFloat(device.costs_of_energy)).toFixed(2) : "N/A"}</td>
                  <td>{device.room_name ?? "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No devices found matching your search.</td>
              </tr>
            )}
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
        <p>&nbsp;with the previous <i><b><u>{selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}</u></b></i></p>

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Bottom Data Layout */}
          <div className="bottomDataContainer">
            <div className="leftColumn">
              <h3>Current {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}:</h3>
              <div className="dataRow">
                <span>Total Cost:</span>
                <span>{data?.bottom_data?.result_1?.total_cost ?? "N/A"}</span>
              </div>
              <div className="dataRow">
                <span>Total Device Usage:</span>
                <span>{data?.bottom_data?.result_1?.total_device_usage ?? "N/A"}</span>
              </div>
              <div className="dataRow">
                <span>Total Energy Consumption:</span>
                <span>{data?.bottom_data?.result_1?.total_energy_consumption ?? "N/A"} kWh</span>
              </div>
              <div className="dataRow">
                <span>Total Energy Generation:</span>
                <span>{data?.bottom_data?.result_1?.total_energy_generation ?? "N/A"} kWh</span>
              </div>
            </div>

            <div className="rightColumn">
              <h3>Previous {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}:</h3>
              <div className="dataRow">
                <span>Total Cost:</span>
                <span>{data?.bottom_data?.result_2?.total_cost ?? "N/A"}</span>
              </div>
              <div className="dataRow">
                <span>Total Device Usage:</span>
                <span>{data?.bottom_data?.result_2?.total_device_usage ?? "N/A"}</span>
              </div>
              <div className="dataRow">
                <span>Total Energy Consumption:</span>
                <span>{data?.bottom_data?.result_2?.total_energy_consumption ?? "N/A"} kWh</span>
              </div>
              <div className="dataRow">
                <span>Total Energy Generation:</span>
                <span>{data?.bottom_data?.result_2?.total_energy_generation ?? "N/A"} kWh</span>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Stats;
