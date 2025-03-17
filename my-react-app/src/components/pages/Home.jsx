import React, { useState, useEffect } from "react";
import './Home.css'; // Import the CSS file
import brokenClouds from '../images/brokenClouds.png';
import clearSky from '../images/clearSky.png';
import fewClouds from '../images/fewClouds.png';
import mist from '../images/mist.png';
import rain from '../images/rain.png';
import scatteredClouds from '../images/scatteredClouds.png';
import showerRain from '../images/showerRain.png';
import snow from '../images/snow.png';
import thunderstorm from '../images/thunderstorm.png';
import './Loading.css';


export const Home = () => {
  const [currentDate, setCurrentDate] = useState(""); // current date const
  const [currentTime, setCurrentTime] = useState(""); // current time const
  const [lastMonth, setLastMonth] = useState(""); // state for last month's name
  const [temperature, setTemperature] = useState(() => {
    // Check if a temperature is stored in localStorage
    const storedTemp = localStorage.getItem("temperature");
    return storedTemp ? parseFloat(storedTemp) : 20; // Default to 20 if no stored temperature
  });
  const [humidity, setHumidity] = useState(() => {
    // Check if a temperature is stored in localStorage
    const storedHum = localStorage.getItem("humidity");
    return storedHum ? parseFloat(storedHum) : 20; // Default to 20 if no stored temperature
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
      const newTemp = Math.min(prevTemp + 0.5, 30);
      localStorage.setItem("temperature", newTemp);
      return newTemp;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp - 0.5, 16);
      localStorage.setItem("temperature", newTemp);
      return newTemp;
    });
  };

  const increaseHumidity= () => {
    setHumidity((prevTemp) => {
      const newHum = Math.min(prevTemp + 5, 100);
      localStorage.setItem("humidity", newHum);
      return newHum;
    });
  };

  const decreaseHumidity = () => {
    setHumidity((prevTemp) => {
      const newHum = Math.max(prevTemp - 5, 0);
      localStorage.setItem("humidity", newHum);
      return newHum;
    });
  };

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/home')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    const LoadingSpinner = () => {
      return (
        <main className="mainHome">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        </main>
      );
    };
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Weather icon mapping
  const weatherIconMap = {
    brokenclouds: brokenClouds,
    clearsky: clearSky,
    fewclouds: fewClouds,
    mist: mist,
    rain: rain,
    scatteredclouds: scatteredClouds,
    showerain: showerRain,
    snow: snow,
    thunderstorm: thunderstorm,
  };

  // Get weather description
  let weatherDescription = data.Outside_The_Residence.Weather_Description.toLowerCase();

  // Remove spaces (if needed)
  weatherDescription = weatherDescription.replace(/\s+/g, ''); // Remove all spaces

  // Get the weather icon based on description
  const weatherIcon = weatherIconMap[weatherDescription];

  const capitalizeWords = (str) => {
    return str
      .split(" ")           // Split the string into an array of words
      .map(word =>          // For each word in the array
        word.charAt(0).toUpperCase() + word.slice(1)  // Capitalize the first letter and add the rest of the word
      )
      .join(" ");          // Join the words back into a single string with spaces
  };

  // Capitalize the weather description
  const formattedWeatherDescription = capitalizeWords(data.Outside_The_Residence.Weather_Description);

  const temperatureLabel = (temp) => {
    if (temp <= 18) {
      return "Cold";
    } else if (temp > 18 && temp <= 22) {
      return "Comfortable";
    } else if (temp > 22 && temp <= 28) {
      return "Warm";
    } else {
      return "Hot";
    }
  };

  const humidityLabel = (humidity) => {
    if (humidity <= 30) {
      return "Very Low Humidity";
    } else if (humidity > 30 && humidity <= 40) {
      return "Low Humidity";
    } else if (humidity > 40 && humidity <= 50) {
      return "Comfortable Humidity";
    } else if (humidity > 50 && humidity <= 60) {
      return "Moderate Humidity";
    } else if (humidity > 60 && humidity <= 70) {
      return "High Humidity";
    } else if (humidity > 70 && humidity <= 80) {
      return "Very High Humidity";
    } else {
      return "Extreme Humidity";
    }
  };

  const windSpeedLabel = (windSp) => {
    if (windSp <= 1) {
      return "Calm";
    } else if (windSp > 1 && windSp <= 3) {
      return "Light Air";
    } else if (windSp > 4 && windSp <= 7) {
      return "Light Breeze";
    } else if (windSp > 8 && windSp <= 12) {
      return "Gentle Breeze";
    } else if (windSp > 13 && windSp <= 18) {
      return "Moderate Breeze";
    } else if (windSp > 19 && windSp <= 24) {
      return "Fresh Breeze";
    } else if (windSp > 25 && windSp <= 31) {
      return "Strong Breeze";
    } else if (windSp > 32 && windSp <= 38) {
      return "Near Gale";
    } else if (windSp > 39 && windSp <= 46) {
      return "Gale";
    } else if (windSp > 47 && windSp <= 54) {
      return "Strong Gale";
    } else if (windSp > 55 && windSp <= 63) {
      return "Storm";
    } else if (windSp > 64 && windSp <= 72) {
      return "Violent Storm";
    } else {
      return "Hurricane";
    }
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
            <button className="plus" onClick={increaseTemperature}>+</button>
          </div>
          <div className="blockHome">
            <button className="minus" onClick={decreaseHumidity}>-</button>
            {humidity}%
            <button className="plus" onClick={increaseHumidity}>+</button>
          </div>
          <div className="blockHome">{data.Inside_The_Residence.Devices_Active}</div>
          <div className="blockHome lastBlockHome">{data.Inside_The_Residence.Rooms_Occupied}</div>
        </div>
        <div className="paragraphsContainer1Home">
          <p className="paragraphHome">{temperatureLabel(temperature)}</p>
          <p className="paragraphHome">{humidityLabel(humidity)}</p>
          <p className="paragraphHome">Devices Active</p>
          <p className="paragraphHome">Occupied Rooms</p>
        </div>

        <h2>Outside the residence</h2>
        <div className="sectionHome">
          <div className="blockHome firstBlockHome"><img src={weatherIcon} alt={data.Outside_The_Residence.Weather_Description}/></div>
          <div className="blockHome">{data.Outside_The_Residence.Temperature}°C</div>
          <div className="blockHome">{data.Outside_The_Residence.Humidity}%</div>
          <div className="blockHome lastBlockHome">{data.Outside_The_Residence.Wind_Speed} mph</div>
        </div>
        <div className="paragraphsContainer2Home">
          <p className="paragraphHome">{formattedWeatherDescription}</p>
          <p className="paragraphHome">{temperatureLabel(data.Outside_The_Residence.Temperature)}</p>
          <p className="paragraphHome">{humidityLabel(data.Outside_The_Residence.Humidity)}</p>
          <p className="paragraphHome">{windSpeedLabel(data.Outside_The_Residence.Wind_Speed)}</p>
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
