import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);
import axios from 'axios'
// import { food_list } from "../assets/assets";
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const Url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            const response = await axios.post(`${Url}/api/cart/add`, { itemId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    };

    const removeToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            const response = await axios.post(`${Url}/api/cart/remove`, { itemId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    }
    const loadCartData = async (token) => {
        const response = await axios.post(`${Url}/api/cart/fetch`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCartItems(response.data.cartData)
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((prod) => prod._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const foodItemList = async () => {
        const response = await axios.get(Url + "/api/food/list");
        setFoodList(response.data.data)
    }

    useEffect(() => {
        async function loadData() {
            await foodItemList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        Url,
        token, setToken
    }
    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;