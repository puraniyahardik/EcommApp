import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ReletedProducts from '../componets/ReletedProducts';


const Product = () => {
  const { productId } = useParams();
  const { products,currency,AddToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  // console.log(productId);

  
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);

        return null
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId])
  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100   '>
      {/* product Data  */}
      <div className='flex gap-12 sm:gap-12 sm:flex-row '>
        {/* product Images */}

      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item,index)=>(
              <img src={item} alt="" onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink'  key={index}/>
            ))
          }

        </div>
        <div className='w-full sm:w-[80%]'>
          <img src={image} alt="" className='w-full sm:h-auto' />

        </div>
        <div>
          {/* product Info */}

          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />

              <p className='pt-2'>(122)</p>

            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

            <p className='pt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-8'>

              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-slate-100 dark:text-black ${item === size ? 'border-orange-500': ''}`} key={index}>{item}</button>
                ))}

              </div>

            </div>

            <button onClick={() => AddToCart(productData._id,size)} className='bg-black dark:bg-slate-500 text-white py-3 text-sm active:bg-gray-700 px-8'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>

            <div className='text-sm text-gray-500 mt-5 flex-col gap-1'>
              <p>100% original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>

            </div>

          </div>
          </div>
      </div>
</div>

          {/* discription & review */}

          <div className='mt-20'>

            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews(122)</p>

            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum, at, id voluptas molestiae deleniti aut adipisci non commodi illo a mollitia? Temporibus facere animi culpa provident accusamus id architecto?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat blanditiis ea consequuntur deserunt voluptas. Incidunt minima ullam quos magni at quam neque obcaecati magnam, quas placeat aperiam maiores ut esse!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officia architecto libero dicta atque nesciunt obcaecati vitae, veniam tempore consequatur qui accusamus eum aliquam beatae nobis sed temporibus repellendus inventore!

              </p>

            </div>
        </div>
        {/* ------display product----- */}
        <ReletedProducts  category={productData.category} subCategory={productData.subCategory}/>
 </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product