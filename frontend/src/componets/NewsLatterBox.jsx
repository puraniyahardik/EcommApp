import React from 'react'

const NewsLatterBox = () => {
    const onSubmitHandler= (e) =>{
        e.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl pb-4 font-medium'>Subscribe now & Get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos natus!</p>
        <form action="" onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex gap-4 mx-auto my-6 border pl-3 dark:bg-slate-100'>
            <input type="email" className='w-full  sm:flex-1 outline-none' placeholder='Enter you email' required/>
            <button type='submit' className=' text-white text-xs px-8 py-2 rounded-lg bg-black '>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLatterBox