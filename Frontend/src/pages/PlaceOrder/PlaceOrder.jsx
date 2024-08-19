import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext)
    const deliverycharge = getTotalCartAmount() ? 2 : 0;
    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="email" placeholder='Enter Email' />
                <input type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input type="text" placeholder='City' />
                    <input type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder='Zip Code' />
                    <input type="text" placeholder='Country' />
                </div>
                <input type="text" placeholder='Phone' />
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
                        <b>Total</b>
                        <b>${getTotalCartAmount() + deliverycharge}</b>
                    </div>
                </div>
                <button >PROCEED TO PEYMANT</button>
            </div>
        </div>
    )
}

export default PlaceOrder
