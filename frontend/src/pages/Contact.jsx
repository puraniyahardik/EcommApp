import React from 'react'
import Title from '../componets/Title'
import { assets } from '../assets/assets'
import NewsLatterBox from '../componets/NewsLatterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 '>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
         <p className='font-semibold text-xl to-gray-600'>Our Store</p>
         <p className='text-gray-500'>27812 amroli  stage <br /> surat,gujarat</p>
         <p  className='text-gray-500'>Tel: (416) 555-65554 <br /> Email: admin@gmail.com</p>
         <p className='font-semibold text-xl text-gray-600'>Carrers at Forever</p>
         <p className='text-gray-500'>Learn more term and job openings</p>
         <p className='text-red-400 text-2xl'>Help.....! Forever</p>
         <button className='border border-black px-8 py-4 text-sm hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all duration-500 dark:border-white'>Explore Jobs</button>

        </div>

      </div>
      <NewsLatterBox />
    </div>
  )
}

export default Contact