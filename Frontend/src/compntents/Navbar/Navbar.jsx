import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { role, setRole, getTotalCartAmount, adminUrl, token, setToken,Url} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("orderId");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setToken("");
        navigate("/");
        window.location.reload();
    }
    const setRoles = async () => {
        const userId = localStorage.getItem("userId");
        
        // Ensure userId is valid
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }
        console.log(userId);
        
        try {
            const response = await axios.get(`${Url}/api/user/role/${userId}`);
            console.log(response);
    
            if (response.data.success) {
                setRole(response.data.data.role);
                console.log(role, response.data.data.role);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user role:', error.message);
            if (error.response && error.response.status === 404) {
                alert('User role not found. Please contact support.');
            } else {
                alert('Failed to fetch user role. Please try again later.');
            }
        }
    };
    

    useEffect(() => {
        console.log(token);
        if (token) setRoles();
    }, [token]); // No need to include setRoles in the dependency array

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
            <ul className="navbar-menu">
                <Link onClick={() => setMenu('home')} to="/" className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt='' />
                <div className="navbar-search-icon">
                    <Link to={token ? "/cart" : "/"}><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() && token ? "dot" : ""}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className='navber-profile'>
                        <img src={assets.profile_icon} alt='' />
                        <ul className="navber-profile-dropdown">
                        {role === "admin" && (
                                <li onClick={() => navigate(adminUrl)}>
                                    <img src={assets.profile} className='admin' alt="Admin" />
                                    <p>Admin</p>
                                </li>
                            )}
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar;
