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

  // Chart options to hide axis labels, tooltips, and legends
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart can resize
    scales: {
      x: {
        display: false, // Hide the x-axis labels (time intervals)
      },
      y: {
        display: false, // Hide the y-axis labels (consumption values)
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable the tooltip
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
