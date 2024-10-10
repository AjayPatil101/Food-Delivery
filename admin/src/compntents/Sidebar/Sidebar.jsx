import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-opitions">
            <NavLink to="/" className="sidebar-opition">
                    <img src={assets.Dashboard} alt="" />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to="/user" className="sidebar-opition">
                    <img src={assets.User} alt="" />
                    <p>User</p>
                </NavLink>
                <NavLink to="/add" className="sidebar-opition">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink  to="/list" className="sidebar-opition">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-opition">
                    <img src={assets.order} alt="" />
                    <p>Order</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
