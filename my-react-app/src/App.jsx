import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Signin, Home, Services, Settings/*, MyProfile*/ } from "./components/pages"; // Import Settings
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Rooms from "./components/pages/Rooms";
import Stats from "./components/pages/Stats";
import Devices from "./components/pages/Devices";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </div>
  );
}

export default App;