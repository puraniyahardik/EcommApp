import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);

      if (res.data.succes) {

        setList(res.data.products);
      }
      else {
        toast.error(res.data.message)
      }

      // console.log(res);


    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error(error.message)
    }
  }

  //remove product 
  const removeproduct = async (id) => {
    try {
      const res = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });

      if (res.data.succes) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message)
      }


    } catch (error) {
      console.error('Error Deleting product:', error);
      toast.error(error.message)
    }
  }










  useEffect(() => {
    fetchList()
  }, [])
  return (
    < >
      <p className='mb-2 dark:text-white'>All Products List</p>

      <div className='flex flex-col gap-2'>
        {/* ---list table title--- */}
        <div className=" hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 dark:bg-gray-200 rounded-xl text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------Product List ------- */}
        {
          list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 border text-sm dark:text-white'
            >
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p
              onClick={()=> removeproduct(item._id)} 
              className='text-right  md:text-center cursor-pointer text-lg'>X</p>

            </div>
          ))
        }
      </div>

    </>
  )
}

export default List