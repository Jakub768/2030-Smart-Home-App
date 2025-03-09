import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Signin, Home, Services, Settings /*, MyProfile*/ } from "./components/pages"; // Import Settings
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
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/add_device" element={<AddDevice />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;