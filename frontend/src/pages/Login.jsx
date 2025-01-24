import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext);

  const [currentstate, setCurrentstate] = useState('Login');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler= async (e) =>{
    e.preventDefault();

    try {

      if (currentstate === 'Sign Up') {
        
        const res = await axios.post(`${backendUrl}/api/user/register`,{name,email,password});

        // console.log(res.data);
        if (res.data.succes) {
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token)
          
        }else{
          toast.error(res.data.message);
        }
        
      }
      else{
        const res = await axios.post(`${backendUrl}/api/user/login`,{email,password});

        // console.log(res.data);

        if (res.data.succes) {
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token)
          
        }else{
          toast.error(res.data.message);
        }
        

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
      
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/');
      
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p  className='prata-regular text-3xl'>{currentstate}</p>
        <p className='border-none h-[1.5px] w-8 bg-gray-800'></p>
      </div>

      {currentstate === 'Login' ? '' : <input type="text" 
      onChange={(e)=> setName(e.target.value)} 
      value={name} 
      className='w-full px-3 py-2 border border-gray-800 ' 
      placeholder='Name' 
      required />}
      
      <input 
      type="email" 
      onChange={(e)=> setEmail(e.target.value)} 
      value={email} 
      className='w-full px-3 py-2 border border-gray-800 ' 
      placeholder='Email' 
      required />

      <input 
      onChange={(e)=> setPassword(e.target.value)} 
      value={password}
      type="password" 
      className='w-full px-3 py-2 border border-gray-800 ' 
      placeholder='password' 
      required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {
          currentstate === 'Login'
          ? <p onClick={()=> setCurrentstate('Sign Up')} className='cursor-pointer'>create Account</p>
          : <p onClick={()=> setCurrentstate('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white dark:bg-slate-600 px-8 py-2 mt-4 rounded'>{
      currentstate === "Login"
      ? 'Sign In'
      : 'Sign Up'
        }</button>
    </form>
  )
}

export default Login