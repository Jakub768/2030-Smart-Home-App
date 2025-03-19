import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary components from Chart.js

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const BarChart = ({ consumptionData }) => {
  // Extract data for chart
  const labels = Object.keys(consumptionData); // Time intervals as the labels for the chart
  const data = labels.map(timePeriod => {
    return parseFloat(consumptionData[timePeriod][0][0]); // The consumption data for each time period
  });

  // Prepare chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(128, 128, 128, 1)', // Solid grey color for bars
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
          display: false,
        },
        ticks: {
          color: 'white', // Set x-axis ticks color to white
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
