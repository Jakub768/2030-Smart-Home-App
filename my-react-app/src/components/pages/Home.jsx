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

      // format the date like "Thursday, Nov 17"
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      // format the time in 24 hours and minutes
      const formattedTime = now.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // update current date and time
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const getLastMonth = () => {
      const now = new Date();
      // Subtract one month from the current month
      now.setMonth(now.getMonth() - 1);

      // Get the month name
      const lastMonthName = now.toLocaleString("default", { month: "long" });

      // Set last month name in state
      setLastMonth(lastMonthName);
    };

    updateDateTime(); // set interval to update every minute
    getLastMonth();

    const interval = setInterval(updateDateTime, 60000);

    // clear the interval when updated
    return () => clearInterval(interval);
  }, []);

  const increaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.min(prevTemp + 0.5, 32);
      localStorage.setItem("temperature", newTemp); // Save new temperature to localStorage
      return newTemp;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp - 0.5, 18);
      localStorage.setItem("temperature", newTemp); // Save new temperature to localStorage
      return newTemp;
    });
  };

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
              <button className="minus" onClick={decreaseTemperature}>-</button>
              {temperature}°C
              <button className="plus" onClick={increaseTemperature}>+</button></div>
            <div className="blockHome">30%</div>
            <div className="blockHome">12</div>
            <div className="blockHome lastBlockHome">3</div>
          </div>
          <div className="paragraphsContainer1Home">
            <p className="paragraphHome">Chill</p>
            <p className="paragraphHome">Mildly Humid</p>
            <p className="paragraphHome">Devices Active</p>
            <p className="paragraphHome">Occupied Rooms</p>
          </div>

          <h2>Outside the residence</h2>
          <div className="sectionHome">
            <div className="blockHome firstBlockHome">Block 1</div>
            <div className="blockHome">Block 2</div>
            <div className="blockHome">Block 3</div>
            <div className="blockHome lastBlockHome">Block 4</div>
          </div>
          <div className="paragraphsContainer2Home">
            <p className="paragraphHome">1</p>
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
                <p className="bottomTextRight"> hi</p>
              </div>
              <div className="blockHome topBlockHome">
                <p className="bottomTextLeft">Next bill due</p>
                <p className="bottomTextRight">h</p>
              </div>
            </div>
            <div className="energyRowHome">
              <div className="blockHome bottomBlockHome">
                <p className="bottomTextLeft">Amount</p>
                <p className="bottomTextRight">h</p>
              </div>
              <div className="blockHome bottomBlockHome">
                <p className="bottomTextLeft">Amount so far</p>
                <p className="bottomTextRight">h</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};
