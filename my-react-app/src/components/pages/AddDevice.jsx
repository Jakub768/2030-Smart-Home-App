import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AddDevice.css';
import userIcon from '../images/User.png';

const API_BASE_URL = "http://127.0.0.1:5000"; // Change if deployed

export const AddDevice = () => {
    const navigate = useNavigate();
    const [deviceName, setDeviceName] = useState("");
    const [selectedDeviceType, setSelectedDeviceType] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState({ deviceType: false, room: false });

    const username = sessionStorage.getItem("username"); // Get username from sessionStorage

    useEffect(() => {
        fetch(`${API_BASE_URL}/devices?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (!data.devices_types || !data.rooms) {
                    throw new Error("Failed to fetch data");
                }

                setDeviceTypes(data.devices_types.map(typeArr => typeArr[0])); // Extract type names
                setRooms(data.rooms.map(roomArr => roomArr[0])); // Extract room names
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch device types and rooms.");
                setLoading(false);
            });
    }, [username]);

    const handleDropdownToggle = (key) => {
        setDropdownOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAddDevice = () => {
        if (!deviceName || !selectedDeviceType || !selectedRoom || !username) {
            alert("Please fill in all fields before adding a device.");
            return;
        }

        const requestData = {
            username: username, // Include username
            device_name: deviceName,
            device_type: selectedDeviceType,
            room_name: selectedRoom
        };

        console.log("Sending request:", requestData); // Debug: Check request payload

        fetch(`${API_BASE_URL}/add_device`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response received:", data); // Debug: Log response
            if (data.message) {
                navigate("/devices");
            } else {
                alert("Error adding device: " + data.error);
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Failed to add device.");
        });
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

            {loading ? (
                <div className="loadingMessage">Loading device types and rooms...</div>
            ) : error ? (
                <div className="errorMessage">{error}</div>
            ) : (
                <div className="addDevices-columns">
                    <div className="addDevices-left">
                        {/* Device Name Input */}
                        <div className="blockAddDevice no-gap2Device">
                            <div className="inputText">Device Name</div>
                            <div className="inputDevice">
                                <input 
                                    type="text"
                                    name="name"
                                    placeholder="Enter Device Name"
                                    value={deviceName}
                                    onChange={(e) => setDeviceName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Device Type Dropdown */}
                        <div className="blockAddDevice no-gap2Device">
                            <div className="inputText">Device Type</div>
                            <div className="dropdown">
                                <div className="dropdown-toggle" onClick={() => handleDropdownToggle("deviceType")}>
                                    {selectedDeviceType || "Select Device Type"} 
                                    <span className="arrow">{dropdownOpen.deviceType ? "▼" : "►"}</span>
                                </div>
                                {dropdownOpen.deviceType && (
                                    <div className="dropdown-list">
                                        {deviceTypes.map((type) => (
                                            <div key={type} className="dropdown-item" onClick={() => { 
                                                setSelectedDeviceType(type); 
                                                handleDropdownToggle("deviceType");
                                            }}>
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Room Selection Dropdown */}
                        <div className="blockAddDevice no-gap2Device">
                            <div className="inputText">Room Name</div>
                            <div className="dropdown">
                                <div className="dropdown-toggle" onClick={() => handleDropdownToggle("room")}>
                                    {selectedRoom || "Select Room"}
                                    <span className="arrow">{dropdownOpen.room ? "▼" : "►"}</span>
                                </div>
                                {dropdownOpen.room && (
                                    <div className="dropdown-list">
                                        {rooms.map((room) => (
                                            <div key={room} className="dropdown-item" onClick={() => { 
                                                setSelectedRoom(room);
                                                handleDropdownToggle("room");
                                            }}>
                                                {room}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="addDevices-bottom">
                <button className="left-button" onClick={() => navigate("/devices")}>Cancel</button>
                <button className="right-button" onClick={handleAddDevice}>Add Device</button>
            </div>
        </main>
    );
};

export default AddDevice;
