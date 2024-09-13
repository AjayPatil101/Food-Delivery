import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
    const { getTotalCartAmount, Url, token, food_list, cartItems, couponCode,  couponAmount } = useContext(StoreContext)
    const deliverycharge = getTotalCartAmount() ? 2 : 0;
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount === 0) {
            navigate('/cart')
        }
    }, [token])
    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            ...(couponCode && {
                couponCode: couponCode, 
                couponAmount: couponAmount
            })
        };
        localStorage.setItem("couponCode",couponCode)
        const response = await axios.post(`${Url}/api/order/place`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url)
        }
        else {
            alert("Error")
        }
    }

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder='First Name' required />
                    <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' required />
                </div>
                <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter Email' required />
                <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-fields">
                    <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-fields">
                    <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required />
                    <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
                </div>
                <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <h2>Cart Totals</h2>
                <div className='cart-total-detail'>
                    <div className="cart-total-details">
                        <p>SubTotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${deliverycharge}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Discount</p>
                        <p>${couponAmount}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount() + deliverycharge-couponAmount}</b>
                    </div>
                </div>
                <button type='submit' >PROCEED TO PEYMANT</button>
            </div>
        </form>
    )
}

export default PlaceOrder
