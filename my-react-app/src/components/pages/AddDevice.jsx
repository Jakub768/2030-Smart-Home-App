import React from "react";
import { useNavigate } from "react-router-dom";
import './AddDevice.css'; // Import the CSS file
import userIcon from '../images/User.png';

export const AddDevice = () => {
  const navigate = useNavigate();

  return (
      <main className="mainAddDevice">
        <div className="addDeviceHeader">
          <button className="navButtonAddDevice" onClick={() => navigate(-1)}>{"<"}</button>
          <h1>Add Device</h1>
          <button className="navButtonAddDevice" onClick={() => navigate("/profile")}>
            <img src={userIcon} alt="User Icon" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="contentRowAddDevice">
          {/* Left Section */}
          <div className="leftSectionAddDevice">
            <div className="search-container">
              <div className="blockColumnAddDevice">
                <div className="blockAddDevice topBlockAddDevice add">+ Add Device</div>
              </div>
              <div className="blockColumnAddDevice">
                <div className="blockAddDevice topBlockAddDevice search-bar">Search...</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsAddDevice">Lights</h2>
              <div className="blockColumnAddDevice">
                <div className="blockAddDevice topBlockAddDevice">Block 1</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsAddDevice">Kitchen appliances</h2>
              <div className="blockColumnAddDevice">
                <div className="blockAddDevice topBlockAddDevice">Block 1</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsAddDevice">Laundry appliances</h2>
              <div className="blockColumnAddDevice">
                <div className="blockAddDevice topBlockAddDevice">Block 1</div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default AddDevice;
