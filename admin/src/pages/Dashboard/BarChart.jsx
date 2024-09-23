// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const LineChart = () => {
//   const data = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 'June', 
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ],
//     datasets: [
//       {
//         label: 'Sales for 2023 (in USD)',
//         data: [500, 2500, 3200, 2800, 2900, 3500, 3700, 4000, 4200, 3900, 4100, 4300], 
//         backgroundColor: 'rgba(255, 99, 71, 0.5)', 
//         borderColor: 'rgb(255, 99, 71)', // Tomato color for the line
//         borderWidth: 2,
//         fill: true, // Fills the area under the line
//         tension: 0.4, // Smoothing for the line
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Sales Data',
//       },
//     },
//   };

//   return (
//     // <div className="chart-container"> {/* Optional: for layout or styling */}
//       <Line data={data} options={options} />
//     // </div>
//   );
// };

// export default LineChart;

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ Url }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${Url}/api/order/getCategory`);
        const apiResponse = response.data;

        if (apiResponse.success) {
          const labels = apiResponse.categorySales.map(category => category._id);
          const totalSales = apiResponse.categorySales.map(category => category.totalSales);
          const totalQuantity = apiResponse.categorySales.map(category => category.totalQuantity);

          setChartData({
            labels, // Category names
            datasets: [
              {
                label: 'Total Sales per Category (in USD)',
                data: totalSales, // Total sales
                backgroundColor: 'rgba(75, 192, 192, 0.6)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Total Quantity per Category',
                data: totalQuantity, // Total quantities
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError('Failed to load category data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [Url]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Category-wise Sales and Quantity',
      },
      legend: {
        display: true, 
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {chartData ? <Bar data={chartData} options={options} /> : <div>No data available</div>}
    </>
  );
};

export default BarChart;



