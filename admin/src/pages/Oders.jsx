import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import assets from '../assets/assets';
const Oders = ({ token }) => {
  const [orders, setOrders] = useState([]);


  const fetchAllOrder = async () => {
    if (!token) {
      return null
    }


    try {
      const res = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });

      console.log(res.data);

      if (res.data.success) {
        setOrders(res.data.orders.reverse())

      } else {

        toast.error(res.data.message)

      }

    } catch (error) {
      console.log(error);
      toast.error(res.data.message)

    }
  }


  const statusHandler = async (event,orderId) =>{
    try {
      const res = await axios.post(`${backendUrl}/api/order/status`,{orderId,status:event.target.value},{headers:{token}});

      if (res.data.success) {
        await fetchAllOrder()
        
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, [])

  return (
    <div>
      <h3 className='text-white font-bold text-[24px] justify-center flex mt-5'>Order Page</h3>

      <div>
        {
          orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs  sm:text-sm text-gray-700 dark:text-gray-100'>

              <img src={assets.parcel_icon} alt="" className='w-12 object-contain' />

              <div>

                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {

                      return <p className='py-0.5' key={index}> {item.name} X {item.quantity} <span>{item.size}</span></p>
                    } else {

                      return <p  className='py-0.5' key={index}> {item.name} X {item.quantity} <span>{item.size}</span>,</p>

                    }
                  })}

                </div>


                <p className='mt-3 mb-2 font-medium'>
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p> {order.address.street + ","}</p>
                  <p> {
                    order.address.city
                    + ", " +
                    order.address.state
                    + ", " +
                    order.address.country
                    + ", " +
                    order.address.zipcode
                  }</p>

                </div>
                <p>{order.address.phone}</p>
              </div>


              <div>

                <p className='text-sm sm:text-[16px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>payment : {order.payment ? "Done" : 'Panding'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>

              </div>


              <p className='text-sm sm:text-[16px]'>
                {currency}{order.amount}
              </p>


              <select 
              onChange={((event)=> statusHandler(event,order._id))}
              className='p-2 font-semibold  text-black' value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing"> Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="success">succes</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Oders