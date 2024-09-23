import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import BarChart from './BarChart';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Dashboard = ({ Url }) => {
  const [topSale, setTopSale] = useState(null);
  const [bottomSale, setBottomSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch top and bottom sales data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${Url}/api/order/getCategory`);
        const apiResponse = response.data;

        if (apiResponse.success) {
          setTopSale(apiResponse.topSale);
          setBottomSale(apiResponse.bottomSale);
        } else {
          setError('Failed to load sales data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [Url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="left">
        <BarChart Url={Url} />
      </div>
      <div className="right">
        <div className="top-sale">
          <h2>Top Sale</h2>
          <img src={assets.up} alt="Up" />
          {topSale ? (
            <>
              <p><b>Product:</b> {topSale._id}</p>
              <p><b>Sales:</b> ${topSale.totalSales}</p>
              <p><b>Quantity Sold:</b> {topSale.totalQuantity}</p>
            </>
          ) : (
            <p>No top sale data available</p>
          )}
        </div>
        <div className="bottom-sale">
          <h2>Bottom Sale</h2>
          <img src={assets.down} alt="Down" />
          {bottomSale ? (
            <>
              <p><b>Product:</b> {bottomSale._id}</p>
              <p><b>Sales:</b> ${bottomSale.totalSales}</p>
              <p><b>Quantity Sold:</b> {bottomSale.totalQuantity}</p>
            </>
          ) : (
            <p>No bottom sale data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
