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
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'device_name',
    direction: 'asc',
  });
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => { 
    if (username) {
      fetchStatData(username, selectedTimePeriod);
    } else {
      setError('No username found');
      setLoading(false);
    }
  }, [username, selectedTimePeriod]); 

  const fetchStatData = (username, selectedTimePeriod) => {
    const formattedPeriod = selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1);

    fetch(`http://127.0.0.1:5000/stats?username=${username}&intervals=${formattedPeriod}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  };

  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period);
    setDropdownOpen(false);
    fetchStatData(username, period);
  };

  // Filter the devices based on the search query
  const filteredDevices = useMemo(() => {
    if (!data) return [];
    
    let sortableDevices = [];
    Object.values(data?.top_data || {}).forEach((deviceData) => {
      sortableDevices = [...sortableDevices, ...Object.values(deviceData).flat()];
    });

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
  
      const isNumeric = !isNaN(aValue) && !isNaN(bValue);
  
      if (isNumeric) {
        const numA = parseFloat(aValue);
        const numB = parseFloat(bValue);
  
        if (numA < numB) {
          return direction === 'asc' ? 1 : -1;
        }
        if (numA > numB) {
          return direction === 'asc' ? -1 : 1;
        }
      } else {
        if (aValue.toLowerCase() < bValue.toLowerCase()) {
          return direction === 'asc' ? -1 : 1;
        }
        if (aValue.toLowerCase() > bValue.toLowerCase()) {
          return direction === 'asc' ? 1 : -1;
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
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted devices
  const sortedDevices = useMemo(() => {
    const devices = filteredDevices;
    return sortDevices(devices);
  }, [filteredDevices, sortConfig]);

  // Show device details
  const showDeviceDetails = (device) => {
    setSelectedDevice(device);
  };

  // Close device details
  const closeDeviceDetails = () => {
    setSelectedDevice(null);
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

      <div>
        <input
          type="text"
          placeholder="Search by Device or Room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Mobile view: Card-based layout */}
      <div className="deviceCards">
        {sortedDevices.length > 0 ? (
          sortedDevices.map((device, index) => (
            <div key={index} className="deviceCard" onClick={() => showDeviceDetails(device)}>
              <div className="deviceCardHeader">
                <h3>{device.device_name ?? "N/A"}</h3>
                <span className="deviceRoom">{device.room_name ?? "N/A"}</span>
              </div>
              <div className="deviceCardStats">
                <div className="deviceStat">
                  <span className="statLabel">Energy:</span>
                  <span className="statValue">{device.energy_consumption ?? "N/A"} kWh</span>
                </div>
                <div className="deviceStat">
                  <span className="statLabel">Status:</span>
                  <span className="statValue">{device.device_status ?? "N/A"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noDevicesFound">No devices found matching your search.</div>
        )}
      </div>

      {/* Desktop view: Table layout */}
      <div className="deviceStatsContainer">
        <table className="deviceTable">
          <thead>
            <tr>
              <th onClick={() => requestSort('device_name')}>
                Device Name
              </th>
              <th onClick={() => requestSort('energy_consumption')}>
                Energy (kWh)
              </th>
              <th onClick={() => requestSort('energy_generation')}>
                Generation (kWh)
              </th>
              <th onClick={() => requestSort('device_usage')}>
                Usage (hrs)
              </th>
              <th onClick={() => requestSort('device_status')}>
                Status
              </th>
              <th onClick={() => requestSort('costs_of_energy')}>
                Cost ($)
              </th>
              <th onClick={() => requestSort('room_name')}>
                Room
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

      {/* Device Detail Modal */}
      {selectedDevice && (
        <div className="deviceDetailModal">
          <div className="modalContent">
            <div className="modalHeader">
              <h2>{selectedDevice.device_name}</h2>
              <button className="closeButton" onClick={closeDeviceDetails}>×</button>
            </div>
            <div className="modalBody">
              <div className="detailRow">
                <span className="detailLabel">Room:</span>
                <span className="detailValue">{selectedDevice.room_name ?? "N/A"}</span>
              </div>
              <div className="detailRow">
                <span className="detailLabel">Energy Consumption:</span>
                <span className="detailValue">{selectedDevice.energy_consumption ?? "N/A"} kWh</span>
              </div>
              <div className="detailRow">
                <span className="detailLabel">Energy Generation:</span>
                <span className="detailValue">{selectedDevice.energy_generation ?? "N/A"} kWh</span>
              </div>
              <div className="detailRow">
                <span className="detailLabel">Device Usage:</span>
                <span className="detailValue">{selectedDevice.device_usage ?? "N/A"} hrs</span>
              </div>
              <div className="detailRow">
                <span className="detailLabel">Device Status:</span>
                <span className="detailValue">{selectedDevice.device_status ?? "N/A"}</span>
              </div>
              <div className="detailRow">
                <span className="detailLabel">Cost of Energy:</span>
                <span className="detailValue">${(selectedDevice.energy_consumption != null && selectedDevice.costs_of_energy != null) ? (parseFloat(selectedDevice.energy_consumption) * parseFloat(selectedDevice.costs_of_energy)).toFixed(2) : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Period Selector */}
      <div className="bottomSectionStats">
        <p>Compare stats from the current&nbsp;</p>
        
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}
            <span className="arrow">{dropdownOpen ? '▼' : '►'}</span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-list">
              {['day', 'week', 'month', 'year'].map((period) => (
                <div
                  key={period}
                  className="dropdown-item"
                  onClick={() => handleTimePeriodChange(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
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