import React, { useEffect } from 'react'
import { useContext,useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const LatestCollection = () => {
    const {products}=useContext(ShopContext);
    const [latestProduct,setLatestProduct]=useState([]);
    useEffect(()=>{
      setLatestProduct(products.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
       <div className='text-center py-8 text-3xl '>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
       </div>
       {/* Rendering Product */}
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              latestProduct.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
       </div>
    </div>
  )
}

export default LatestCollection