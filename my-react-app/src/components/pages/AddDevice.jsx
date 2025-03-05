import React from "react";
import { useNavigate } from "react-router-dom";
import './AddDevice.css'; // Import the CSS file

export const AddDevice = () => {
  const navigate = useNavigate();

  return (
      <main className="mainDashboard">
        {/* Top section containing Back button, Title, and Right-side div */}
        <div className="headerDashboard">
          {/* Back Button */}
          <button className="navButtonDashboard" onClick={() => navigate(-1)}>{"<"}</button>

          {/* Dashboard Title */}
          <h1>Devices</h1>

          {/* Placeholder div (identical to the back button in style) */}
          <button className="navButtonDashboard" onClick={() => navigate("/profile")}>👤</button>
        </div>

        {/* Content Sections */}
        <div className="contentRowDashboard">
          {/* Left Section */}
          <div className="leftSectionDashboard">
            <div className="search-container">
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard add">+ Add Device</div>
              </div>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard search-bar">Search...</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDashboard">Lights</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard">Block 1</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDashboard">Kitchen appliances</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard">Block 1</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDashboard">Laundry appliances</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard">Block 1</div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default AddDevice;
