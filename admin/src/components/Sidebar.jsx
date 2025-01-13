import React from 'react'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='w-[20%] border-r-2  min-h-screen'>
        <div className='flex flex-col gap-2 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-400  border-r-0 px-3 py-2 rounded-l' to='/add'>
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Item</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-400  border-r-0 px-3 py-2 rounded-l' to='/list'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>List Item</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-400  border-r-0 px-3 py-2 rounded-l' to='/orders'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar