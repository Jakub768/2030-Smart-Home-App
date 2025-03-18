import React from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import Chart.js elements

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieData }) => {
  // Prepare the data for the pie chart
  const chartData = {
    labels: pieData?.devices?.map((device) => device[1]) || [], // Labels: Device names (e.g., "Kitchen", "Light")
    datasets: [
      {
        data: pieData?.devices?.map((device) => parseFloat(device[2])) || [], // Data: Energy consumed values (e.g., "0.00", "3.00")
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize the color of each segment
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Hover color
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow chart to resize based on container dimensions
    plugins: {
      legend: {
        position: "top", // Position the legend at the top
      },
    },
  };

  return (
    <div className="pieChartWrapper">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
