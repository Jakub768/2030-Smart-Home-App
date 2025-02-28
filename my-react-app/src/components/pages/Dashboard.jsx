import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Import the CSS file
import userIcon from '../images/User.png';

export const Dashboard = () => {
  const navigate = useNavigate();
  
  // array for message block to be replace by imported messages down the line
  const [messages, setMessages] = useState([
    "Message 1",
    "Message 2",
    "Message 3",
    "Message 4",
    "Message 5",
    "Message 6",
    "Message 7",
    "Message 8"
  ]);

  return (
      <main className="mainDashboard">
        {/* Top section containing Back button, Title, and Right-side div */}
        <div className="headerDashboard">
          {/* Back Button */}
          <button className="navButtonDashboard" onClick={() => navigate(-1)}>{"<"}</button>

          {/* Dashboard Title */}
          <h1>Dashboard</h1>

          {/* Placeholder div (identical to the back button in style) */}
          <button className="navButtonDashboard" onClick={() => navigate("/profile")}>
            <img src={userIcon} alt="User Icon" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="contentRowDashboard">
          {/* Left Section */}
          <div className="leftSectionDashboard">
            <div>
              <h2 className="headingsDashboard">Last 24 Hours</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard">Block 1</div>
                <div className="blockDashboard bottomBlockDashboard">Block 2</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDashboard">Most energy consumed by</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard">Block 1</div>
                <div className="blockDashboard">Block 2</div>
                <div className="blockDashboard bottomBlockDashboard">Block 3</div>
              </div>
            </div>
          </div>

          {/* Right Section with Bar Chart */}
          <div className="rightSectionDashboard">
            <h2 className="headingsDashboard">Consumption</h2>
            <div className="blockColumnDashboard">
              <div className="barChartBlockDashboard">Bar Chart</div>
            </div>
          </div>
        </div>

        {/* Bottom section for recent messages */}
        <div className="bottomSectionDashboard">
          <div className="blockColumnDashboard">
            <h2 className="headingsDashboard">Recent messages</h2>

            <div className="scrollableMessages">
              {/*  pull the messages */}
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`scrollBlockDashboard ${index === 0 ? 'topBlockDashboard' : index === messages.length - 1 ? 'bottomBlockDashboard' : ''}`}>
                  {message}
                </div>
              ))}
            </div>
          </div>
          <div className="circularBlockWrapperDashboard">
            <div className="circularBlockDashboard">Pie Chart</div>
          </div>
        </div>
      </main>
  );
};

export default Dashboard;
