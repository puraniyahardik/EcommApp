import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
const Navbar = () => {

  const { setShowsearch, getCartCount, isDarkMode, setIsDarkMode, token, setToken, setCartItem, navigate,visible, setVisible } = useContext(ShopContext);


  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
  }

  return (
    <div className=' flex items-center justify-between
    py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-36 rounded dark:invert' alt="" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center   gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none bg-gray-700 h-[1.5px]  hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center   gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none bg-gray-700 h-[1.5px] hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center   gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none bg-gray-700 h-[1.5px] hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center   gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none bg-gray-700 h-[1.5px] hidden' />
        </NavLink>
      </ul>




      <div className="flex  items-center gap-6 justify-center">


        <img onClick={() => setIsDarkMode(!isDarkMode)}
          className='cursor-pointer' src={assets.darkTheme} alt="" />


        <img src={assets.search_icon} onClick={() => setShowsearch(true)} className='w-5 cursor-pointer' alt="" />


        {/* <div className="group relative">

         <Link to='/login'>  <img src={assets.profile_icon} className='w-5 cursor-pointer  relative z-20'  alt="" srcset="" /></Link>


            <div className="group-hover:block hidden absolute  dropdown-menu ring-0 pt-4">

              <div className='flex justify-center items-center flex-col gap-2 py-3 w-36 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black '>My Profile</p>
                    <p  className='cursor-pointer hover:text-black'>Orders</p>
                    <p  onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

              </div>
            </div>
        </div> */}


        <div className="group relative">

          <img
            onClick={() => token ? null : navigate('/login')}
            src={ assets.profile_icon}
            className="w-5 cursor-pointer  z-20"
            alt="Profile Icon"
          />


          {/* dropdown */}
          {
            token ?
              <div className="hidden group-hover:block absolute dropdown-menu pt-4 z-10">
                <div className="flex flex-col items-center gap-2 py-3 w-36 bg-slate-100 text-gray-500 rounded shadow-lg">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">
                    Logout
                  </p>
                </div>
              </div> : null
          }


        </div>


        <Link to='/cart' className='relative' >
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px]  bottom-[-5px]  w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            
            {getCartCount()}
            {/* {
              typeof getCartCount() === 'object' ? JSON.stringify(getCartCount()) : getCartCount()
            } */}
            </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='cursor-pointer w-7  sm:hidden' alt="" />

      </div>
      {/* {sideber menu for small screen} */}
      <div className={`absolute top-0 ring-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-black  dark:bg-black min-h-screen dark:text-fuchsia-50  ">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img src={assets.dropdown_icon} className='h-4 rotate-180 cursor-pointer' alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>ABOUT</NavLink>
          {
            token ? 
            <NavLink 
              onClick={() => setVisible(false)} className="py-2 pl-6 border"   to="/logout"><p className='cursor-pointer' onClick={logout}>LOGOUT</p></NavLink> : 
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border"   to="/login">Login</NavLink>
          }

          


        </div>
      </div>

    </div>
  )
}

export default Navbar