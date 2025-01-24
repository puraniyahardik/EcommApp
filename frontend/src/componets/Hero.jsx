import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
     return (
  
    <div className='flex bg-white dark:bg-black text-black dark:text-white flex-col sm:flex-row border border-gray-400  '>
        {/* {heror Left side} */}

        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0" >
            <div className='text-[#414141]'>
                <div className="flex items-center gap-2">
                    <p className='w-8 md:w-11 bg-[#414141] h-[2px] '></p>
                    <p className='font-medium text-sm md:text-base'>OUR BESTSALLERS</p>
                </div>
                <h1 className='poppins-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed '>Latest Arrivals</h1>
                <div className="flex items-center gap-2">
                    <p className='font-semibold text-sm  md:text-base'>Shop Now</p>
                    <p className='w-8 md:w-11 bg-[#414141] h-[1px]'> </p>
                </div>

        </div>
    </div>
    {/* heror img side */}
    <img src={assets.hero_img1} className='w-full sm:w-1/2 object-contain' alt="" />
    </div>
  )
}

export default Hero