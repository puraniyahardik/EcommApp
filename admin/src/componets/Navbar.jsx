import React, { useContext } from 'react'
import assets from '../assets/assets'
import { ShopContext } from '../context/Theme'

const Navbar = ({setToken}) => {
  const {setIsDarkMode,isDarkMode} = useContext(ShopContext);
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)] invert-0 dark:invert' src={assets.logo} alt="" />
        <div className='flex gap-4'>
        <img src={assets.darkTheme} onClick={()=> setIsDarkMode(!isDarkMode)} className='cursor-pointer  invert-0 dark:invert' alt="" />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' onClick={()=> setToken('')}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar