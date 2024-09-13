import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const userId = localStorage.getItem('userId');
    const { Url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const couponCode = localStorage.getItem('couponCode'); // Fix here

    console.log(couponCode);

    const verifyPayment = async () => {
        try {
            const response = await axios.post(
                `${Url}/api/order/verify`, 
                { success, orderId, userId, couponCode }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response);

            localStorage.removeItem("couponCode")
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); 
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]); // Add verifyPayment to the dependency array if it changes

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
