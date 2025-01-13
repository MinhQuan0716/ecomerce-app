import React,{useContext,useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const BestSeller = () => {
    const {products} =useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState();
    useEffect(()=>{
     const bestProduct=products.filter((item)=>(item.bestSeller));
     console.log(bestProduct);
     setBestSeller(bestProduct.slice(0,5));
    },[products])
  return (
    <div className='my-5'>
      <div className='text-center text-3xl py-8'>
         <Title text1={'BEST'} text2={'SELLER'}/>
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
         </p>
      </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
         {
          bestSeller?.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
         }
        </div>
    </div>
  )
}

export default BestSeller