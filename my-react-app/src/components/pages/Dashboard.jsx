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

  // State to store the data
    const [data, setData] = useState(null);
  
    // State to handle loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch data when component mounts
    useEffect(() => {
      // Fetch the data from the Flask API
      fetch('http://127.0.0.1:5000/dashboard')
        .then((response) => response.json())  // Parse the JSON response
        .then((data) => {
          setData(data);  // Set data to state
          setLoading(false);  // Set loading to false after data is fetched
        })
        .catch((err) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    }, []);
  
    // Render the component
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

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
                <div className="blockDashboard topBlockDashboard"><p>Energy Consumed</p><p>{data.Last_24_hours.total_energy_consumed}</p></div>
                <div className="blockDashboard bottomBlockDashboard"><p>Energy Cost</p><p>{data.Last_24_hours.total_costs_of_energy}</p></div>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h2 className="headingsDashboard">Most energy consumed by</h2>
              <div className="blockColumnDashboard">
                <div className="blockDashboard topBlockDashboard"><p>1</p><p></p></div>
                <div className="blockDashboard"><p>2</p><p></p></div>
                <div className="blockDashboard bottomBlockDashboard"><p>3</p><p></p></div>
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
