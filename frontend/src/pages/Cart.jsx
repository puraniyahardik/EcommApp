import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../componets/Title';
import { assets } from '../assets/assets';
import CartTotal from '../componets/CartTotal';

const Cart = () => {
  const { products, currency, cartItem, updateQuantity,navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          })
        }
      }
      setCartData(tempData);
    }
    
  }
  }, [cartItem,products])

  return (
    <div className='border-t pt-24'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div className='py-4 border-t border-b text-gray-700  grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[[4fr_2fr_0.5fr] items-center gap-4' key={index}>

                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                  <div>

                    <p className='font-medium text-xs sm:text-lg'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-100 dark:bg-slate-600 text-purple-950'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input onChange={(e)=>
                   e.target.value === '' || e.target.value === '0' 
                   ?
                    null : 
                   updateQuantity(item._id,item.size,Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />

                {/* for deleteting order..... */}
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt="" className='w-4 mr-4 sm:mr-6 cursor-pointer ' />
              </div>
            )
          })
        }

      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className='w-full text-end pt-2'>
            <button onClick={()=> navigate('/place-order')} className='bg-slate-400 py-2 px-2 rounded-sm text-sm'>PROCEED TO CHECKOUT</button> 

          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart