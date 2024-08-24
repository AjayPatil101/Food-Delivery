import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { Url ,token} = useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(`${Url}/api/order/verify`, { success, orderId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);

        if (response.data.success) {
            navigate("/myorders")
        }
        else {
            navigate("/")
        }
    }
    useEffect(() => { verifyPayment() }, [])
    return (
        <div className='verify'>
            <div className="spinner"></div>
            {/* <p>{success}</p>
      <p>{orderId}</p> */}
        </div>
    )
}

export default Verify
