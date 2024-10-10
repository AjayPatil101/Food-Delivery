import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className='navbar'>
      <img className="logo" src={assets.logo} alt="Logo" />
      
      <div 
        className="navbar-profile"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img className="profile" src={assets.profile} alt="Profile" />
        
        {dropdownVisible && (
          <ul className="navbar-profile-dropdown">
            <li onClick={() => { window.location.href = "https://leafy-baklava-be205c.netlify.app"; }}><img src={assets.Dashboard} alt="" /> Back To User</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
