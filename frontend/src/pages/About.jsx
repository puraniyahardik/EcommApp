import React from 'react'
import Title from '../componets/Title'
import { assets } from '../assets/assets'
import NewsLatterBox from '../componets/NewsLatterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 to-gray-600'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti magni aspernatur blanditiis nulla iste ab error minus, tenetur totam explicabo ut eveniet consequuntur possimus, earum delectus ratione consequatur sint molestiae!</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat atque libero, quibusdam iusto hic, reiciendis quisquam rem consectetur unde magni beatae facere, incidunt mollitia et temporibus dolor distinctio sint animi!</p>
            <b className='to-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius distinctio dolor porro quos suscipit aspernatur inventore quam, modi earum? Culpa deleniti obcaecati in expedita explicabo optio quae rerum mollitia repellat.</p>
            </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ducimus quisquam praesentium, repellat dolore ea necessitatibus provident tempore inventore illo.</p>
        </div>

        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ducimus quisquam praesentium, repellat dolore ea necessitatibus provident tempore inventore illo.</p>
        </div>

        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>exceptional Customer:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ducimus quisquam praesentium, repellat dolore ea necessitatibus provident tempore inventore illo.</p>
        </div>

      </div>
       <NewsLatterBox />

    </div>
  )
}

export default About