import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../../../Frontend/src/assets/assets'

const Orders = ({ Url }) => {
  const [orders, setOrders] = useState([]);
  const [data,setData]=useState([]);
  const fetchOrderAll = async () => {
    try {
      const response = await axios.get(`${Url}/api/order/list`);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const statusHandler = async(event,orderId)=>{
    try {
      const response = await axios.post(`${Url}/api/order/status`,{orderId,status:event.target.value});
      if(response.data.success){
        await fetchOrderAll();
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchOrderAll();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-lists">
        {orders.map((order, index) => (
          <div key={index} className="order-items">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => {
                  return (
                    item.name + " X " + item.quantity + (itemIndex !== order.items.length - 1 ? ", " : "")
                  );
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+ " "+ order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode }</p>
              </div>
                <p  className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}.00</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Food PickUp">Food PickUp</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
