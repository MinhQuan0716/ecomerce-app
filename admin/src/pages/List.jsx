import React, { useEffect,useState } from 'react'
import {backendUrl,Currency} from '../App'
import axios from 'axios'
import { toast } from 'react-toastify';
const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
   try {
    const response=await axios.get(`${backendUrl}/api/product/products`);
    if(response.data.success){
      setList(response.data.products);
      console.log(list);
    } else {
      toast.error(response.data.message);
    }
   } catch (error) {
     console.log(error);
    toast.error('Something went wrong');
   }
  };

  const deleteProduct = async (id) => {
    try {
      const response =await axios.post(`${backendUrl}/api/product/remove`,{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
      await  fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    
    <div>
      <p className='mb-2'>All Product List</p>
     
      <div className='flex flex-col gap-2'>
         {/** List of products title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/** List of products */}
        {list.map((item,index) => (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
                <img className='w-12' src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}{Currency}</p>
                <p onClick={()=>deleteProduct(item._id)} className='text-rigt md:text-center cursor-pointer text-lg'>X</p>
              </div>
        ))}
      </div>
    </div>
  )
}

export default List