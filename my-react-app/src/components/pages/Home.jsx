import React, { useState, useEffect } from "react";
import './Home.css'; // Import the CSS file

export const Home = () => {
  const [currentDate, setCurrentDate] = useState(""); // current date const
  const [currentTime, setCurrentTime] = useState(""); // current time const

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

    updateDateTime(); // set interval to update every minute
    const interval = setInterval(updateDateTime, 60000);

    // clear the interval when updated
    return () => clearInterval(interval);
  }, []);

  return (
      <main className="mainHome">
        <div className="headerHome">
          <h1>{currentDate}</h1>
          <h1>{currentTime}</h1>
        </div>

        <div className="contentBoxHome">
          <h2>Inside the residence</h2>
          <div className="sectionHome">
            <div className="blockHome firstBlockHome">Block 1</div>
            <div className="blockHome">Block 2</div>
            <div className="blockHome">Block 3</div>
            <div className="blockHome lastBlockHome">Block 4</div>
          </div>
          <div className="paragraphsContainer1Home">
            <p className="paragraphHome">chill</p>
            <p className="paragraphHome">2</p>
            <p className="paragraphHome">3</p>
            <p className="paragraphHome">4</p>
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
              <div className="blockHome topBlockHome">Block 1</div>
              <div className="blockHome topBlockHome">Block 2</div>
            </div>
            <div className="energyRowHome">
              <div className="blockHome bottomBlockHome">Block 3</div>
              <div className="blockHome bottomBlockHome">Block 4</div>
            </div>
          </div>
        </div>
      </main>
  );
};
