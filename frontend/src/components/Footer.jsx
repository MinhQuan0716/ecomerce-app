import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div >
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
               <img src={assets.logo} className='w-32 mb-5 ' alt="" />
               <p className='w-full md:w-2/3 text-gray-600'>Goat</p>
            </div>
            <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li> DELIVERY </li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+84-123456789</li>
                <li>test@gmail.com</li>
            </ul>
        </div>
        </div>
       <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright@2024 minhquan.com - All Right Reserved</p>
       </div>
    </div>
  )
}

export default Footer