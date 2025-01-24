import React, { useContext, useEffect, useState } from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './componets/Navbar'
import { assets } from './assets/assets'
import Footer from './componets/Footer'
import SearchBar from './componets/SearchBar'
import {ToastContainer,toast} from 'react-toastify'
import { ShopContext } from './context/ShopContext'
import VerifyPayment from './pages/VerifyPayment'


const App = () => {
  
 const {isDarkMode,setIsDarkMode} = useContext(ShopContext);
//  console.log(is);
 
  return ( 
    <div className={isDarkMode ? 'dark' : ''}>
       <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen ">
     
         
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />    
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<VerifyPayment />} />

      </Routes>
      <Footer />
     
      </div>
    </div>
    </div>
  )
}

export default App
