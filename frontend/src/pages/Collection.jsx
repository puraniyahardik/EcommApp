import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../componets/Title';
import ProductItem from '../componets/ProductItem';

const Collection = () => {
  const {products,search,showsearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent')


  //category togle
  const toggleCategory = (e) =>{
    const { value} = e.target;


    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );

    // if(category.includes(e.target.value)){
    //   setCategory(prev=>prev.filter(item=> item !== e.target.value))
    // }else{
    //   setCategory(prev => [...prev,e.target.value])
    // }
  }
  // subcategory

  const toggleSubCategory = (e) =>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item=>item !== e.target.value));
      
    } else {
      setSubCategory(pre=> [...pre,e.target.value]);
      
    }
  }


  const applyFilter = () =>{
    let productsCopy = products.slice();

    if (showsearch && search) {
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()));
      
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item)=> (category.includes(item.category)));
    }
    
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item)=> (subCategory.includes(item.subCategory)));
    }

    setFilterProduct(productsCopy);
  }


      const sortPorducts = () =>{
        let FpproductsCopy = filterProduct.slice();

        switch (sortType) {
          case 'low-high':
            setFilterProduct(FpproductsCopy.sort((a,b)=>(a.price- b.price)));
            break;
          case 'high-low':
              setFilterProduct(FpproductsCopy.sort((a,b)=>(b.price - a.price)));
              break;   
        
          default:
            applyFilter();

            break;
        }

      }
  useEffect(()=>{
    // console.log(category);
    // console.log(subCategory);
    applyFilter();
  
  },[category,subCategory,search,showsearch,products]);
  useEffect(()=>{
    sortPorducts()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-1'>
      {/* fillter options */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />

      {/* category fillter */}

      <div className={`border bg-gray-300 pl-3 mt-6 py-3 ${showFilter ? '': 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORY</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          
              {/* <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'women'} onChange={toggleCategory} />Women
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'kids'} onChange={toggleCategory}/>kids
              </p> */}

{['Men', 'Women', 'Kids'].map((cat) => (
          <p key={cat} className="flex gap-2">
            <input
              type="checkbox"
              className="w-3"
              value={cat}
              checked={category.includes(cat)}
              onChange={toggleCategory}
            />
            {cat}
          </p>
        ))}


        </div>
      </div>

        {/* Subcategory Filter */}

        <div className={`border bg-gray-300 pl-3 my-5 py-3 ${showFilter ? '': 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'winterwear'} onChange={toggleSubCategory}/>winterwear
              </p>
        </div>
      </div>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-center text-base  sm:text-2xl gap-5 lg:gap-40 mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* product sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 dark:bg-slate-950'>
            <option value="relevent">Relevent</option>
            <option value="low-high">Low To High</option>
            <option value="high-low">High To Low</option>

          </select>

        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Collection