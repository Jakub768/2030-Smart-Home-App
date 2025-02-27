import React from "react";
import { useNavigate } from "react-router-dom";
import './Devices.css'; // Import the CSS file

export const Devices = () => {
  const navigate = useNavigate();

  return (
      <main className="mainDevices">
        {/* Top section containing Back button, Title, and Right-side div */}
        <div className="headerDevices">
          {/* Back Button */}
          <button className="navButtonDevices" onClick={() => navigate(-1)}>{"<"}</button>

          {/* Devices Title */}
          <h1>Devices</h1>

          {/* Placeholder div (identical to the back button in style) */}
          <button className="navButtonDevices" onClick={() => navigate("/profile")}>👤</button>
        </div>

        {/* Content Sections */}
        <div className="contentRowDevices">
          {/* Left Section */}
          <div className="leftSectionDevices">
            <div>
              <h2 className="headingsDevices">Lights</h2>
              <div className="blockColumnDevices">
                <div className="blockDevices topBlockDevices">Block 1</div>
                <div className="blockDevices bottomBlockDevices">Block 2</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDevices">Kitchen Appliances</h2>
              <div className="blockColumnDevices">
                <div className="blockDevices topBlockDevices">Block 1</div>
                <div className="blockDevices">Block 2</div>
                <div className="blockDevices bottomBlockDevices">Block 3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section for recent messages */}
        <div className="bottomSectionDevices">
          <div className="blockColumnDevices">
            <h2 className="headingsDevices">Laundry Appliances</h2>
            <div className="scrollBlockDevices topBlockDevices">Massage</div>
            <div className="scrollBlockDevices">Scroller</div>
            <div className="scrollBlockDevices bottomBlockDevices">Here</div>
          </div>
        </div>
      </main>
  );
};

export default Devices;
