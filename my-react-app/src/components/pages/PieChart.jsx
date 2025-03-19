import React from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import Chart.js elements

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieData }) => {
  // Function to generate an array of grey shades based on the number of segments
  const generateGreyScaleColors = (num) => {
    const greyShades = [];
    for (let i = 0; i < num; i++) {
      // Generate a grey shade by varying the brightness
      const greyValue = Math.floor(255 - (i * (255 / num)));
      greyShades.push(`rgb(${greyValue}, ${greyValue}, ${greyValue})`);
    }
    return greyShades;
  };

  // Prepare the data for the pie chart
  const chartData = {
    labels: pieData?.devices?.map((device) => device[1]) || [], // Labels: Device names (e.g., "Kitchen", "Light")
    datasets: [
      {
        data: pieData?.devices?.map((device) => parseFloat(device[2])) || [], // Data: Energy consumed values (e.g., "0.00", "3.00")
        backgroundColor: generateGreyScaleColors(pieData?.devices?.length || 3), // Dynamically generate grey colors based on the number of segments
        hoverBackgroundColor: generateGreyScaleColors(pieData?.devices?.length || 3), // Same color on hover
        borderWidth: 0, // No border outline
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow chart to resize based on container dimensions
    plugins: {
      legend: {
        display: false, // Hide the legend if you want the labels to be above the chart
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} kWh`, // Customize tooltip
        },
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
