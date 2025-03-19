import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Devices.css';
import userIcon from '../images/User.png';

const API_BASE_URL = "http://127.0.0.1:5000"; // Change if deployed

const ToggleButton = ({ isOn, toggleSwitch }) => (
  <div className={`toggle-switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
    <div className="toggle-thumb"></div>
  </div>
);

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      setError("No username found in sessionStorage.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/devices?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (!data.devices || data.devices.length === 0) {
          throw new Error("No devices found.");
        }

        // Format devices from response
        const formattedDevices = data.devices.map(([id, name, type, status]) => ({
          id,
          name,
          type,
          isOn: status === "active"
        }));

        // Extract unique device types from "devices_types"
        const extractedDeviceTypes = data.devices_types.map(typeArr => typeArr[0]); // Fix: Extract type names correctly

        setDevices(formattedDevices);
        setDeviceTypes(extractedDeviceTypes);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching devices:", error);
        setError("Failed to fetch devices.");
        setLoading(false);
      });
  }, [username]);

  const toggleDevice = (device) => {
    const newStatus = device.isOn ? "deactivate" : "activate";

    // Optimistically update UI
    setDevices(prevDevices =>
      prevDevices.map(d =>
        d.id === device.id ? { ...d, isOn: !d.isOn } : d
      )
    );

    // Send request to backend
    fetch(`${API_BASE_URL}/change_device_status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        device_name: device.name,
        device_status: newStatus
      })
    })
      .then(response => response.json())
      .then((data) => {
        if (!data.message) {
          console.error("Error updating device:", data.error);
          // Revert toggle if API request fails
          setDevices(prevDevices =>
            prevDevices.map(d =>
              d.id === device.id ? { ...d, isOn: !d.isOn } : d
            )
          );
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setError("Network error while updating device.");
        // Revert toggle if network request fails
        setDevices(prevDevices =>
          prevDevices.map(d =>
            d.id === device.id ? { ...d, isOn: !d.isOn } : d
          )
        );
      });
  };

  const renderDevicesByType = (type) => {
    const filteredDevices = devices.filter(device => device.type === type);

    if (filteredDevices.length === 0) {
      return <p className="no-devices">No devices available.</p>;
    }

    return filteredDevices.map(device => (
      <div className="toggle-container" key={device.id}>
        <button className="no-gap1">
          {device.name}
          <ToggleButton isOn={device.isOn} toggleSwitch={() => toggleDevice(device)} />
        </button>
      </div>
    ));
  };

  if (loading) {
    return <div className="mainDevices">Loading devices...</div>;
  }

  if (error) {
    return <div className="mainDevices">{error}</div>;
  }

  return (
      <main className="mainDevices">
        <div className="DevicesHeader">
          <div className="leftHeader">
            <button className="navButtonDevices" onClick={() => navigate(-1)}>{"<"}</button>
            <button className="addDevice" onClick={() => navigate("/add_device")}>
              <span className="button-text">Add Device</span>
              <span className="button-icon">+</span>
            </button>
          </div>
          <div className="centreHeader">
            <h1>Devices</h1>
          </div>
          <div className="rigthHeader">
            <button className="navButtonDashboard" onClick={() => navigate("/profile")}>
              <img src={userIcon} alt="User Icon" />
            </button>
          </div>
        </div>
        <div className="contentDevices">
            <h2 className="headingsDevices">Lights</h2>
            <div className="sectionDevices">
              <div className="toggle-container">
                <button className="no-gap1">Light 1<ToggleButton isOn={light1On} toggleSwitch={() => setLight1On(!light1On)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Light 2<ToggleButton isOn={light2On} toggleSwitch={() => setLight2On(!light2On)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Light 3<ToggleButton isOn={light3On} toggleSwitch={() => setLight3On(!light3On)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Light 4<ToggleButton isOn={light4On} toggleSwitch={() => setLight4On(!light4On)} /></button>
              </div>
              {/* {renderDevicesByType("light")} */}
            </div>
            <h2 className="headingsDevices">Kitchen appliances</h2>
            <div className="sectionDevices">
              <div className="toggle-container">
                <button className="no-gap1">Kettle<ToggleButton isOn={KettleOn} toggleSwitch={() => setKettleOn(!KettleOn)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Dishwasher<ToggleButton isOn={DishwasherOn} toggleSwitch={() => setDishwasherOn(!DishwasherOn)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Oven<ToggleButton isOn={OvenOn} toggleSwitch={() => setOvenOn(!OvenOn)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Microwave<ToggleButton isOn={MicrowaveOn} toggleSwitch={() => setMicrowaveOn(!MicrowaveOn)} /></button>
              </div>
              {/* {renderDevicesByType("kitchen")} */}
            </div>
            <h2 className="headingsDevices">Laundry appliances</h2>
            <div className="sectionDevices">
              <div className="toggle-container">
                <button className="no-gap1">Washing Machine<ToggleButton isOn={WMOn} toggleSwitch={() => setWMOn(!WMOn)} /></button>
              </div>
              <div className="toggle-container">
                <button className="no-gap1">Dryer Machine<ToggleButton isOn={DMOn} toggleSwitch={() => setDMOn(!DMOn)} /></button>
              </div>
              {/* {renderDevicesByType("laundry")} */}
            </div>
        </div>
      </main>
  );
};

export default Devices;