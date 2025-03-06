import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Devices.css'; // Import the CSS file


const ToggleButton = ({ isOn, toggleSwitch }) => (
  <div className={`toggle-switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
    <div className="toggle-thumb"></div>
  </div>
);

const Devices = () => {
  const [light1On, setLight1On] = useState(false);
  const [light2On, setLight2On] = useState(false);
  const [light3On, setLight3On] = useState(false);
  const [light4On, setLight4On] = useState(false);
  const [KettleOn, setKettleOn] = useState(false);
  const [DishwasherOn, setDishwasherOn] = useState(false);
  const [OvenOn, setOvenOn] = useState(false);
  const [MicrowaveOn, setMicrowaveOn] = useState(false);
  const [WMOn, setWMOn] = useState(false);
  const [DMOn, setDMOn] = useState(false);

  // Prepping for pull from Back-end
  const [devices, setDevices] = useState([]);

  // Fetch devices from an API
  useEffect(() => {
    fetch('https://api.example.com/devices') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error("Error fetching devices:", error));
  }, []);

  const toggleDevice = (id) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const addDevice = () => {
    const newDevice = {
      id: devices.length + 1, // Generate a new ID
      name: `New Device ${devices.length + 1}`,
      type: "light", // Default type, you can change this as needed
      isOn: false,
    };
    setDevices([...devices, newDevice]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const renderDevicesByType = (type) => {
    return devices
      .filter(device => device.type === type)
      .map(device => (
        <div className="toggle-container" key={device.id}>
          <button className="no-gap1">
            {device.name}
            <ToggleButton isOn={device.isOn} toggleSwitch={() => toggleDevice(device.id)} />
            <button onClick={() => removeDevice(device.id)}>Remove</button>
          </button>
        </div>
      ));
  }

  // These need under "sectionDevices" class :   {renderDevicesByType("light")}, {renderDevicesByType("kitchen")}, {renderDevicesByType("laundry")}
  
  const navigate = useNavigate();

  return (
      <main className="mainDevices">
        <div className="DevicesHeader">
          <div className="leftHeader">
          <button className="navButtonDevices" onClick={() => navigate(-1)}>{"<"}</button>
          <button className="addDevice">Add Device</button>
          </div>
          <h1>Devices</h1>
          <button className="navButtonDevices" onClick={() => navigate("/profile")}>👤</button>
        </div>
        <div style={{ height: '68vh', overflowY: 'scroll' }}>
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
            </div>
            <h2 className="headingsDevices">Laundry appliances</h2>
            <div className="sectionDevices">
            <div className="toggle-container">
              <button className="no-gap1">Washing Machine<ToggleButton isOn={WMOn} toggleSwitch={() => setWMOn(!WMOn)} /></button>
            </div>
            <div className="toggle-container">
              <button className="no-gap1">Dryer Machine<ToggleButton isOn={DMOn} toggleSwitch={() => setDMOn(!DMOn)} /></button>
            </div>
            </div>

        </div>
      </main>
  );
};

export default Devices;
