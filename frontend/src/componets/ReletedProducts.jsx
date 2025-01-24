import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const ReletedProducts = ({category,subCategory}) => {

    const {products} = useContext(ShopContext);
    const [releted, setReleted] = useState([]);

    useEffect(()=>{
        if (products.length > 0 ) {
            let pCopy = products.slice();
            pCopy = pCopy.filter((item)=> category === item.category);
            pCopy = pCopy.filter((item)=> subCategory === item.subCategory);

            // console.log(pCopy.slice(0,5));
            setReleted(pCopy.slice(0,5))
            
        }
    },[products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={"RELETED"} text2={'PRODUCTS'}/>

        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {releted.map((item,index)=>(
                <ProductItem 
                key={index} 
                id={item._id} 
                name={item.name} 
                price={item.price} 
                image={item.image}/>
            ))}

        </div>
    </div>
  )
}

export default ReletedProducts