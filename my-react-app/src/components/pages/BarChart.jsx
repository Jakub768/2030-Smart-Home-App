import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary components from Chart.js

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ consumptionData }) => {
  // Extract data for chart
  const labels = Object.keys(consumptionData); // Time intervals as the labels for the chart
  
  // The data for each time period
  const data = labels.map(timePeriod => {
    return parseFloat(consumptionData[timePeriod][0][0]); // The consumption data for each time period
  });

  // To debug, log the original labels and data
  console.log("Original Labels:", labels);
  console.log("Original Data:", data);

  // Ensure data is sorted to match the intended display order
  const correctOrder = [
    "12am to 6am", 
    "6am to 12pm", 
    "12pm to 4pm", 
    "4pm to 8pm", 
    "8pm to 12am"
  ];

  // Sort labels and data to match the correct order
  const sortedLabels = correctOrder;
  const sortedData = correctOrder.map(timePeriod => {
    const index = labels.indexOf(timePeriod);
    return data[index];
  });

  // Prepare chart data
  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        data: sortedData,
        backgroundColor: 'rgba(128, 128, 128, 1)', // Solid grey color for bars
        borderRadius: 0, // Optionally, add rounded corners to the bars
        borderColor: 'rgba(128, 128, 128, 1)', // Border color (same as background)
        borderWidth: 1, // Add a border width to make the bars more defined
      },
    ],
  };

  // Prepare chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          // Add 'kWh' to the tooltip value
          label: function(tooltipItem) {
            return tooltipItem.raw + ' kWh'; // Add 'kWh' to the tooltip value
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        title: {
          display: true, // Ensure title is displayed
          text: 'Energy Consumption (kWh)', // Set the title for the y-axis
          color: 'white', // Set color of the y-axis title
          size: 14, // Adjust font size if needed
          family: 'Arial', // Adjust font family if needed
        },
        grid: {
          display: false, // Hide the grid lines on the y-axis
        },
        ticks: {
          color: 'white', // Set the color of the y-axis ticks
        },
      },
    },
  };

  return (
    <div className="barChartWrapper">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
