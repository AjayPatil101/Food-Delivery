import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Cart = () => {
    const { cartItems, food_list, removeToCart, getTotalCartAmount, Url, couponAmount, setCouponAmount, setCouponCode } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validCoupons, setValidCoupons] = useState([]);
    const [showCoupons, setShowCoupons] = useState(false);
    const [loading, setLoading] = useState(false);

    const deliveryCharge = getTotalCartAmount() ? 2 : 0;

    useEffect(() => {
        const fetchValidCoupons = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`${Url}/api/coupon/list/${userId}`);
                setValidCoupons(response.data.data || []);
            } catch (error) {
                console.error("Error fetching valid coupons:", error);
                setErrorMessage("Failed to load coupons. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchValidCoupons();
    }, [Url]);

    const handlePromoCodeSubmit = () => {
        const foundCoupon = validCoupons.find(coupon => coupon.couponCode === promoCode);

        if (foundCoupon) {
            setCouponAmount(foundCoupon.couponAmount);
            setCouponCode(foundCoupon.couponCode);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid Promo Code');
        }
    };

    const handleCouponSelect = (coupon) => {
        setPromoCode(coupon.couponCode);


        if (!deliveryCharge) {
            alert("No items available");
            setCouponAmount(0);
        } else {
            setCouponAmount(coupon.couponAmount);
        }

        setErrorMessage('');
        setShowCoupons(false);
        setCouponCode(coupon.couponCode);
    };


    const handleCheckout = () => {
        navigate('/order');
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />

                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div className="cart-items-title cart-items-item" key={item._id}>
                                <img src={`${Url}/image/${item.image}`} alt={item.name} />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                                <p onClick={() => removeToCart(item._id)} className='cross'>x</p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${deliveryCharge}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>${couponAmount}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${(getTotalCartAmount() + deliveryCharge - couponAmount).toFixed(2)}</b>
                        </div>
                    </div>
                    <button onClick={handleCheckout} disabled={!deliveryCharge}>PROCEED TO CHECKOUT</button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder='Promo Code'
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button onClick={handlePromoCodeSubmit}>Submit</button>
                        </div>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>
                    <div className='button'>
                        <button onClick={() => setShowCoupons(!showCoupons)}>
                            {showCoupons ? 'Hide Coupons' : 'Show Coupons'}
                        </button>
                        <button onClick={() => setCouponAmount(0)}>
                            Clear Coupon
                        </button>
                        {showCoupons && (
                            <div className="coupon-list">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    validCoupons.map((coupon) => (
                                        <div
                                            key={coupon._id}
                                            className="coupon-item"
                                            onClick={() => handleCouponSelect(coupon)}
                                        >
                                            <div className="coupon-content">
                                                <div className="coupon-text">
                                                    <p>Code: {coupon.couponCode}</p>
                                                    <p>Amount: ${coupon.couponAmount}</p>
                                                </div>
                                                <div className="coupon-image">
                                                    <img src={assets.promoCodeImg} alt="Promo code" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
