import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
const VerifyPayment = () => {

    const { navigate, token, setCartItem,backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();


    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPaymentData = async () =>{

        try {
            if (!token) {
                return null
                
            }
            const res = await axios.post(`${backendUrl}/api/order/verifyStripe`,{success,orderId},{headers:{token}});


            if (res.data.success) {
                setCartItem({});
                navigate('/orders');
                
            }else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }

    }

    useEffect(()=>{
        verifyPaymentData();
    },[token])

    return (
        <div>

        </div>
    )
}

export default VerifyPayment