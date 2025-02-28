import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Import the CSS file

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
      <main className="mainDashboard">
        {/* Top section containing Back button, Title, and Right-side div */}
        <div className="headerDashboard">
          {/* Back Button */}
          <button className="navButtonDashboard" onClick={() => navigate(-1)}>{"<"}</button>

          {/* Dashboard Title */}
          <h1>Dashboard</h1>

          {/* Placeholder div (identical to the back button in style) */}
          <button className="navButtonDashboard" onClick={() => navigate("/profile")}>👤</button>
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
            <div className="scrollBlockDashboard topBlockDashboard">Massage</div>
            <div className="scrollBlockDashboard">Scroller</div>
            <div className="scrollBlockDashboard bottomBlockDashboard">Here</div>
          </div>
          <div className="circularBlockWrapperDashboard">
            <div className="circularBlockDashboard">Pie Chart</div>
          </div>
        </div>
      </main>
  );
};

export default Dashboard;
