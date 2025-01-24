import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSaller = () => {

    const { products } = useContext(ShopContext);
    const [bestSaller, setBestSaller] = useState([]);

    useEffect(() => {
        
        setBestSaller(products);
    }, [products])

    return (
        <div className='my-10'>
            <div className="py-8 text-center text-3xl">
                <Title text1={'BEST'} text2={'SALLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ab esse dolor omnis.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-8'>
                {
                    bestSaller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price} />
                    ))
                }

            </div>

        </div>
    )
}

export default BestSaller