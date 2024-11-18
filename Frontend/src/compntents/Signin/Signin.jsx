import React, { useContext, useState } from 'react';
import './Signin.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Signin = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { Url, setToken, setRole } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Handle input changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Toggle between login and signup views
    const toggleView = () => {
        setCurrState((prevState) => (prevState === "Login" ? "Register" : "Login"));
    };

    // Handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();
        let apiUrl = `${Url}/api/user/${currState === "Login" ? "login" : "register"}`;
        try {
            const response = await axios.post(apiUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                setRole("user");
                setShowLogin(false);
                window.location.reload();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login/register:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className={`container ${currState === "Register" ? "active" : ""}`} id="container">
            {/* Sign Up Form */}
            <div className="form-container sign-up">
                <form onSubmit={onSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" name="name" value={data.name} onChange={onChangeHandler} />
                    <input type="email" placeholder="Email" name="email" value={data.email} onChange={onChangeHandler} />
                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={onChangeHandler} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="form-container sign-in">
                <form onSubmit={onSubmit}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for login</span>
                    <input type="email" placeholder="Email" name="email" value={data.email} onChange={onChangeHandler} />
                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={onChangeHandler} />
                    <a href="#">Forgot Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            {/* Toggle Panel */}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to sign in and access the site.</p>
                        <button className="hidden" onClick={toggleView}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to create an account.</p>
                        <button className="hidden" onClick={toggleView}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
