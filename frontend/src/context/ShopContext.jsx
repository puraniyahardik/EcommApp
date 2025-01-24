import { createContext, useEffect, useState } from "react";
// import {products} from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const currency = '$';
    const dilivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('');
    const [showsearch, setShowsearch] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [token, setToken] = useState('')
    const [products, setProducts] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();



    const AddToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product size');
            return;
        }
        //clone of cartitem{} obj clone
        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] = cartData[itemId][size] + 1;

            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } })

            } catch (error) {

                console.log(error);
                toast.error(error);


            }

        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.error("Error processing cartItem:", error);

                }

            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error);

            }

        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount = totalAmount + itemInfo.price * cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }



    const getProductData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);

            if (res.data.succes) {
                setProducts(res.data.products)

            } else {
                toast.error(res.data.message)
            }

            // console.log(res.data);


        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    };

    const getUserCart = async (token) => {
        try {
            const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });

            if (res.data.succes) {
                setCartItem(res.data.cartData)

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }

    }, [])


    //dark theme 

    //stoare in dark local send
    useEffect(() => {
        localStorage.setItem('dark', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        const dark = localStorage.getItem('dark');
        dark ? setIsDarkMode(dark) : setIsDarkMode(false);
    }, [])


    const value = {
        products,
        currency,
        dilivery_fee,
        showsearch,
        search,
        setShowsearch,
        setsearch,
        cartItem,
        AddToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        isDarkMode,
        setIsDarkMode,
        backendUrl,
        setProducts,
        token,
        setToken,
        setCartItem

    }

    // useEffect(()=>{
    //     console.log(cartItem);


    // },[cartItem])

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;