import React from 'react'
import './User.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../../../Frontend/src/assets/assets'

const User = ({ Url }) => {
  const [User, setUser] = useState([]);
  const fetchUserAll = async () => {
    try {
      const response = await axios.get(`${Url}/api/user/getUser`);
      setUser(response.data.data);
      console.log(response.data.data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const statusHandler = async(event,userId)=>{
    try {
      console.log(userId);
      
      const response = await axios.post(`${Url}/api/user/role`,{userId,role:event.target.value});
      if(response.data.success){
        await fetchUserAll();
      }
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  }

  useEffect(() => {
    fetchUserAll();
  }, [])

  return (
    <div className='order add'>
      <h3>User Page</h3>
      <div className="order-lists">
        {User.map((user, index) => (
          <div key={index} className="order-items">
            <img src={assets.profile} alt="Parcel Icon" />
            <div>
              <p className="order-item-name">{user.name}</p>
              <div className="order-item-email">
                <p>{user.email}</p>
              </div>
            </div>
            <select onChange={(event) => statusHandler(event, user._id)} value={user.role}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default User;
