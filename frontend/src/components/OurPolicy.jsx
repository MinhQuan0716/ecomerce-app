import React from 'react'
import { assets } from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-xs md:text-base text-gray-700'>
        <div className=''>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'> Easy exchange policy</p>
            <p className='font-serif'>We offer free exchange policy.</p>
        </div>
        <div className=''>
            <img src={assets.quality_icon} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'>Seven day return policy</p>
            <p className='font-serif'>We offer 7 day return policy.</p>
        </div>
        <div className=''>
            <img src={assets.support_img} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'> Customer Support </p>
            <p className='font-serif'>We offer 24h customer support.</p>
        </div>
    </div>
  )
}

export default OurPolicy