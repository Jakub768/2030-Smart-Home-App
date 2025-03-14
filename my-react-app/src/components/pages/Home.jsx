import React, { useState, useEffect } from "react";
import './Home.css'; // Import the CSS file

export const Home = () => {
  const [currentDate, setCurrentDate] = useState(""); // current date const
  const [currentTime, setCurrentTime] = useState(""); // current time const
  const [lastMonth, setLastMonth] = useState(""); // state for last month's name
  const [temperature, setTemperature] = useState(() => {
    // Check if a temperature is stored in localStorage
    const storedTemp = localStorage.getItem("temperature");
    return storedTemp ? parseFloat(storedTemp) : 20; // Default to 20 if no stored temperature
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date(); // get current date and time
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const getLastMonth = () => {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      const lastMonthName = now.toLocaleString("default", { month: "long" });
      setLastMonth(lastMonthName);
    };

    updateDateTime();
    getLastMonth();

    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const increaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.min(prevTemp + 0.5, 32);
      localStorage.setItem("temperature", newTemp);
      return newTemp;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp - 0.5, 18);
      localStorage.setItem("temperature", newTemp);
      return newTemp;
    });
  };

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    // Fetch the data from the Flask API
    fetch('http://127.0.0.1:5000/home')
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
    <main className="mainHome">
      <div className="headerHome">
        <h1>{currentDate}</h1>
        <h1>{currentTime}</h1>
      </div>

      <div className="contentBoxHome">
        <h2>Inside the residence</h2>
        <div className="sectionHome">
          <div className="blockHome firstBlockHome">
            <button className="minus" onClick={decreaseTemperature} disabled={temperature <= 18}>-</button>
            {temperature}°C
            <button className="plus" onClick={increaseTemperature} disabled={temperature >= 32}>+</button>
          </div>
          <div className="blockHome">30%</div>
          <div className="blockHome">{data.Inside_The_Residence.Devices_Active}</div>
          <div className="blockHome lastBlockHome">{data.Inside_The_Residence.Rooms_Occupied}</div>
        </div>
        <div className="paragraphsContainer1Home">
          <p className="paragraphHome">Chill</p>
          <p className="paragraphHome">Mildly Humid</p>
          <p className="paragraphHome">Devices Active</p>
          <p className="paragraphHome">Occupied Rooms</p>
        </div>

        <h2>Outside the residence</h2>
        <div className="sectionHome">
          <div className="blockHome firstBlockHome">picture linked to weather type</div>
          <div className="blockHome">{data.Outside_The_Residence.Temperature}°C</div>
          <div className="blockHome">{data.Outside_The_Residence.Humidity}%</div>
          <div className="blockHome lastBlockHome">{data.Outside_The_Residence.Wind_Speed} mph</div>
        </div>
        <div className="paragraphsContainer2Home">
          <p className="paragraphHome">{data.Outside_The_Residence.Weather_Description}</p>
          <p className="paragraphHome">2</p>
          <p className="paragraphHome">3</p>
          <p className="paragraphHome">4</p>
        </div>
      </div>

      <div className="energySectionHome">
        <h2 className="energyTitleHome">Energy bill</h2>
        <div className="energyRowsHome">
          <div className="energyRowHome">
            <div className="blockHome topBlockHome">
              <p className="bottomTextLeft">{lastMonth}</p>
              <p className="bottomTextRight">{data.Energy_Bill.Bill_Paid_Status}</p>
            </div>

            <div className="blockHome topBlockHome">
              <p className="bottomTextLeft">Next bill due</p>
              <p className="bottomTextRight">{data.Energy_Bill.Next_Due_Date}</p>
            </div>
          </div>
          <div className="energyRowHome">
            <div className="blockHome bottomBlockHome">
              <p className="bottomTextLeft">Amount</p>
              <p className="bottomTextRight">£{data.Energy_Bill.Past_Bill_Amount}</p>
            </div>
            <div className="blockHome bottomBlockHome">
              <p className="bottomTextLeft">Amount so far</p>
              <p className="bottomTextRight">£{data.Energy_Bill.Current_Amount}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
