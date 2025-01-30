import React, { useState } from 'react'
import assets from '../assets/assets'
import axios from 'axios';
import {backendUrl} from '../App'
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(
    'Men'
  );
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestsaller, setBestsaller] = useState('');


  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name',name);
      formData.append('description',description);
      formData.append('price',price);
      formData.append('category',category);
      formData.append('subCategory',subCategory);
      formData.append('bestsaller',bestsaller);
      // converted arr to string 
      formData.append('sizes',JSON.stringify(sizes));

      // images
      //using && is img1 available then image add all other img not include
      image1 && formData.append('image1',image1);
      image2 && formData.append('image2',image2);
      image3 && formData.append('image3',image3);
      image4 && formData.append('image4',image4);

      //provide token for adding product by admin token ......
      const res = await axios.post(backendUrl + '/api/product/add',formData,{headers:{token}});

      if (res.data.succes) {
        toast.success(res.data.message)
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setBestsaller('')
        
      }else{
        toast.error(res.data.message)
      }

      console.log(res.data);

    } catch (error) {
      console.log({error});
      
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <p className='mb-2 dark:text-white'>Upload Image</p>

      <div className='flex gap-3'>
        <label htmlFor="image1">
          <img className='w-20'
            src={!image1 ?
              assets.upload_area
              : URL.createObjectURL(image1)} alt="" />

          <input
            onChange={(e) => setImage1(e.target.files[0])}
            type="file"
            id='image1'
            hidden />
        </label>

        <label htmlFor="image2">
          <img className='w-20'
            src={!image2 ?
              assets.upload_area
              : URL.createObjectURL(image2)} alt="" />

          <input
            onChange={(e) => setImage2(e.target.files[0])}
            type="file"
            id='image2'
            hidden />
        </label>

        <label htmlFor="image3">
          <img className='w-20'
            src={!image3
              ? assets.upload_area
              : URL.createObjectURL(image3)} alt="" />
          <input
            onChange={(e) => setImage3(e.target.files[0])}
            type="file"
            id='image3'
            hidden />
        </label>

        <label htmlFor="image4">
          <img className='w-20'
            src={!image4
              ? assets.upload_area
              : URL.createObjectURL(image4)} alt="" />
          <input
            onChange={(e) => setImage4(e.target.files[0])}
            type="file"
            id='image4'
            hidden />
        </label>
      </div>

      <div className='w-full'>
        <p className='mb-2 dark:text-white'>Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full maxw-[500px] px-3 py-2'
          type="text"
          placeholder='Type here!'
          required />
      </div>

      <div className='w-full'>
        <p className='mb-2 dark:text-white'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full maxw-[500px] px-3 py-2'
          type="text"
          placeholder='write content here.....'
          required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className=' dark:text-white mb-2 text-nowrap'>Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className=' dark:text-white mb-2'>Sub category</p>
          <select
            onChange={(e) => { setSubCategory(e.target.value) }}
            className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className=' dark:text-white mb-2'>Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="Number"
            className='px-2 py-3 w-full sm:w-[120px]'
            placeholder='ex.123'
            required />
        </div>

      </div>

      <div>
        <p className='dark:text-white mb-2'>Product Sizes</p>
        <div className='flex gap-3 '>
          <div 
          onClick={(e)=> 
          setSizes(prev => 
          prev.includes("S") 
          ? prev.filter((item)=> item !== "S")
          : [...prev,'S'])}>
            <p className={`${sizes.includes("S") ? 'bg-pink-200' : 'bg-slate-300'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div 
          onClick={(e)=> 
          setSizes(prev => 
          prev.includes("M") 
          ? prev.filter((item)=> item !== "M")
          : [...prev,'M'])}>
            <p className={`${sizes.includes("M") ? 'bg-pink-200' : 'bg-slate-300'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div 
          onClick={(e)=> 
          setSizes(prev => 
          prev.includes("L") 
          ? prev.filter((item)=> item !== "L")
          : [...prev,'L'])}>
            <p className={`${sizes.includes("L") ? 'bg-pink-200' : 'bg-slate-300'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div 
          onClick={(e)=> 
          setSizes(prev => 
          prev.includes("XL") 
          ? prev.filter((item)=> item !== "XL")
          : [...prev,'XL'])}>
            <p className={`${sizes.includes("XL") ? 'bg-pink-200' : 'bg-slate-300'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div 
          onClick={(e)=> 
          setSizes(prev => 
          prev.includes("XXL") 
          ? prev.filter((item)=> item !== "XXL")
          : [...prev,'XXL'])}>
            <p className={`${sizes.includes("XXL") ? 'bg-pink-200' : 'bg-slate-300'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>

        </div>
      </div>


      <div className='gap-2 mt-2 flex'>
        {/* for check box adding logic */}
        <input 
        checked= {bestsaller}
        // onClick={()=> setBestsaller(prev => !prev)}
        onChange={()=>bestsaller ? setBestsaller(false) :setBestsaller(true)}
        type="checkbox" 
        className='cursor-pointer' 
        id='bestseller' />
        <label className='dark:text-white cursor-pointer' htmlFor="bestseller">add To Bestsaller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-slate-600 text-white'>ADD</button>
    </form>
  )
}

export default Add