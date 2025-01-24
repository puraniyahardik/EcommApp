import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {
        showsearch,
        search,
        setShowsearch,
        setsearch} = useContext(ShopContext);
        const location = useLocation();
        const [visible, setVisible] = useState(false);
      
  useEffect(()=>{
    if (location.pathname.includes('collection')) {
      setVisible(true);
    }
    else{
        setVisible(false);
    }
    
  },[location])

  return showsearch && visible ?  (
    <div className='border-t border-b bg-gray-100 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:h-1/2 dark:rounded-2xl text-black'>

            <input value={search} type="text" onChange={(e)=>setsearch(e.target.value)} className='outline-none bg-inherit text-sm flex-1' placeholder='Search' />
            <img src={assets.search_icon} className='w-4' alt="" />

        </div>
        <img onClick={()=>setShowsearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt=""  />
    </div>
  ) : null
}

export default SearchBar