import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Signin, Home, Services, Settings } from "./components/pages"; // Import Settings
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Rooms from "./components/pages/Rooms";
import Stats from "./components/pages/Stats";
import Devices from "./components/pages/Devices";
import Users from "./components/pages/Users";
import Faqs from "./components/pages/Faqs";
import AddDevice from "./components/pages/AddDevice";
import Room from "./components/pages/Room";

function App() {
  // Define the rooms data here
  const roomsData = [
    {
      name: "Kitchen",
      devices: [
        { title: "Device 1", kWh: "2.3 kWh" },
        { title: "Device 2", kWh: "1.5 kWh" },
        { title: "Device 3", kWh: "0.8 kWh" }
      ]
    },
    {
      name: "Living Room",
      devices: [
        { title: "Device 4", kWh: "1.1 kWh" },
        { title: "Device 5", kWh: "4.0 kWh" },
        { title: "Device 6", kWh: "3.5 kWh" }
      ]
    },
    {
      name: "Bathroom",
      devices: [
        { title: "Device 7", kWh: "0.9 kWh" },
        { title: "Device 8", kWh: "2.0 kWh" },
        { title: "Device 9", kWh: "1.4 kWh" }
      ]
    },
    {
      name: "Bedroom 1",
      devices: [
        { title: "Device 10", kWh: "2.1 kWh" },
        { title: "Device 11", kWh: "3.3 kWh" },
        { title: "Device 12", kWh: "1.6 kWh" }
      ]
    }
  ];

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Signin />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<Rooms rooms={roomsData} />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/add_device" element={<AddDevice />} />
        {/* Pass the roomsData to the Room component */}
        <Route path="/room/:roomName" element={<Room rooms={roomsData} />} />
      </Routes>
    </div>
  );
}

export default App;
